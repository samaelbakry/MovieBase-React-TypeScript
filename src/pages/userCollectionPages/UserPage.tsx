import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionTokenContext";
import { getUserData } from "../../services/userServices";

type AccountType = {
  avatar: {
    gravatar: { hash: string };
    tmdb: { avatar_path: string | null };
  };
  id: number;
  name: string;
  username: string;
  iso_3166_1: string;
};

const UserPage = () => {
  const session = useContext(SessionContext);
  const [user, setUser] = useState<AccountType | null>(null);



  useEffect(() => {
      async function fetchUserData() {
    if (!session?.accountId || !session?.sessionId) return;

    const data = await getUserData(
      session.accountId.toString(),
      session.sessionId
    );

    setUser(data);
  }
    fetchUserData();
  }, [session?.accountId , session?.sessionId]);

  const avatarUrl = user?.avatar.tmdb.avatar_path
    ? `https://image.tmdb.org/t/p/w300${user.avatar.tmdb.avatar_path}`
    : `https://www.gravatar.com/avatar/${user?.avatar.gravatar.hash}`;

  return (
    <section className="min-h-screen bg-linear-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-zinc-500/10 blur-2xl rounded-3xl"></div>
        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-zinc-800 shadow-lg"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-4">
              {user?.name || user?.username}
            </h2>
            <p className="text-gray-400">@{user?.username}</p>
            <span className="mt-3 px-3 py-1 text-xs bg-zinc-800 text-gray-300 rounded-full">
              🌍 {user?.iso_3166_1}
            </span>
          </div>
          <div className="border-t border-zinc-800 my-6"></div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-zinc-800/60 p-3 rounded-xl text-center">
              <p className="text-gray-400 text-xs">User ID</p>
              <p className="text-white font-semibold">{user?.id}</p>
            </div>
            <div className="bg-zinc-800/60 p-3 rounded-xl text-center">
              <p className="text-gray-400 text-xs">Language</p>
              <p className="text-white font-semibold">EN</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
