import AppLayout from "@/components/Layouts/AppLayout";
import Card from "@/components/Card";
import { Appointments } from "@/hooks/appointments";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/auth";

const Dashboard = () => {

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

  return (
    <AppLayout
      header={
        <div className="flex items-center gap-x-10">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight mr-auto">Appointments</h2>
          <Link href="/services/create" className="btn btn-primary flex gap-2">
            Create
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      }
    >
      <Head>
        <title>Laravel - Dashboard</title>
      </Head>
      {loading == true ? "loading" : ""}

      <div className="flex flex-wrap gap-5">
        {appointments?.map((appointment,index) => {
          return <Card appointment={appointment} key={index} />;
        })}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
