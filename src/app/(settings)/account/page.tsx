import LoginContainer from "@/components/auth/LoginContainer";
import { auth, signOut } from "../../../../auth";
import AccountContainer from "@/components/auth/AccountContainer";
export default async function Account() {
  const session = await auth();
  console.log(session);

  return (
    <>
      {JSON.stringify(session)}
      <AccountContainer />
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
