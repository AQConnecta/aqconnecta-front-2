import { useVirtualizer, type Virtualizer } from "@tanstack/react-virtual";
import {
  memo,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Alert } from "@/components/alert";
import Combobox from "@/components/combobox";
import type { Universidade } from "@/core/types/universidade";
import { useFetchManyUniversities } from "@/hooks/universities/fetch-many-universities";
import { useAuth } from "@/stores/auth";

export const UniversitiesCombobox = memo(() => {
  const [open, setOpen] = useState(false);
  const authUser = useAuth((state) => state.user);
  const { data, error, status, isLoading } = useFetchManyUniversities({
    authUser,
  });
  const comboboxId = useId();
  const virtualizerRef = useRef<Virtualizer<HTMLDivElement, Element>>(null);

  if (status === "error") {
    return (
      <Alert
        variant="danger"
        title="Não foi possível carregar as universidades disponíveis"
        content={<p>{error.message}</p>}
      />
    );
  }

  if (status === "pending") {
    return isLoading ? <div>carregando</div> : null;
  }

  const universities = data.data!;

  return (
    <Combobox.Root
      virtualized
      items={universities}
      open={open}
      onOpenChange={setOpen}
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
      <Combobox.Input
        id={comboboxId}
        label="Selecione a universidade"
        triggerLabel="Abrir seleção de universidades"
        placeholder="ex: Universidade Tecnológica Federal do Paraná"
      />
      <Combobox.Content className="p-2!">
        <Combobox.Empty className="p-4 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
          Nenhuma universidade foi encontrada.
        </Combobox.Empty>
        <UniversitiesVirtualizedList
          open={open}
          virtualizerRef={virtualizerRef}
        />
      </Combobox.Content>
    </Combobox.Root>
  );
});

function UniversitiesVirtualizedList({
  open,
  virtualizerRef,
}: {
  open: boolean;
  virtualizerRef: React.RefObject<Virtualizer<HTMLDivElement, Element> | null>;
}) {
  const filteredItems = Combobox.useFilteredItems<Universidade>();
  const scrollElementRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    enabled: open,
    count: filteredItems.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => 60,
    overscan: 20,
    paddingStart: 0,
    paddingEnd: 0,
    scrollPaddingEnd: 8,
    scrollPaddingStart: 8,
  });

  useImperativeHandle(virtualizerRef, () => virtualizer);

  const handleScrollElementRef = useCallback(
    (element: HTMLDivElement | null) => {
      scrollElementRef.current = element;
      if (element) {
        virtualizer.measure();
      }
    },
    [virtualizer],
  );

  if (!filteredItems.length) return null;

  return (
    <Combobox.VirtualizerListWrapper
      ref={handleScrollElementRef}
      virtualizer={virtualizer}
    >
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const university = filteredItems[virtualItem.index];
        if (!university) {
          return null;
        }

        return (
          <Combobox.Item
            key={virtualItem.key}
            index={virtualItem.index}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            value={university.nomeInstituicao}
            aria-setsize={filteredItems.length}
            aria-posinset={virtualItem.index + 1}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {university.nomeInstituicao}
          </Combobox.Item>
        );
      })}
    </Combobox.VirtualizerListWrapper>
  );
}
