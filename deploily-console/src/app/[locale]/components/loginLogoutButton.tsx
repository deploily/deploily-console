import Login from "@/components/login";
import {authOptions} from "@/lib/utils/authOptions";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function LoginLogoutButton() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/portal/dashboard");
  }

  return <Login />;
}
