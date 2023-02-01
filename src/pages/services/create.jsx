import AppLayout from "@/components/Layouts/AppLayout";
import Card from "@/components/Card";
import { Appointments } from "@/hooks/appointments";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Label from "@/components/Label";
import Input from "@/components/Input";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Services } from "@/hooks/services";
import InputError from "@/components/InputError";
import toast from "react-hot-toast";


const Create = () => {
  const { post } = Services({
    redirectIfSuccess: "/services",
  });
  const router = useRouter();

  const { quill, quillRef } = useQuill();

  const locations = [
    { name: "Zoom", value: 1 },
    { name: "In Person", value: 2 },
  ];
  const durations = ["15", "30", "45", "60"];

  const [name, setServiceName] = useState("");
  const [location, setLocation] = useState("");
  const [date_range, setDateRange] = useState("30");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [custom_link, setCustomLink] = useState();
  const [color, setColor] = useState("info");

  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML("");
      quill.on("text-change", (delta, oldDelta, source) => {
        setDescription(quill.root.innerHTML);
      });
    }
  }, [quill]);

  
  const submitForm = async (e) => {
    e.preventDefault();
    setIsError(!isError);
    post({
      name,
      location,
      date_range,
      duration,
      description,
      custom_link,
      color,
      setErrors,
      setIsError,
      status
    });

    if (!isError) {
      toast.success("Service created , redirecting ..");
    } else {
      toast.error("There is an error ...");
    }

  };


  return (
    <AppLayout
      header={
        <div className="flex items-start gap-x-10">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight mr-auto">Services</h2>
          <button onClick={() => router.back()} className="btn btn-primary flex gap-2">
            <FontAwesomeIcon icon={faArrowLeft} />
            Go back
          </button>
        </div>
      }
    >
      <Head>
        <title>Create service</title>
      </Head>
      <div className="card sm:w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl">
        {status}
        <div className="card-body">
          <form onSubmit={submitForm}>
            <h2 className="card-title">What this service should be called?</h2>
            <div className="flex items-center gap-2">
              <div className="form-control w-full">
                <Label htmlFor="name" className="label">
                  Service
                </Label>

                <Input id="name" type="text" value={name} className="input input-bordered w-full max-w-xs" onChange={(event) => setServiceName(event.target.value)} autoFocus />
                <InputError messages={errors.name} className="mt-2" />
              </div>
              <div className="form-control w-full">
                <Label htmlFor="location" className="label">
                  Location
                </Label>
                <select name="location" onChange={(event) => setLocation(event.target.value)} className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Select location
                  </option>
                  {locations.map((location, index) => {
                    return (
                      <option value={location.value} key={index}>
                        {location.name}
                      </option>
                    );
                  })}
                </select>
                <InputError messages={errors.location} className="mt-2" />
              </div>
            </div>
            <div className="form-control">
              <Label htmlFor="descreption" className="label">
                Descreption
              </Label>
              <div ref={quillRef} />
              <InputError messages={errors.descreption} className="mt-2" />
            </div>
            <div className="flex items-center gap-2">
              <div className="form-control w-full">
                <Label htmlFor="custom_link" className="label">
                  Custom link
                </Label>

                <Input id="custom_link" type="text" value={custom_link} className="input input-bordered w-full max-w-xs" onChange={(event) => setCustomLink(event.target.value)} required autoFocus />

                <InputError messages={errors.custom_link} className="mt-2" />
              </div>
              <div className="form-control w-full">
                <Label htmlFor="color" className="label">
                  Service color
                </Label>
                <div className="flex items-center gap-3">
                  <input type="radio" name="radio" checked={color === "c-info"} onChange={(event) => setColor(event.target.value)} value="c-info" className="radio radio-info" />
                  <input type="radio" name="radio" checked={color === "c-success"} onChange={(event) => setColor(event.target.value)} value="c-success" className="radio radio-success" />
                  <input type="radio" name="radio" checked={color === "c-warning"} onChange={(event) => setColor(event.target.value)} value="c-warning" className="radio radio-warning" />
                  <input type="radio" name="radio" checked={color === "c-error"} onChange={(event) => setColor(event.target.value)} value="c-error" className="radio radio-error" />
                </div>

                <InputError messages={errors.color} className="mt-2" />
              </div>
            </div>
            <hr className="mt-10 mb-5" />
            <h2 className="card-title">When can people book this service?</h2>
            <div className="form-control">
              <Label htmlFor="date_range" className="label">
                Date range
              </Label>
              <div className="flex items-center gap-2">
                <input type="number" value={date_range} min="30" className="input input-bordered w-20 max-w-xs" onChange={(event) => setDateRange(event.target.value)} required />
                <span>Calendar days into the future</span>
              </div>

              <InputError messages={errors.date_range} className="mt-2" />
            </div>
            <div className="form-control">
              <Label htmlFor="duration" className="label">
                Duration
              </Label>
              <select name="duration" onChange={(event) => setDuration(event.target.value)} className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  Select duration
                </option>
                {durations.map((duration, index) => {
                  return (
                    <option value={duration} key={index}>
                      {duration + " min"}
                    </option>
                  );
                })}
              </select>
              <InputError messages={errors.duration} className="mt-2" />
            </div>
            <div className="card-actions justify-end mt-10">
              <div className="form-control w-52 mr-auto">
                <label className="cursor-pointer label">
                  <input onChange={(event) => setStatus(!status)} checked={status} type="checkbox" className="toggle toggle-primary" />
                </label>
              </div>
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
