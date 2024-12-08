import { SignupForm } from "./signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create a new account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                href="/auth/sign-in"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                log in to your existing account
              </Link>
            </p>
          </div>
          <SignupForm />
        </div>
      </main>
    </div>
  );
}
