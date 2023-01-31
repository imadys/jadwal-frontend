import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import AuthSessionStatus from "@/components/AuthSessionStatus";
import Button from "@/components/Button";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Input from "@/components/Input";    
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
export default function Login() {
  const router = useRouter();

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const submitForm = async (event) => {
    event.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };
  return (
    <>
      <Head>
        <title>Login - Jadwal</title>
      </Head>
      <div className="hero min-h-screen bg-base-200">
        <div className="w-96">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-5xl font-bold">Welcome to Jadwal</h1>
          </div>
          <div className="card flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={submitForm}>
              {/* Email Address */}
              <div className="form-control">
                <Label htmlFor="email" className="label">
                  Email
                </Label>

                <Input id="email" type="email" value={email} className="input input-bordered" onChange={(event) => setEmail(event.target.value)} required autoFocus />

                <InputError messages={errors.email} className="mt-2" />
              </div>

              {/* Password */}
              <div className="mt-4 form-control">
                <Label htmlFor="password" className="label">
                  Password
                </Label>

                <Input id="password" type="password" value={password} className="input input-bordered" onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" />

                <InputError messages={errors.password} className="mt-2" />
              </div>

              {/* Remember Me */}
              <div className="block mt-4">
                <label htmlFor="remember_me" className="inline-flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    name="remember"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    onChange={(event) => setShouldRemember(event.target.checked)}
                  />

                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
              </div>

              <div className="flex items-center justify-end mt-4">
                <Link href="/forgot-password" className="underline text-sm text-gray-600 hover:text-gray-900 mr-auto">
                  Forgot your password?
                </Link>

                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
