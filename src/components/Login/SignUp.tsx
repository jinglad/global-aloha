import { Button } from "antd";
import Link from "next/link";
import React from "react";

const SignUp: React.FC = () => {
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
        <form className="p-5 rounded mt-5" style={{width: "700px"}}>
          <div className="text-center">
            <div>
              <div className="mb-3">
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter full name"
                    className="login-input"
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
                  />
                </div>
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="login-input"
                />
              </div>
              <div className="my-4">
                <Button type="primary" size="large" className="uppercase">Create account</Button>
              </div>
              <div>
                <p>
                  By submitting this form, you agree to Global Aloha's{" "}
                  <span className="text-lime-400">Privacy policy</span> and <span className="text-lime-400">Terms of use</span>.
                </p>
              </div>
              <div>
                <span className="font-bold">Already a member?</span>
                <Link href="/login">
                  <a className="text-lime-400 ml-2 hover:text-lime-600">Log In</a>
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
