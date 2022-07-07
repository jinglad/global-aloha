import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLibraryList } from "../../request/getLibraryList";
import Card from "../Reused/Card/Card";
import Loader from "../Reused/Loader/Loader";

type LibraryProps = {
  categories: any;
};

const Library: React.FC<LibraryProps> = ({ categories }) => {
  const [categoryTitle, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [availableCategory, setAvailableCategory] = useState(categories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newCategories = categories[0].Items?.filter(
      (category: any) => category.ActivityTypes !== null
    );
    setAvailableCategory(newCategories);
  }, []);

  const dispatch = useDispatch();

  const { libraryList } = useSelector((state: any) => state.library);

  useEffect(() => {
    setLoading(true);
    getLibraryList(categoryTitle, 12, page, dispatch, setLoading);
  }, [categoryTitle]);

  return (
    <div className="flex">
      <div className="w-80 mr-5">
        <div className="bg-slate-300 h-screen overflow-auto sticky top-0">
          <div className="py-5">
            <h1 className="ml-10 font-semibold text-xl">Filter</h1>
            <div className="ml-12">
              <p
              onClick={() => setCategory("")}
                className={
                  categoryTitle === ""
                    ? "cursor-pointer bg-blue-500 w-36 py-2 px-3 rounded mt-0 mb-1 text-white"
                    : "cursor-pointer mt-0 mb-1 hover:bg-blue-500 w-32 py-2 px-3 rounded hover:text-white"
                }
              >
                All
              </p>
              {availableCategory?.map((category: any) => (
                <p
                  key={category.Id}
                  className={
                    categoryTitle === category.Value
                      ? "cursor-pointer bg-blue-500 w-36 py-2 px-3 rounded mt-0 mb-1 text-white"
                      : "cursor-pointer mt-0 mb-1 hover:bg-blue-500 w-32 py-2 px-3 rounded hover:text-white"
                  }
                  onClick={() => {
                    setCategory(category.Value);
                  }}
                >
                  {category.ActivityTypes && category.Value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-fit py-5 pr-2">
        {loading ? (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}>
            <Loader />
          </div>
        ) : (
          <div className="grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {libraryList?.map((item: any) => {
              return <Card key={item.ActivityId} item={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
