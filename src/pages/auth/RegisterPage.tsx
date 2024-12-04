// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// export function RegisterPage() {
//   return (
//     <div className="container max-w-lg py-20">
//       <Card>
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl">Create an account</CardTitle>
//           <CardDescription>
//             Choose your account type and enter your details to get started
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <RadioGroup defaultValue="seeker" className="grid grid-cols-2 gap-4">
//             <div>
//               <RadioGroupItem
//                 value="seeker"
//                 id="seeker"
//                 className="peer sr-only"
//               />
//               <Label
//                 htmlFor="seeker"
//                 className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
//               >
//                 <span>Job Seeker</span>
//               </Label>
//             </div>
//             <div>
//               <RadioGroupItem
//                 value="employer"
//                 id="employer"
//                 className="peer sr-only"
//               />
//               <Label
//                 htmlFor="employer"
//                 className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
//               >
//                 <span>Employer</span>
//               </Label>
//             </div>
//           </RadioGroup>
//           <div className="grid gap-2">
//             <Label htmlFor="name">Full Name</Label>
//             <Input id="name" type="text" />
//           </div>
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
//           <Button className="w-full">Create Account</Button>
//           <p className="text-sm text-muted-foreground text-center">
//             Already have an account?{' '}
//             <Link to="/login" className="text-primary hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios'
// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  accountType: Yup.string().required('Account type is required'),
});

export function RegisterPage() {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      accountType: 'seeker',  // Default value
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Form Submitted', values);

      // Here you can handle the form submission and make an API request
      // For example, using Axios to send the form data to a backend
      try {
        const response = await axios.post('http://localhost:5000/api/auth/signUp', values);
        // Handle successful registration, e.g., redirect to login
        console.log("successfull",response)
      } catch (error) {
        console.error('Error registering', error);
      }
    },
  });

  return (
    <div className="container max-w-lg py-20">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Choose your account type and enter your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Account Type */}
            <RadioGroup
              value={formik.values.accountType}
              onValueChange={(value: string) => formik.setFieldValue('accountType', value)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="seeker"
                  id="seeker"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="seeker"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Job Seeker</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="employer"
                  id="employer"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="employer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>Employer</span>
                </Label>
              </div>
            </RadioGroup>
            {formik.errors.accountType && formik.touched.accountType && (
              <p className="text-red-500 text-sm">{formik.errors.accountType}</p>
            )}

            {/* Full Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <Button className="w-full mt-4" type="submit">
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
