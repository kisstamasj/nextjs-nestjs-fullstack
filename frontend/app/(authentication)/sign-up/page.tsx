
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SignUpForm from './components/sign-up-form';


const SignUpPage = async () => {
  return (
    <Card className="w-full border-0 md:border md:h-auto md:w-[500px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
