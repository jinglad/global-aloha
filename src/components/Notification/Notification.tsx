import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNotification } from "../../request/getNotification";
import { getRequest } from "../../request/getRequest";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Reused/Loader/Loader";
import { Button } from "antd";
import { useRouter } from "next/router";

type PropsType = {
  type: string;
};

const Notification = ({ type }: PropsType) => {
  const { globalAccessToken: token, user } = useSelector(
    (state: any) => state.user
  );
  const [notification, setNotification] = useState<any>([]);
  const [requests, setRequests] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [hasMore, setHasMore] = useState(false);
  const [pagingToken, setPagingToken] = useState<any>(null);
  const path = useRouter().pathname;

  const handleJoinRequest = async (RequestId: string) => {
    const response = await fetch(
      ` https://api-requestservice-dev.saams.xyz/v2/requests/update-status`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          RequestId,
          Status: 1,
          UserId: user?.UserId,
        }),
      }
    );
    if (response.ok) {
      alert("Successfully Added");
      getRequest(token, page, size, user?.UserId).then((result) => {
        setRequests(result?.Items);
        if (result?.PageInfo?.HasNextPage) {
          setHasMore(true);
        }
      });
    }
  };

  useEffect(() => {
    if (type === "notification") {
      getNotification(token, user?.UserId).then((result) => {
        setNotification(result?.Notifications);
        setPagingToken(result?.PagingToken);
        if (result?.PagingToken) {
          setHasMore(true);
        }
      });
    } else {
      getRequest(token, page, size, user?.UserId).then((result) => {
        setRequests(result?.Items);
        if (result?.PageInfo?.HasNextPage) {
          setHasMore(true);
        }
      });
    }
  }, [token, user]);

  const fetchMoreData = () => {
    if (type === "notification") {
      getNotification(token, user?.UserId, pagingToken).then((result) => {
        setNotification((prev: any) => prev?.concat(result?.Notifications));
        setPagingToken(result?.PagingToken);
        if (result?.PagingToken) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      });
    } else {
      const newPage = page + 1;
      getRequest(token, newPage, size, user?.UserId).then((result) => {
        setRequests((prev: any) => prev.concat(result?.Items));
        if (result?.PageInfo?.HasNextPage) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      });
    }
  };

  return (
    <div className="w-4/5 mx-auto my-5">
      <div>
        <Link href="/notifications">
          <a className="text-black p-3 rounded hover:bg-slate-200 hover:text-black mr-3">
            Notifications
          </a>
        </Link>
        <Link href="/requests">
          <a
            className={
              path === "/requests"
                ? "notification-menu bg-gray-200"
                : "notification-menu"
            }
          >
            Request
          </a>
        </Link>
      </div>
      <div className="border-2 border-indigo-200 mt-5">
        {type !== "notification" ? (
          <div className="relative">
            <InfiniteScroll
              dataLength={requests?.length}
              next={fetchMoreData}
              hasMore={hasMore}
              height={200}
              loader={
                <div>
                  <Loader />
                </div>
              }
            >
              {requests?.map((data: any) => (
                <div
                  style={{
                    height: 50,
                    border: "1px solid green",
                    margin: 6,
                    padding: 8,
                  }}
                  key={data?.Id}
                >
                  <div className="flex justify-between h-full">
                    <p className="m-0 leading-3 align-middle">
                      {data?.Content}
                    </p>
                    <div>
                      <Button onClick={() => handleJoinRequest(data?.Id)}>Join</Button>
                    </div>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <div className="relative">
            <InfiniteScroll
              dataLength={notification?.length}
              next={fetchMoreData}
              hasMore={hasMore}
              height={500}
              loader={
                <div>
                  <Loader />
                </div>
              }
            >
              {notification?.map((data: any) => (
                <div
                  style={{
                    height: 50,
                    border: "1px solid green",
                    margin: 6,
                    padding: 8,
                  }}
                  key={data?.Id}
                >
                  <div className="flex justify-between h-full">
                    <p className="m-0 leading-3 align-middle">
                      {data?.Response?.Content}
                    </p>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
