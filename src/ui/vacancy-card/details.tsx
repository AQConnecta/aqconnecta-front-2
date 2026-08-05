import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { Badge } from "@/components/badge";

type Props = {
  locale: string;
  isRemote: boolean;
  isExpired: boolean;
  acceptsBeginners: boolean;
};

export function VacancyCardDetails({
  locale,
  isRemote,
  isExpired,
  acceptsBeginners,
}: Props) {
  return (
    <div className="mb-5 text-sm flex items-center gap-2">
      <span className="flex items-center gap-1 text-gray-700">
        <MapPinIcon size={16} weight="bold" /> {locale}
      </span>

      {isRemote && <Badge variant="green">Vaga remota</Badge>}
      {acceptsBeginners && <Badge variant="blue">Iniciante</Badge>}
      {isExpired && <Badge variant="default">Expirada</Badge>}
    </div>
  );
}
