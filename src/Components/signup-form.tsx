import { useAuth } from "../Context/Authcontext/AuthProvider"
import { Button } from "../Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../Components/ui/field";
import { Input } from "../Components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from '../services/authService';
import { useNotify } from "../Context/NotifyContext/NotifyContextProvider";
import { getAdditionalUserInfo } from "firebase/auth"
type signupType = {
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { signUp, googleSignIn } = useAuth()
  const { toastMessage } = useNotify()
  const navigate = useNavigate();
  const [signUpInput, setSignupInput] = useState<signupType>({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { password, confirmPassword, email } = signUpInput;

    if (email !== "" && password !== "" && confirmPassword !== "") {
      if (password.trim() !== confirmPassword.trim()) {
        toastMessage("confirm password should same", "error")
        return;
      }

      try {
        const userId = `user_${Date.now()}`
        const credential = await signUp(email, password);

        await addUser(
          { userId, email, createdAt: Date.now().toString() },
          toastMessage,
          credential
        );

        toastMessage("signup successfully", "success");
        navigate("/");

        setSignupInput({
          email: "",
          password: "",
          confirmPassword: ""
        })
      } catch (error) {
        console.error(error);
        toastMessage("signup failed", "error");
      }
    } else {
      toastMessage("please Enter the details", "info")
    }
  }

  const handleGoogleSignup = async () => {
    try {
      const credential = await googleSignIn();
      const user = credential.user;

      await addUser(
        {
          userId: user.uid,
          email: user.email ?? "",
          createdAt: Date.now().toString(),
        },
        toastMessage,
        credential
      );

      toastMessage("signup successfully", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      toastMessage("google signup failed", "error");
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={signUpInput.email}
                onChange={(e) => setSignupInput({ ...signUpInput, email: e.target.value })}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={signUpInput.password}
                onChange={(e) => setSignupInput({ ...signUpInput, password: e.target.value })}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                value={signUpInput.confirmPassword}
                onChange={(e) => setSignupInput({ ...signUpInput, confirmPassword: e.target.value })}
              />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" onClick={handleSignup}>Create Account</Button>
                <Button variant="outline" type="button" onClick={handleGoogleSignup}>
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <a onClick={() => navigate("/login")} className="cursor-pointer">
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}