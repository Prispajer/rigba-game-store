import LoginContainer from "@/components/auth/LoginContainer";
import { auth } from "../../../../auth";

export default async function Login() {
  const session = await auth();
  return (
    <>
      {JSON.stringify(session)}
      <LoginContainer />
    </>
  );
}
