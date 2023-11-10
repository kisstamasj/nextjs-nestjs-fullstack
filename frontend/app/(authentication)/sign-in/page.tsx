
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignInForm from './components/sign-in-form';


const SignInPage = async () => {
  return (
    <Card className="w-full border-0 md:border md:h-auto md:w-[500px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
};

export default SignInPage;
