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
        </div>
      }
    >
      <Head>
        <title>Jadwal - Dashboard</title>
      </Head>
      {loading == true ? "loading" : ""}

      <div className="flex flex-wrap gap-5">
        {appointments?.map((appointment, index) => {
          return <Card appointment={appointment} key={index} />;
        })}
      </div>
      {appointments?.length <= 0 && (
        <div className="alert shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>You don't have any appointment for now.</span>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Dashboard;
