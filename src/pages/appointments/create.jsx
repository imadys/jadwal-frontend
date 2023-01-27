import AppLayout from "@/components/Layouts/AppLayout";
import Card from "@/components/Card";
import { Appointments } from "@/hooks/appointments";
import Head from "next/head";
import { useEffect, useState } from "react";

const Create = () => {
  const { post, get } = Appointments();

  const [topic, setTopic] = useState("");
  const [start_time, setStartTime] = useState("");
  const [duration, setDuration] = useState("10");
  const [host_video, setHostVideo] = useState(true);
  const [participant_video, setParticipantVideo] = useState(true);
  let appointments = [];
  let loading = true;

  const getAppointments = async () => {
    appointments = get;
    loading = false;
  };

  getAppointments();

  const submitForm = async (e) => {
    e.preventDefault();

    post({
      topic,
      start_time,
      duration,
      host_video,
      participant_video,
    });
  };

  return (
    <AppLayout
      header={
        <div className="flex items-center gap-x-10">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Appointments</h2>
          <button className="btn btn-primary">Create</button>
        </div>
      }
    >
      <Head>
        <title>Laravel - Dashboard</title>
      </Head>
      {loading == true ? "loading" : ""}

      <div className="flex gap-5">
        {appointments?.map((appointment) => {
          return <Card appointment={appointment} />;
        })}
      </div>
    </AppLayout>
  );
};

export default Create;
