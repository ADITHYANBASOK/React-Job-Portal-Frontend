// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// export function LoginPage() {
//   return (
//     <div className="container max-w-lg py-20">
//       <Card>
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl">Sign in</CardTitle>
//           <CardDescription>
//             Enter your email and password to access your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" type="email" placeholder="name@example.com" />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" type="password" />
//           </div>
//         </CardContent>
//         <CardFooter className="flex flex-col gap-4">
//           <Button className="w-full">Sign In</Button>
//           <p className="text-sm text-muted-foreground text-center">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-primary hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }


import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export function LoginPage() {
  const navigate = useNavigate();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', values);
        if (response.data.success) {
          console.log("respose",response)
          if (response.data.role == "seeker"){
          localStorage.setItem('Stoken', response.data.token); // Save JWT token
          navigate('/seeker'); // Redirect to dashboard or any page you want
        }else{
          localStorage.setItem('Etoken', response.data.token);
          navigate('/employer');
        }
        }
      } catch (error) {
        setErrors({ password: 'Invalid email or password' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container max-w-lg py-20">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
                placeholder="name@example.com"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
            {formik.errors.password && (
              <p className="text-red-500 text-center">{formik.errors.password}</p>
            )}
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
