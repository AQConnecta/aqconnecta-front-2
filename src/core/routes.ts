export const Routes = Object.freeze({
  home: "/",
  auth: {
    register: "/registre-se",
    login: "/login",
  },
  vacancies: "/",
  candidatures: {
    apply: (id: string) => `/candidaturas/${id}/candidatar`,
  },
  userSubmits: "/minhas-candidaturas",
});
