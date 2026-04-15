import { useContext, useRef, useState } from "react";
import { SessionContext } from "../context/SessionTokenContext";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const session = useContext(SessionContext);
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const userNameInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!session) return;

  setLoading(true);

  try {
    let token = session.requestToken;

    if (!token) {
      token = await session.createRequestToken();
    }

    if (!token) {
      console.log("Failed to get request token");
      return;
    }

    const formDataObj = {
      username: userNameInput.current?.value || "",
      password: passwordInput.current?.value || "",
      request_token: token,
    };

    const validatedToken = await session.validateLogin(formDataObj);

    if (!validatedToken) {
      console.log("Invalid login");
      return;
    }

    const sessionId = await session.createSession(validatedToken);

    if (!sessionId) {
      console.log("Session creation failed");
      return;
    }
    console.log("LOGIN SUCCESS:", sessionId);
    toast("Session will expire after 1 hour")
    setTimeout(() => {
      navigate("/home")
    }, 1000);
    
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }

};

  return (
    <>
      
      <section className="min-h-screen flex items-center justify-center bg-black px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-800"
        >
          <div className="mb-6 text-center">
            <h3 className="text-3xl font-bold text-white">Login</h3>
            <p className="text-sm text-gray-400 mt-2">
              Your session will expire after 1 hour
            </p>
          </div>
          <FieldGroup className="space-y-2">
            <Field>
              <FieldLabel htmlFor="username">User Name</FieldLabel>
              <Input
                id="username"
                ref={userNameInput}
                type="text"
                placeholder="Enter your username"
                className="bg-zinc-800 border-zinc-700 focus:ring-2 focus:ring-red-500"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                ref={passwordInput}
                type="password"
                placeholder="Enter your password"
                className="bg-zinc-800 border-zinc-700 focus:ring-2 focus:ring-red-500"
              />
              <FieldDescription className="text-xs text-gray-500">
                Make sure your password is secure
              </FieldDescription>
            </Field>
            <Field orientation="horizontal" className="pt-2">
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 transition-all text-white font-semibold"
              >
                {loading ? "Loading..." :"Submit"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </section>
    
    </>
  );
};

export default LoginPage;
