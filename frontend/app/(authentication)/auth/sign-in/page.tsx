import { AuthCard } from "../_components/auth-card";
import SignInForm from "../_components/sign-in-form";


const SignInPage = () => {
  return (
    <AuthCard title="Sign In" backLabel="Don't have an account? " backHref="/auth/sign-up">
      <SignInForm />
    </AuthCard>
  );
};

export default SignInPage;
