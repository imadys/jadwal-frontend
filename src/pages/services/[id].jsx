import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Label from "@/components/Label";
import Input from "@/components/Input";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Services } from "@/hooks/services";
import InputError from "@/components/InputError";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const { quill, quillRef } = useQuill();

  const { put } = Services({
    redirectIfSuccess: "/services",
  });

  const locations = [
    { name: "Zoom", value: 1 },
    { name: "In Person", value: 2 },
  ];
  const durations = ["15", "30", "45", "60"];

  const [serviceId, setServiceId] = useState("");
  const [name, setServiceName] = useState("");
  const [location, setLocation] = useState("");
  const [date_range, setDateRange] = useState("30");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [custom_link, setCustomLink] = useState("");
  const [color, setColor] = useState("info");
  const [status, setStatus] = useState(true);

  const [isError, setIsError] = useState(false);

  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const updateForm = async (e) => {
    e.preventDefault();
    setDescription(quillRef.current.innerHTML);
    put({
      name,
      serviceId,
      location,
      date_range,
      duration,
      description,
      custom_link,
      color,
      status,
      setErrors,
      setIsError,
    });
    if (!isError) {
      toast.success("Service updated");
    } else {
      toast.error("There is an error ...");
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    axios(`/api/services/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setServiceId(data.id);
        setServiceName(data.name);
        setLocation(data.location);
        setDateRange(data.date_range);
        setDescription(data.description);
        setCustomLink(data.custom_link);
        setStatus(data.status == 1 ? true : false);

        setColor(data.color);
        setDuration(data.duration);
        setLoading(false);
        if (quill) {
          quill.clipboard.dangerouslyPasteHTML(data.description);
        }
      });
  }, [router.isReady, quill]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setDescription(quill.root.innerHTML);
      });
    }
  }, [quill]);
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
        <title>Edit service</title>
      </Head>
      <div className="card sm:w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={updateForm}>
            <h2 className="card-title">What this service should be called?</h2>
            <div className="flex items-center gap-2">
              <div className="form-control w-full">
                <Label htmlFor="name" className="label">
                  Service
                </Label>

                <Input id="name" type="text" value={name} className="input input-bordered w-full max-w-xs" onChange={(event) => setServiceName(event.target.value)} required autoFocus />
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
                  {locations.map((item, index) => {
                    return (
                      <option value={item.value} key={index} selected={item.value == location}>
                        {item.name}
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
                    <option value={duration} key={index} selected={duration == duration}>
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
              <button className="btn btn-primary">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Edit;
