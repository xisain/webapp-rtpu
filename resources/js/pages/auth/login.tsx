import { Head, Form, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { register, home } from '@/routes';
import { request } from '@/routes/password';

// ⚠️ Ini sebaiknya dihapus (nggak bisa import Controller Laravel ke frontend)
import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src="/images/logo.png" alt="Logo" className="w-20 h-20 mt-7" />
      </div>

      {/* Title & Description */}
      <h1 className="text-2xl font-bold text-center mb-2">
        Log in ke Akun Anda
      </h1>
      <p className="text-center text-muted-foreground mb-6">
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
        {...AuthenticatedSessionController.store.form()}
        resetOnSuccess={['password']}
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={2}
                  autoComplete="current-password"
                  placeholder="Password"
                />
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
            <div className="text-center mt-4">
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
  );
}
