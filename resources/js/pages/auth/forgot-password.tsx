// Components
import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { login, home } from '@/routes';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 md:p-10">
            <Head title="Forgot password" />

            <div className="w-full max-w-sm space-y-8">
                {/* Logo */}
                <div className="flex flex-col items-center gap-4">
                    <Link href={home()} className="flex flex-col items-center gap-2 font-medium">
                        <img
                            src="/images/logo.png"
                            alt="App Logo"
                            className="h-19 w-19"
                        />
                        <span className="sr-only">Forgot password</span>
                    </Link>

                    {/* Title + description */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-medium">Forgot password</h1>
                        <p className="text-sm text-muted-foreground">
                            Masukan Email Untuk mendapatkan Link Reset Password
                        </p>
                    </div>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                {/* Form */}
                <Form {...PasswordResetLinkController.store.form()}>
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="flex items-center justify-start">
                                <Button className="w-full" disabled={processing}>
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Email password reset link
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>

                {/* Back to login */}
                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Or, return to</span>
                    <TextLink href={login()}>log in</TextLink>
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
            </div>
        </div>
    );
}
