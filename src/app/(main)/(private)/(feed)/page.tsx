import { Main } from "@/components/main";
import { Deslogar } from "./deslogar";
import { HotCompetences } from "./hot-competences";
import { Vacancies } from "./vacancies";

export default function Home() {
  return (
    <>
      <HotCompetences />
      <Main>
        <Vacancies />
        <Deslogar />
      </Main>
    </>
  );
}
