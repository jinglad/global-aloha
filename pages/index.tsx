import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SignUp from "../src/components/Login/SignUp";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/my-activity").then();
  },[])

  return (
    <div>
      <Head>
        <title>Global Aloha</title>
      </Head>
    </div>
  );
};

export default Home;
