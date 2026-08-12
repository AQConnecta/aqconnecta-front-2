import { useVirtualizer, type Virtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import {
  memo,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert } from "@/components/alert";
import Combobox from "@/components/combobox";
import Form from "@/components/form";
import type { Competencia } from "@/core/types/competencia";
import { useFetchInfiniteCompetences } from "@/hooks/competences/fetch-infinite-competences";
import { useDebouncedValue } from "@/hooks/debounced-value";
import { useAuth } from "@/stores/auth";

type Props = {
  selectedCompetences: Competencia[];
  onSelectCompetences: (competences: Competencia[]) => void;
  errorMessage?: string;
};

export const CompetencesCombobox = memo(
  ({ errorMessage, onSelectCompetences, selectedCompetences }: Props) => {
    const comboboxId = useId();
    const virtualizerRef = useRef<Virtualizer<HTMLDivElement, Element>>(null);
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const debouncedSearch = useDebouncedValue(searchInput, 300);
    const authUser = useAuth((state) => state.user);
    const {
      data,
      error,
      status,
      isLoading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isPlaceholderData,
    } = useFetchInfiniteCompetences({ search: debouncedSearch, authUser });

    const competences = useMemo(
      () =>
        data?.pages.flatMap((page) => page?.content).filter((c) => !!c) ?? [],
      [data],
    );

    if (status === "error") {
      return (
        <Wrapper comboboxId={comboboxId}>
          <Alert
            variant="danger"
            title="Não foi possível carregar as competências disponíveis"
            content={<p>{error.message}</p>}
          />
        </Wrapper>
      );
    }

    if (status === "pending") {
      return isLoading ? (
        <Wrapper comboboxId={comboboxId}>
          <Form.InputSkeleton />
        </Wrapper>
      ) : null;
    }

    return (
      <Combobox.Root
        required
        virtualized
        multiple
        items={competences}
        open={open}
        filter={null}
        onOpenChange={(nextOpen, eventDetails) => {
          if (!nextOpen && eventDetails.reason === "item-press") return;
          setOpen(nextOpen);
        }}
        inputValue={searchInput}
        value={selectedCompetences}
        onValueChange={onSelectCompetences}
        onInputValueChange={(value, eventDetails) => {
          if (eventDetails.reason === "input-change") setSearchInput(value);
        }}
        onItemHighlighted={(item, { reason, index }) => {
          const virtualizer = virtualizerRef.current;
          if (!item || !virtualizer) return;

          const isStart = index === 0;
          const isEnd = index === virtualizer.options.count - 1;
          const shouldScroll =
            reason === "none" || (reason === "keyboard" && (isStart || isEnd));
          if (shouldScroll) {
            queueMicrotask(() => {
              virtualizer.scrollToIndex(index, {
                align: isEnd ? "start" : "end",
              });
            });
          }
        }}
      >
        <Wrapper comboboxId={comboboxId}>
          <Combobox.Input
            id={comboboxId}
            triggerLabel="Abrir seleção de competências"
            placeholder="Java, C++, PostgreSQL"
          />

          <Form.ErrorMessage errorMessage={errorMessage} />
        </Wrapper>
        <Combobox.Content
          className={clsx(
            "p-2!",
            isPlaceholderData && "opacity-60 animate-pulse cursor-progress",
          )}
        >
          {!isLoading && !isFetchingNextPage && competences.length === 0 && (
            <div className="p-4 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
              Nenhuma competência foi encontrada no sistema.
            </div>
          )}
          <CompetenciasVirtualizedList
            open={open}
            items={competences}
            virtualizerRef={virtualizerRef}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
          />
        </Combobox.Content>
      </Combobox.Root>
    );
  },
);

function Wrapper({
  children,
  comboboxId,
}: PropsWithChildren<{ comboboxId: string }>) {
  return (
    <div>
      <Form.Label htmlFor={comboboxId} required>
        Selecione a universidade
      </Form.Label>
      {children}
    </div>
  );
}

function CompetenciasVirtualizedList({
  open,
  items,
  virtualizerRef,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: {
  open: boolean;
  items: Competencia[];
  virtualizerRef: React.RefObject<Virtualizer<HTMLDivElement, Element> | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}) {
  const scrollElementRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    enabled: open,
    count: items.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => 60,
    overscan: 20,
  });

  useImperativeHandle(virtualizerRef, () => virtualizer);

  const handleScrollElementRef = useCallback(
    (element: HTMLDivElement | null) => {
      scrollElementRef.current = element;
      if (element) virtualizer.measure();
    },
    [virtualizer],
  );

  const virtualItems = virtualizer.getVirtualItems();
  useEffect(() => {
    const lastItem = virtualItems.at(-1);
    if (!lastItem) return;

    if (
      lastItem.index >= items.length - 10 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      onLoadMore();
    }
  }, [virtualItems, items.length, hasNextPage, isFetchingNextPage, onLoadMore]);

  if (!items.length) return null;

  return (
    <Combobox.VirtualizerListWrapper
      ref={handleScrollElementRef}
      virtualizer={virtualizer}
    >
      {virtualItems.map((virtualItem) => {
        const competencia = items[virtualItem.index];
        if (!competencia) return null;

        return (
          <Combobox.Item
            key={virtualItem.key}
            index={virtualItem.index}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            value={competencia}
            aria-setsize={items.length}
            aria-posinset={virtualItem.index + 1}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {competencia.descricao}
          </Combobox.Item>
        );
      })}

      {isFetchingNextPage && (
        <div className="p-2 text-center text-sm text-gray-500">
          Carregando mais...
        </div>
      )}
    </Combobox.VirtualizerListWrapper>
  );
}
