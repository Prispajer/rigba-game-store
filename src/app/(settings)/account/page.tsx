"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { logout } from "@/utils/tools/logout";
import { useSession } from "next-auth/react";
import AccountContainer from "@/components/auth/AccountContainer";

export default function Account() {
  const user = useCurrentUser();

  // TODO LOGOUT USER FROM BREAKPOINT SERVER COMPONENT
  const onClick = () => {
    logout();
  };

  return (
    <>
      {JSON.stringify(user)}
      <AccountContainer />
      <form>
        <button onClick={onClick} type="submit">
          <p>{user?.email}</p>
          Sign Out
        </button>
      </form>
    </>
  );
}
