import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@mui/material";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

interface Article {
  id: number;
  title: string;
  description: string;
}

export default function Detail() {
  const [countUp, setCountUp] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [newCommId, setNewCommId] = useState(0);
  const [IdComment, setIdComment] = useState(0);

  console.log(IdComment);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  let { id } = useParams();

  const [data, setData] = useState<Article | null>(null);
  const fetchData = async () => {
    const response = await axios.get<Article>(
      `http://localhost:3000/articles/${id}`
    );

    setData(response.data);
  };
  useEffect(() => {
    fetchData();
    fetchComment();
  }, []);

  const [count, setCount] = useState<number>(0);

  const [dataComment, setDataComment] = useState<any[]>([]);
  const fetchComment = async () => {
    const response = await axios.get(`http://localhost:3000/comment`);

    let x = response.data.filter((item: any) => item.id_article == id);
    setDataComment(x);
    setCount(x.length);
  };

  const subComment = async (data: any) => {
    console.log(data);

    let newComment = {
      comment: data["newcomment" + newCommId],

      id_comment: IdComment,

      id_user: 1,
      creationDate: new Date(),
    };

    console.log(newComment);

    if (newComment.comment != "") {
      try {
        await axios.post("http://localhost:3000/subComment", newComment);

        (
          document.querySelector(
            `input[name="newcomment${newCommId}"]`
          ) as HTMLInputElement
        ).value = "";

        let com: HTMLElement | null = document.querySelector(
          "#new_comment_" + newCommId
        );

        com!.classList.add("hidden");

        navigate("/detail/" + id);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSubComment();
  };

  const onSubmit = async (data: any) => {
    let newProduct = {
      comment: data.comment,

      id_article: id,

      id_user: 1,
      creationDate: new Date(),
    };

    let elem: HTMLInputElement | null = document.querySelector(
      "#comment_description"
    );

    if (newProduct.comment != "") {
      try {
        await axios.post("http://localhost:3000/comment", newProduct);

        elem!.value = "";
        fetchComment();
        navigate("/detail/" + id);
        toast.success("Successfully toasted!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteOne = async (id: number) => {
    try {
      await axios.delete("http://localhost:3000/comment/" + id);

      fetchComment();
      //navigate("/detail/" + id);
    } catch (error) {
      console.error(error);
    }
  };

  const [subComent, setSubComent] = useState<any[]>([]);

  const fetchSubComment: any = async () => {
    const response = await axios.get("http://localhost:3000/subComment");

    setSubComent(response.data);
  };

  useEffect(() => fetchSubComment, []);

  return (
    <div className="">
      <Toaster position="bottom-right" reverseOrder={false} />
      {data && (
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <figure className="max-w-screen-md mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  {data.title}
                </h2>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">
                  {data.description}
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img
                  className="w-6 h-6 rounded-full"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium text-gray-900 dark:text-white">
                    Samir said
                  </div>
                  <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                    CEO at Google
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>
      )}
      {/* ------------------------------------- */}

      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div className="max-w-2xl px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion : ({count})
            </h2>
          </div>
          <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                rows={6}
                {...register("comment")}
                id="comment_description"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className=" mr-6 bg-blue-600 text-white inline-flex items-center py-2.5 px-4 text-xs font-bold text-center  bg-primary-700  rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Post Comment
            </button>

            <button
              type="reset"
              className="bg-red-600 text-white inline-flex items-center py-2.5 px-4 text-xs font-bold text-center  bg-primary-700  rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              ANNULER
            </button>
          </form>
          {dataComment.map((item, index) => {
            return (
              <article
                key={index}
                className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900 relative"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white underline">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="Michael Gough"
                      />
                      Anonymous
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time title="February 8th, 2022">
                        {new Date(item.creationDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </time>
                    </p>
                  </div>

                  <Button onClick={() => setCountUp(countUp + 1)}>
                    <ThumbUpOffAltIcon />
                    {`${countUp === 0 ? "" : countUp}`}
                  </Button>
                  <Button onClick={() => setCountDown(countDown + 1)}>
                    <ThumbDownOffAltIcon />
                    {`${countDown === 0 ? " " : countDown}`}
                  </Button>

                  <button
                    onClick={() => {
                      let scroll: Element | null = document.querySelector(
                        "#dropdownComment" + index
                      );
                      scroll!.classList.toggle("hidden");
                    }}
                    id={`dropdownComment${index}Button`}
                    data-dropdown-toggle="dropdownComment1"
                    className="closest inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>

                  <div
                    // onBlur={() => {
                    //   let scroll = document.querySelector(
                    //     "#dropdownComment" + index
                    //   );
                    //   scroll.classList.add("hidden");
                    // }}

                    id={"dropdownComment" + index}
                    className="dropComment absolute  right-0 top-[40%] hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton"
                    >
                      <li>
                        <a
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-bold text-red-600 underline"
                          onClick={() => {
                            deleteOne(item.id);

                            toast.error("comment deleted with succes.", {
                              style: {
                                border: "1px solid red",
                                padding: "30px",
                                color: "red",
                              },
                              iconTheme: {
                                primary: "red",
                                secondary: "#FFFAEE",
                              },
                            });
                          }}
                        >
                          Remove
                        </a>
                      </li>
                    </ul>
                  </div>
                </footer>

                <p key={index} className="m-3 dark:text-white">
                  <span className=" font-bold underline text-red-700"></span>
                  {item.comment}
                </p>
                <hr className="w-[50%]" />
                {/* ---------------------- */}

                {subComent.map((sub, index) => {
                  if (item.id == sub.id_comment) {
                    return (
                      <>
                        <article
                          key={index}
                          className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
                        >
                         
                          <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img
                                  className="mr-2 w-6 h-6 rounded-full"
                                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                  alt="Jese Leos"
                                />
                                Jese Leos
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <time title="February 12th, 2022">
                                  {new Date(
                                    sub.creationDate
                                  ).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </time>
                              </p>
                            </div>
                          </footer>
                          <p className="text-gray-500 dark:text-gray-400">
                            {sub.comment}
                          </p>
                        </article>
                      </>
                    );
                  }
                })}

                {/* ---------------------- */}
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    onClick={() => {
                      let com = document.querySelector("#new_comment_" + index);
                      com!.classList.toggle("hidden");
                      setNewCommId(index);
                      setIdComment(item.id);
                    }}
                    type="button"
                    className="flex items-center text-sm font-bold text-gray-500 hover:underline dark:text-gray-400"
                  >
                    <svg
                      aria-hidden="true"
                      className="mr-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                    Reply
                  </button>
                  <div className="hidden" id={"new_comment_" + index}>
                    <form
                      onSubmit={handleSubmit(subComment)}
                      className="flex gap-6"
                    >
                      <input
                        className="border rounded-md"
                        type="text"
                        {...register(`newcomment${index}`)}
                      />
                      <button
                        className="font-bold text-green-800 underline"
                        type="submit"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------- */}
    </div>
  );
}
