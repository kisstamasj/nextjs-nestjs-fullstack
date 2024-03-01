import { AuthCard } from "../_components/auth-card";
import SignUpForm from "../_components/sign-up-form";


const SignUpPage = async () => {
  return (
    <AuthCard title="Sign Up" backLabel="Already have an account? " backHref="/auth/sign-in">
      <SignUpForm />
    </AuthCard>
  );
};

export default SignUpPage;
