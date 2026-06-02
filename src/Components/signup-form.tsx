import { useAuth } from "@/Authcontext/AuthProvider"
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/Components/ui/field"
import { Input } from "@/Components/ui/input"
import { sign } from "crypto"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from 'sonner';

type signupType = {
  email: string;
  password: string;
  confirmPassword: string;
}
let timeOut: ReturnType<typeof setTimeout>;
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { signUp } = useAuth()

  const navigate = useNavigate();
  const [signUpInput, setSignupInput] = useState<signupType>({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const passwordVerification = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("verification function")
    const { password, confirmPassword, email } = signUpInput;
    if (email !== "" && confirmPassword !== "" && email !== "") {
      if (password.trim() !== confirmPassword.trim()) {
        toast.error("confirm password should same")
      }
      else {
        await signUp(email, confirmPassword);
        setSignupInput({
          email: "",
          password: "",
          confirmPassword: ""
        })
      }
    }
    else {
      toast("please Enter the details")
    }
  }

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    passwordVerification(e);

  }


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
                onChange={(e) => (setSignupInput({ ...signUpInput, email: e.target.value }))}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required
                value={signUpInput.password}
                onChange={(e) => { setSignupInput({ ...signUpInput, password: e.target.value }) }}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required
                value={signUpInput.confirmPassword}
                onChange={(e) => {
                  setSignupInput({ ...signUpInput, confirmPassword: e.target.value })
                }}
              />
            </Field>
            <FieldGroup>
              <Field>

                <Button type="submit" onClick={(e) => handleSignup(e)}>Create Account</Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a onClick={() => { navigate("/login") }} className="cursor-pointer">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
