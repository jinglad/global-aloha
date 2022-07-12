import { Avatar, Button, Popover } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setGroups } from "../../../Redux/librarySlice";
import { setAccessToken, setProfile, setUser } from "../../../Redux/userSlice";

const AppHeader = () => {
  const { globalAccessToken, profile } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const logOut = () => {
    dispatch(setAccessToken(""));
    dispatch(setUser(null));
    dispatch(setProfile(null));
    router.push("/login");
  };

  return (
    <div className="py-5 px-2 shadow">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <a className="text-3xl text-black hover:text-lime-400">Global Aloha</a>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="mr-5">
              <Link href="/library">
                <a className="text-md mr-5 text-black hover:text-lime-400">Activity Library</a>
              </Link>
              <Link href="/groups">
                <a className="text-md text-black hover:text-lime-400">Groups</a>
              </Link>
            </div>
            {globalAccessToken ? (
              <div>
                <Popover
                  className="cursor-pointer"
                  placement="bottomRight"
                  title={
                    <div>
                      <h5 className="text-md font-bold mb-0">
                        {profile?.firstName}{" "}{profile?.lastName}
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
                        <Link href="/my-activity">
                          <a className="text-black">My Activity</a>
                        </Link>
                      </div>
                      <div className="mb-1">
                        <Link href="/my-group">
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
                  <Avatar size="large" src={profile?.profilePhoto ? profile?.profilePhoto : "https://joeschmoe.io/api/v1/random"} />
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
    </div>
  );
};

export default AppHeader;
