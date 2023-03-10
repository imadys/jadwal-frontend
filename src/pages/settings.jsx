import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import Button from "@/components/Button";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import Head from "next/head";
import AppLayout from "@/components/Layouts/AppLayout";
import { toast } from "react-hot-toast";

const Settings = () => {
  const { user } = useAuth({ middleware: "auth" });

  const { update } = useAuth();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [isError, setIsError] = useState(false);

  const [errors, setErrors] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();

    update({
      name,
      id,
      username,
      email,
      setErrors,
      setIsError,
    });

    if (!isError) {
      toast.success("User info updated!");
    } else {
      toast.error("There is an error ...");
    }    
  };

  useEffect(() => {
    setId(user?.id);
    setName(user?.name);
    setUserName(user?.username);
    setEmail(user?.email);
  }, [user]);

  return (
    <AppLayout
      header={
        <div className="flex items-center gap-x-10">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight mr-auto">Settings</h2>
        </div>
      }
    >
      <Head>
        <title>Jadwal - Settings</title>
      </Head>
      <div className="card flex-shrink-0 w-96 mx-auto max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={submitForm}>
          {/* Name */}
          <div className="form-control">
            <Label htmlFor="username">Username</Label>
            <small className="text-accent mb-2">this username will be used for your page</small>
            <Input id="username" type="text" value={username} className="input input-bordered" onChange={(event) => setUserName(event.target.value)} required autoFocus />

            <InputError messages={errors.name} className="mt-2" />
          </div>
          <div className="form-control">
            <Label htmlFor="name">Name</Label>

            <Input id="name" type="text" value={name} className="input input-bordered" onChange={(event) => setName(event.target.value)} required autoFocus />

            <InputError messages={errors.name} className="mt-2" />
          </div>

          {/* Email Address */}
          <div className="mt-4 form-control">
            <Label htmlFor="email">Email</Label>

            <Input id="email" type="email" value={email} className="input input-bordered" onChange={(event) => setEmail(event.target.value)} required />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <button className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default Settings;
