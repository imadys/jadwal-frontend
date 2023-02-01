import AppLayout from "@/components/Layouts/AppLayout";
import ServiceCard from "@/components/ServiceCard";
import { Services } from "@/hooks/services";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { get } = Services();

  let services = [];
  let loading = true;

  const getServices = async () => {
    services = get;
    loading = false;
  };

  getServices();

  return (
    <AppLayout
      header={
        <div className="flex items-center gap-x-10">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight mr-auto">Services</h2>
          <Link href="/services/create" className="btn btn-primary flex gap-2">
            Create
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      }
    >
      <Head>
        <title>Jadwal - Services</title>
      </Head>
      {loading == true ? "loading" : ""}

      <div className="flex flex-wrap gap-5">
        {services?.map((service,index) => {
          return <ServiceCard key={index} service={service} />;
        })}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
