import LoginContainer from "@/components/auth/LoginContainer";
import { auth, signOut } from "../../../../auth";
import AccountContainer from "@/components/auth/AccountContainer";
export default async function Account() {
  return <AccountContainer />;
}
