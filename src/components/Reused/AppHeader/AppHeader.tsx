import { Avatar, Button, Popover } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAccessToken, setProfile, setUser } from "../../../Redux/userSlice";
import { token } from "../../../utils/utils";
import SearchModal from "../SearchModal/SearchModal";

const AppHeader = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  const { globalAccessToken, profile } = useSelector(
    (state: any) => state.user
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const logOut = async () => {
    const response = await fetch(
      `https://api-userservice-dev.saams.xyz/v2/logout`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Token: token }),
      }
    );

    if (response.ok) {
      {
        dispatch(setAccessToken(""));
        dispatch(setUser(null));
        dispatch(setProfile(null));
        router.push("/login");
      }
    }
  };

  return (
    <div className="py-5 px-2 shadow">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/dashboard/my-activity">
              <a className="text-3xl text-black hover:text-lime-400">
                Global Aloha
              </a>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-5">
              <div
                className="mr-4 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div>
                <Link href="/library">
                  <a className="text-md mr-5 text-black hover:text-lime-400">
                    Activity Library
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/groups">
                  <a className="text-md text-black hover:text-lime-400">
                    Groups
                  </a>
                </Link>
              </div>
            </div>
            {globalAccessToken ? (
              <div>
                <Popover
                  className="cursor-pointer"
                  placement="bottomRight"
                  title={
                    <div>
                      <h5 className="text-md font-bold mb-0">
                        {profile?.firstName} {profile?.lastName}
                      </h5>
                      <p className="m-0">
                        <small className="text-gray-400 text-sm">
                          {profile?.email}
                        </small>
                      </p>
                    </div>
                  }
                  trigger="click"
                  content={
                    <div>
                      <div>
                        <Link href="/profile">
                          <a className="text-black">Profile</a>
                        </Link>
                      </div>
                      <div>
                        <Link href="/dashboard/my-activity">
                          <a className="text-black">My Activity</a>
                        </Link>
                      </div>
                      <div className="mb-1">
                        <Link href="/dashboard/my-group">
                          <a className="text-black">My group</a>
                        </Link>
                      </div>
                      <Button type="primary" onClick={logOut}>
                        Log out
                      </Button>
                    </div>
                  }
                >
                  <div className="flex items-center">
                    <Avatar
                      size="large"
                      src={
                        profile?.profilePhoto
                          ? profile?.profilePhoto
                          : "https://joeschmoe.io/api/v1/random"
                      }
                    />
                  </div>
                </Popover>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <a>
                    <Button type="primary">Login</Button>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <SearchModal open={open} onClose={onClose} />
    </div>
  );
};

export default AppHeader;
