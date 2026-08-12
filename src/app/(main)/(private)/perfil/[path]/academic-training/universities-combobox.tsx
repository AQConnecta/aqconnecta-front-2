import { useVirtualizer, type Virtualizer } from "@tanstack/react-virtual";
import {
  memo,
  type PropsWithChildren,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { Alert } from "@/components/alert";
import Combobox from "@/components/combobox";
import Form from "@/components/form";
import type { Universidade } from "@/core/types/universidade";
import { useFetchManyUniversities } from "@/hooks/universities/fetch-many-universities";
import { useAuth } from "@/stores/auth";
import type { AcademicTrainingFormSchema } from "./schema";

type Props = {
  onSelectUniversity: (universityId: string) => void;
  errorMessage?: string;
  universityId?: string;
  required?: boolean;
} & Omit<
  ControllerRenderProps<AcademicTrainingFormSchema, "universidade.id">,
  "value" | "onChange"
>;

export const UniversitiesCombobox = memo(
  ({
    onSelectUniversity,
    errorMessage,
    name,
    required,
    disabled,
    ref,
    onBlur,
    universityId,
  }: Props) => {
    const [open, setOpen] = useState(false);
    const authUser = useAuth((state) => state.user);
    const { data, error, status, isLoading } = useFetchManyUniversities({
      authUser,
    });
    const comboboxId = useId();
    const virtualizerRef = useRef<Virtualizer<HTMLDivElement, Element>>(null);
    const universities = data?.data;
    const universityToIdMap = useMemo(
      () =>
        new Map(
          data?.data?.map((university) => [
            university.nomeInstituicao,
            university.id,
          ]),
        ),
      [data?.data],
    );
    const universityToNameMap = useMemo(
      () =>
        new Map(
          data?.data?.map((university) => [
            university.id,
            university.nomeInstituicao,
          ]),
        ),
      [data?.data],
    );

    const Wrapper = ({ children }: PropsWithChildren) => (
      <div>
        <Form.Label htmlFor={comboboxId} required>
          Selecione a universidade
        </Form.Label>
        {children}
      </div>
    );

    if (status === "error") {
      return (
        <Wrapper>
          <Alert
            variant="danger"
            title="Não foi possível carregar as universidades disponíveis"
            content={<p>{error.message}</p>}
          />
        </Wrapper>
      );
    }

    if (status === "pending") {
      return isLoading ? (
        <Wrapper>
          <Form.InputSkeleton />
        </Wrapper>
      ) : null;
    }

    return (
      <Combobox.Root
        name={name}
        disabled={disabled}
        required={required}
        defaultValue={
          universityId ? universityToNameMap.get(universityId) : undefined
        }
        virtualized
        items={universities!}
        open={open}
        onOpenChange={setOpen}
        onValueChange={(value) => {
          onSelectUniversity(universityToIdMap.get(value as string)!);
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
        <Wrapper>
          <Combobox.Input
            id={comboboxId}
            triggerLabel="Abrir seleção de universidades"
            placeholder="ex: Universidade Tecnológica Federal do Paraná"
            ref={ref}
            onBlur={onBlur}
          />

          <Form.ErrorMessage errorMessage={errorMessage} />
        </Wrapper>
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
  },
);

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
