import { Main } from "@/components/main";
import { HotCompetences } from "./hot-competences";
import { Vacancies } from "./vacancies";

export default function Home() {
  return (
    <>
      <HotCompetences />
      <Main>
        <Vacancies />
      </Main>
    </>
  );
}
