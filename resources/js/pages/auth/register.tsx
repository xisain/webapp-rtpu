import { useState } from 'react';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login, home } from '@/routes';

// ⚠️ Tidak bisa import controller Laravel di frontend, hapus baris berikut jika belum dihapus
// import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';

export default function Register() {
  // State untuk show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 md:p-10">
      <Head title="Register" />

      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <Link href={home()} className="flex flex-col items-center gap-2 font-medium">
            <img
              src="/images/logo.png"
              alt="App Logo"
              className="h-19 w-19"
            />
            <span className="sr-only">Create an account</span>
          </Link>

          {/* Title + description */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-medium">Create an account</h1>
            <p className="text-base text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
        </div>

        {/* Form */}
        <Form
          method="post"
          action="/register"
          resetOnSuccess={['password', 'password_confirmation']}
          disableWhileProcessing
          className="flex flex-col gap-6"
        >
          {({ processing, errors }) => (
            <>
              <div className="grid gap-6">
                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="name"
                    name="name"
                    placeholder="Full name"
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    tabIndex={2}
                    autoComplete="email"
                    name="email"
                    placeholder="email@example.com"
                  />
                  <InputError message={errors.email} />
                </div>

                {/* Password */}
                <div className="grid gap-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      tabIndex={3}
                      autoComplete="new-password"
                      name="password"
                      placeholder="Password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={7}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <InputError message={errors.password} />
                </div>

                {/* Confirm Password */}
                <div className="grid gap-2 relative">
                  <Label htmlFor="password_confirmation">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="password_confirmation"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      tabIndex={4}
                      autoComplete="new-password"
                      name="password_confirmation"
                      placeholder="Confirm password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={8}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <InputError message={errors.password_confirmation} />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="mt-2 w-full" tabIndex={5}>
                  {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                  Create account
                </Button>
              </div>

              {/* Login link */}
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <TextLink href={login()} tabIndex={6}>
                  Log in
                </TextLink>
              </div>

              {/* Back to Home */}
              <div className="text-center">
                <Link
                  href={home()}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  Back to Home
                </Link>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
