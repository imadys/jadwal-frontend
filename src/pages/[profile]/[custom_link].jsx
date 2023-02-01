import { useRouter } from "next/router";

import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Label from "@/components/Label";
import InputError from "@/components/InputError";
import { Profile } from "@/hooks/profile";
import Input from "@/components/Input";
import ReactDatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  const router = useRouter();
  const { appointmentPost } = Profile({});

  const { profile,custom_link } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [availabilities, setAvailabilities] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appointment_date, setAppointmentDate] = useState("");
  const [selectedService, setSelectedService] = useState({});
  const [errors, setErrors] = useState([]);
  const [isError, setIsError] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    let service_id = selectedService.id;

    appointmentPost({
      name,
      email,
      appointment_date,
      service_id,
      setErrors,
      setLoading,
      setIsError,
    });

    if (isError) {
      toast.error("There is an error ...");
    } else {
      toast.success("Appointment created ... redirecting");
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${profile}/${custom_link}`)
      .then((res) => res.data)
      .then((data) => {
        setUser(data.user);
        data.availabilities.map((item) => {
          setAvailabilities((old) => [...old, ...[new Date(item)]]);
        });
        setSelectedService(data.service);
        console.log(availabilities);
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
          <div className="m-5">
            <Link href={`/${profile}`} className="btn btn-circle btn-sm ml-auto absolute">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
          </div>
          <div className="card-body">
            <h2 className="card-title">{user.name}</h2>
            <p className="mb-10">Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.</p>
            <form onSubmit={submitForm}>
              {selectedService?.id && (
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

                        <Input id="name" type="text" value={name} className="input input-bordered" onChange={(event) => setName(event.target.value)} required autoFocus />

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
                        <ReactDatePicker
                          className="input input-bordered w-full"
                          selected={appointment_date}
                          minDate={new Date()}
                          maxDate={addDays(new Date(), selectedService.date_range)}
                          onChange={(date) => setAppointmentDate(date)}
                          excludeDates={availabilities}
                          placeholderText="Select appointment date"
                          dateFormat="yyyy-MM-dd"
                        />
                        <InputError messages={errors.appointment_date} className="mt-2" />
                      </div>

                      <div className="mt-5 ml-auto">
                        <button type="submit" className={isLoading ? "btn btn-sm btn-primary loading" : "btn btn-sm btn-primary"}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
