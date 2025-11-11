import { Head, Form, Link } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register, home } from '@/routes';
import { request } from '@/routes/password';

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-2 max-w-sm w-full transform scale-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/images/logo.png" alt="Logo" className="w-20 h-20 mt-2" />
        </div>

        {/* Title & Description */}
        <h1 className="text-xl font-bold text-center mb-2">
          Log in ke Akun Anda
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Masukan Email dan Password untuk login
        </p>

        <Head title="Log in" />

        {/* Status Message */}
        {status && (
          <div className="mb-4 text-center text-sm font-medium text-green-600">
            {status}
          </div>
        )}

        {/* Form */}
        <Form
          method="post"
          action="/login"
          className="flex flex-col gap-6"
        >
          {({ processing, errors }) => (
            <>
              <div className="grid gap-6">
                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="email"
                    placeholder="email@example.com"
                  />
                  <InputError message={errors.email} />
                </div>

                {/* Password */}
                <div className="grid gap-2 relative">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      tabIndex={2}
                      autoComplete="current-password"
                      placeholder="Password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={6}
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

                {/* Remember Me */}
                <div className="flex items-center space-x-3">
                  <Checkbox id="remember" name="remember" tabIndex={3} />
                  <Label htmlFor="remember">Remember me</Label>
                  {canResetPassword && (
                    <TextLink
                      href={request()}
                      className="ml-auto text-sm"
                      tabIndex={5}
                    >
                      Forgot password?
                    </TextLink>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  tabIndex={4}
                  disabled={processing}
                >
                  {processing && (
                    <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                  )}
                  Log in
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <TextLink
                  href={register()}
                  tabIndex={5}
                  className="font-medium text-base"
                >
                  Sign up
                </TextLink>
              </div>

              {/* Back to Home */}
              <div className="text-center mt-2">
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
