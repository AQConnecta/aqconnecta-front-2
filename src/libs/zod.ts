/**
 * Cria um validador de URL para o Zod verificar o domínio e, opcionalmente, um prefixo de rota.
 *
 * @param domain O domínio base esperado (ex: "github.com")
 * @param pathPrefix (Opcional) O início do caminho exigido (ex: "/in/")
 */
export const validateUrlDomain = (domain: string, pathPrefix?: string) => {
  return (value: string) => {
    try {
      const url = new URL(value);

      const isDomainValid = url.hostname.endsWith(domain);

      if (pathPrefix) {
        return isDomainValid && url.pathname.startsWith(pathPrefix);
      }

      return isDomainValid;
    } catch {
      return false;
    }
  };
};
