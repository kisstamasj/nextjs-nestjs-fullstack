import SignUpForm from "@/components/auth/sign-up-form";
import { AuthCard } from "@/components/auth/auth-card";

const SignUpPage = async () => {
  return (
    <AuthCard title="Sign Up" backLabel="Already have an account? " backHref="/auth/sign-in">
      <SignUpForm />
    </AuthCard>
  );
};

export default SignUpPage;
