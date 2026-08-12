import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import apiCompetencesQueries from "@/api/api-competences-queries";
import type { Usuario } from "@/core/types/usuario";
import { RQKeys } from "@/libs/react-query";

type Args = { authUser: Usuario | null; search: string };

export const useFetchInfiniteCompetences = ({ authUser, search }: Args) =>
  useInfiniteQuery({
    queryKey: RQKeys.competence.list({ search }),
    placeholderData: keepPreviousData,
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiCompetencesQueries.fetchManyCompetences({
        perPage: 200,
        page: pageParam,
        search,
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage && !lastPage.last ? lastPage.number + 1 : undefined,
    enabled: !!authUser,
  });
