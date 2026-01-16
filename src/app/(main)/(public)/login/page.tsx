import { Heading } from "@/components/heading";
import { Main } from "@/components/main";
import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <Main>
      <Heading level={3} className="mb-6">
        Acesse sua conta
      </Heading>
      <LoginForm />
    </Main>
  );
}
