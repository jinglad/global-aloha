import { Button, Dropdown, Menu, Popover, Select } from "antd";
import { Option } from "antd/lib/mentions";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { gagroupservice } from "../../services/gagroupservice";
import { userservice } from "../../services/userservice";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schools, setSchools] = useState<any>([]);
  const [school, setSchool] = useState<any>({});
  const { globalAccessToken: token, user } = useSelector(
    (state: any) => state.user
  );
  const router = useRouter();

  useEffect(() => {
    fetch(
      `${gagroupservice}/api/v1/group/get-root-groups`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setSchools(data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const handleSignUp = async () => {
    const obj = {
      ApplicationId: "e1e0322c-acb0-4a24-958c-23b2ad912a2c",
      DeviceId: "3fdef3af0b4ad457a08bdbd7e9243d91",
      DeviceInfo:
        '{"userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36","os":"Windows","browser":"Chrome","device":"Unknown","os_version":"windows-10","browser_version":"103.0.0.0","deviceId":"3fdef3af0b4ad457a08bdbd7e9243d91","date":"Sun, 24 Jul 2022 06:20:50 GMT"}',
      Email: email,
      EmailActivationTemplateName: "EmailActivation",
      EmailActivationUrl: "https://app-globalaloha-dev.saams.xyz/verify-email",
      ExtraData: JSON.stringify({
        GroupId: school,
        ProfileData: { Step: "Step1", timeZoneId: 60 },
      }),
      FirstName: name.trim().split(/\s+/)[0],
      GmtOffset: "6",
      LanguageCode: null,
      LastName: name.trim().split(/\s+/)[1],
      LoginUrl: "https://app-globalaloha-dev.saams.xyz/login",
      Password: password,
      RequireEmailActivation: true,
      RoleId: "67d38259-1de5-4434-aaf7-d69fe827109f",
      SignupEmailTemplateName: "RegistrationSuccess",
      TenantId: "af3baf1d-7aae-462c-9d1e-051cef459b86",
    };

    const response = await fetch(`${userservice}/api/v2/register/user`,{
      method:"POST",
      headers: {
        "content-type":"application/json",
      },
      body: JSON.stringify(obj)
    })
    if(response.ok) {
      alert("Account created successfully. Please activate your accoutn through the link sent to your email.");
      router.push("/login");
    }
  };

  const handleChange = (value: string) => {
    setSchool(value);
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "500px" }}
    >
      <div>
        <h1 className="text-3xl text-center">
          Sign up today. It just takes minutes!
        </h1>
        <p className="text-lg text-center">
          Create your Global Aloha account by entering the information below.
        </p>
        <form className="p-5 rounded mt-5" style={{ width: "700px" }}>
          <div className="text-center">
            <div>
              <div className="mb-3">
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter full name"
                    className="login-input"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email address"
                    className="login-input"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="login-input"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
              <div className="my-3">
                <Select
                  className="w-3/4"
                  placeholder="Select School"
                  onChange={handleChange}
                >
                  {schools?.map((item: any) => (
                    <Option key={item?.Id}>{item?.Title}</Option>
                  ))}
                </Select>
              </div>
              <div className="my-4">
                <Button onClick={handleSignUp} type="primary" size="large" className="uppercase">
                  Create account
                </Button>
              </div>
              <div>
                <p>
                  By submitting this form, you agree to Global Aloha{"'"}s{" "}
                  <span className="text-lime-400">Privacy policy</span> and{" "}
                  <span className="text-lime-400">Terms of use</span>.
                </p>
              </div>
              <div>
                <span className="font-bold">Already a member?</span>
                <Link href="/login">
                  <a className="text-lime-400 ml-2 hover:text-lime-600">
                    Log In
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
