import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Context/Authcontext/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import { checkNewOrOldUser } from "@/services/authService";
import { useNotify } from "@/Context/NotifyContext/NotifyContextProvider";
type formInputType = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formInput, setFormInput] = useState<formInputType>({
    email: "",
    password: "",
  });
  const { googleSignIn, login, user } = useAuth();
  const { toastMessage } = useNotify();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      let result = await googleSignIn();
      checkNewOrOldUser({
        credential: result,
        toastMessage,
      });
      navigate("/")
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const loginWithEP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login(formInput.email, formInput.password);
    console.log("this is the login result", result);
    setFormInput({ email: "", password: "" });
    navigate("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => loginWithEP(e)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formInput.email}
                  required
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      email: e.target.value,
                    })
                  }
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formInput.password}
                  onChange={(e) =>
                    setFormInput({ ...formInput, password: e.target.value })
                  }
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button" onClick={handleLogin}>
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a onClick={() => navigate("/signup")}>Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
