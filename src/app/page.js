import { getServerSession } from "next-auth";
import LogginButton from "./components/LoginButton";
import UserInfo from "./components/UserInfo";
import { authOptions } from "@/lib/authOptions";
import LogoutButton from "./components/LogoutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <h2>Post Data Fetching</h2>
        {session?.user ? (
          <div>
            <p>Signed in as <strong>{session.user?.name}</strong> ({session.user?.email})</p>
            <LogoutButton/>
          </div>
        ) : (
          <LogginButton />
        )}
        <UserInfo />
      </main>
    </div>
  );
}
