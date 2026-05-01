import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionTokenContext";
import { toast } from "sonner";

const ONE_HOUR = 60 * 60 * 1000;

const SessionCountDown = () => {
  const session = useContext(SessionContext);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const valid = session?.accountId && session?.sessionId;

  useEffect(() => {
    if (!valid) return;
    const createdAt = localStorage.getItem("session_createdAt");
    if (!createdAt) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = ONE_HOUR - (now - Number(createdAt));

      if (diff <= 0) {
        clearInterval(interval);
        session?.logout();
        toast.warning("Session expired, please login again")
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [valid, session]);

  if (timeLeft === null) return null;
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  return (
    <>
     <div className="flex items-center gap-2 bg-black/40 border border-amber-500/40 text-amber-400 px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
    <span className="text-sm font-medium">Session expires in:</span>

    <span className="font-mono text-lg font-semibold tracking-wider">
      {minutes.toString()}:
      {seconds.toString()}
    </span>
  </div>
    </>
  );
};

export default SessionCountDown;
