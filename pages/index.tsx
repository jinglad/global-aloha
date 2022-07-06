import type { NextPage } from "next";
import Head from "next/head";
import SignUp from "../src/components/Login/SignUp";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Global Aloha</title>
      </Head>
      <div>
        <SignUp />
      </div>
    </div>
  );
};

export default Home;
