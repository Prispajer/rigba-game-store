import LoginContainer from "@/components/auth/LoginContainer";
import { auth, signOut } from "../../../../auth";

export default async function Login() {
  const session = await auth();
  console.log(session);
  return (
    <>
      {JSON.stringify(session)}
      <LoginContainer />
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
}
