import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  category: string;
  description: string;
}

interface item {
  id: number;
  name: string;
}

export default function NewArticle() {
  const [dataCat, setDataCat] = useState([]);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit: any = async (data: Article) => {
    console.log(data);
    let newProduct = {
      title: data.title,

      id_category: parseInt(data.category),

      description: data.description,

      id_user: 1,
    };
    // console.log(newProduct);

    try {
      await axios.post("http://localhost:3000/articles", newProduct);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/category");
    setDataCat(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="underline font-bold mb-4 dark:text-white">
        Add product :
      </h1>

      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title Article :
        </label>
        <input
          type="text"
          id="small-input"
          //name="title"
          {...register("title")}
          className="block w-full p-2 mb-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Category :
        </label>

        <select
          {...register("category")}
          className="w-[30%] p-2 mb-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {dataCat.map((item: item, i) => {
            return (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>

        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description :
        </label>
        <textarea
          id="message"
          rows={4}
          //name="description"
          {...register("description")}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>

        <div className=" mt-5 text-center hover:text-red-700">
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ fontWeight: "700", marginRight: "50px" }}
          >
            Validation
          </Button>
          <Button
            variant="contained"
            color="error"
            type="reset"
            sx={{ fontWeight: "700" }}
          >
            ANNULER
          </Button>
        </div>
      </form>
    </div>
  );
}
