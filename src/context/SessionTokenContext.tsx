import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "3354828a786f75544afdadc9e18a0677";
const BASE_URL = "https://api.themoviedb.org/3";

export type formDataType = {
  username: string;
  password: string;
  request_token: string;
};

type SessionContextType = {
  requestToken: string | null;
  sessionId: string | null;
  loading: boolean;
  accountId: number | null;

  createRequestToken: () => Promise<string | null>;
  validateLogin: (formData: formDataType) => Promise<string | null>;
  createSession: (request_token: string) => Promise<string | null>;
};

export const SessionContext =
  createContext<SessionContextType | null>(null);

export function SessionContextProvider({ children }: { children: React.ReactNode }) {
  const [requestToken, setRequestToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(()=>{
    return localStorage.getItem("session_id")
  });
  const [accountId, setAccountId] = useState<number | null>(null);
  const [loading , setLoading] = useState(false);

  async function createRequestToken() {
    try {
      const res = await axios.get(
        `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`
      );

      const token = res.data.request_token;
      setRequestToken(token);

      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function validateLogin(formData: formDataType) {
    try {
      const res = await axios.post(
        `${BASE_URL}/authentication/token/validate_with_login?api_key=${API_KEY}`,
        formData
      );
      return res.data.request_token;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function createSession(request_token: string) {
    try {
      const res = await axios.post(
        `${BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
        { request_token }
      );

      const session = res.data.session_id;

      setSessionId(session);
      localStorage.setItem("session_id", session);

      return session;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
   useEffect(() => {
    if (!sessionId) return;

    const fetchAccount = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${BASE_URL}/account`,
          {
            params: {
              api_key: API_KEY,
              session_id: sessionId,
            },
          }
        );

        setAccountId(res.data.id);
      } catch (err) {
        console.log("Failed to fetch account:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [sessionId]);

  return (
    <SessionContext.Provider
      value={{
        requestToken,
        sessionId,
        loading,
        createRequestToken,
        validateLogin,
        accountId,
        createSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}