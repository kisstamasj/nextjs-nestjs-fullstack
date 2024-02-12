import SignInForm from "@/components/auth/sign-in-form";
import { AuthCard } from "@/components/auth/auth-card";

const SignInPage = () => {
  return (
    <AuthCard title="Sign In" backLabel="Don't have an account? " backHref="/auth/sign-up">
      <SignInForm />
    </AuthCard>
  );
};

export default SignInPage;
