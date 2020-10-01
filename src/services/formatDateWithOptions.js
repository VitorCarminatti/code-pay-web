import { formatWithOptions as format } from "date-fns/fp";
import { ptBR } from "date-fns/locale";

export function formatDateWithOptions(date, options) {
  const { pattern, ...rest } = options;

  if (!date) {
    return "";
  }

  return format(
    {
      locale: ptBR,
      awareOfUnicodeTokens: true,
      ...rest,
    },
    pattern,
    new Date(date)
  );
}
