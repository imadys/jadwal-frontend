import { useRouter } from "next/router";

import Head from "next/head";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Label from "@/components/Label";
import InputError from "@/components/InputError";
import Input from "@/components/Input";


export default function Profile() {
  const router = useRouter();
  const { profile } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({});


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appointment_date, setAppointmentDate] = useState("");
  const [selectedService, setSelectedService] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [errors, setErrors] = useState([]);


    const defaultValue = {
      year: 2019,
      month: 10,
      day: 5,
    };


  const pickService = (e) => {
    e.preventDefault();
    console.log(selectedService);

  };

  useEffect(() => {

    if (!router.isReady) return;
    setLoading(true);
    axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/${profile}`)
      .then((res) => res.data)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        router.push("/404");
      });
  }, [router.isReady]);
  return (
    <>
      <Head>
        <title>{profile}</title>
      </Head>

      <div className="hero min-h-screen bg-base-200 p-32 flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title">{user.name}</h2>
            <p className="mb-10">Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.</p>
            <form onSubmit={pickService}>
              <div className="flex flex-wrap justify-center gap-4">
                {user.services?.map((item) => {
                  return (
                    <button
                      onClick={() => {
                        setSelectedService(item);
                      }}
                      className={"shadow-[0_5px_0px_0px_rgb(0,0,0,0.3)] card w-72 bg-base-100 card-bordered cursor-pointer " + item.color + "-shadow" + " " + item.color + "-border"}
                    >
                      {selectedService?.id == item.id && <div className={"badge badge-sm m-3 absolute " + item.color}></div>}
                      <div className="card-body">
                        <h2 className="card-title">{item.name}</h2>
                      </div>
                    </button>
                  );
                })}
              </div>
              <hr className="my-10" />
              {selectedService?.id && (
                <>
                  <div className="card bg-base-100 shadow-xl">
                    <div className="card-body flex">
                      <div>
                        <h2 className="card-title mb-3">
                          {selectedService.name} | {selectedService.duration} Min. | <span className="text-secondary">Zoom</span>
                        </h2>
                        <div dangerouslySetInnerHTML={{ __html: selectedService.description }}></div>

                        <div className="form-control">
                          <Label htmlFor="name" className="label">
                            Your name
                          </Label>

                          <Input id="name" type="email" value={name} className="input input-bordered" onChange={(event) => setName(event.target.value)} required autoFocus />

                          <InputError messages={errors.name} className="mt-2" />
                        </div>
                        <div className="form-control">
                          <Label htmlFor="email" className="label">
                            Email
                          </Label>

                          <Input id="email" type="email" value={email} className="input input-bordered" onChange={(event) => setEmail(event.target.value)} required autoFocus />

                          <InputError messages={errors.email} className="mt-2" />
                        </div>
                        <div className="form-control">
                          <Label htmlFor="appointment_date" className="label">
                            Appointment date
                          </Label>

                          <Input id="appointment_date" type="date" value={appointment_date} className="input input-bordered" onChange={(event) => setAppointmentDate(event.target.value)} required autoFocus />

                          <InputError messages={errors.appointment_date} className="mt-2" />
                        </div>

                        <div className="mt-5 ml-auto">
                          <button type="submit" className="btn btn-sm btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
