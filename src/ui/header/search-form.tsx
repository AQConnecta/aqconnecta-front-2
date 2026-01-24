import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import Form from "@/components/form";

type Props = {
  className?: string;
};

export function SearchForm({ className }: Props) {
  return (
    <search className={className}>
      <Form.Input
        label="Buscar"
        hideLabel
        leftComponent={
          <Form.InputIcon icon={MagnifyingGlassIcon} weight="bold" />
        }
        placeholder="Buscar vagas, projetos ou pessoas..."
      />
    </search>
  );
}
