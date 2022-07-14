import { Button } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../Redux/userSlice";
import { getProfile } from "../../request/getProfile";
import { getUserInfo } from "../../request/getUserInfo";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const {user, profile} = useSelector((state:any) => state.user);

  const signIn = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://api-userservice-dev.saams.xyz/oauth2/token/v2",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          grant_type: "password",
          password,
          scope:
            "v2,e1e0322c-acb0-4a24-958c-23b2ad912a2c,af3baf1d-7aae-462c-9d1e-051cef459b86,6863cd1f7b746557143788b13fe0d09a",
          DeviceInfo:
            '{"userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36 OPR/88.0.4412.53","os":"Windows","browser":"Opera","device":"Unknown","os_version":"windows-10","browser_version":"88.0.4412.53","deviceId":"6863cd1f7b746557143788b13fe0d09a","loginDate":"Tue, 05 Jul 2022 08:04:04 GMT"}',
        }),
      }
    );
    setLoading(false);
    if (response.ok) {
      const res = await response.json();
      typeof window !== undefined && localStorage.setItem("ga_token", res.access_token);
      dispatch(setAccessToken(res.access_token));
      setEmail("");
      setPassword("");
      getUserInfo(dispatch, res.access_token, router);
      // router.push("/");
    }
  };

  return (
    <>
    <Head>
      <title>Global Aloha | Login</title>
    </Head>
      <div
      className="flex justify-center items-center"
      style={{ height: "500px" }}
    >
      <div>
        <h1 className="text-3xl text-center">Log In</h1>
        <p className="text-lg text-center">
          Enter the email address and password associated with your GlobalAloha
          account to log in.
        </p>
        <form
          onSubmit={signIn}
          className="p-5 rounded mt-5"
          style={{ width: "700px" }}
        >
          <div className="text-center">
            <div>
              <div className="mb-3">
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email address"
                    className="login-input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="login-input"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="my-4">
                {loading ? (
                  <Button loading>Loading</Button>
                ) : (
                  <Button
                    onClick={signIn}
                    type="primary"
                    size="large"
                    className="uppercase"
                  >
                    Log in
                  </Button>
                )}
              </div>

              <div>
                <span>Don't have an account yet??</span>
                <Link href="/signup">
                  <a className="text-lime-400 ml-2 hover:text-lime-600">
                    Sign Up
                  </a>
                </Link>
              </div>
              <div>
                <p>
                  Alternatively, you can visit the
                  <Link href="/library">
                    <a className="mx-2 text-lime-400 hover:text-lime-600">
                      Library
                    </a>
                  </Link>
                  pages.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
