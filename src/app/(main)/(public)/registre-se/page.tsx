import { Heading } from "@/components/heading";
import { Main } from "@/components/main";
import { RegisterForm } from "./form";

export default function Register() {
  return (
    <Main>
      <Heading level={3} className="mb-6 mt-8">
        Registre-se
      </Heading>
      <RegisterForm />
    </Main>
  );
}
