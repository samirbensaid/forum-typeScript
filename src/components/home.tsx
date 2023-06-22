// import {
//   BottomNavigation,
//   BottomNavigationAction,
//   IconButton,
//   InputBase,
//   Paper,
// } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import { Link } from "react-router-dom";
// import NewspaperIcon from "@mui/icons-material/Newspaper";
// import BatteryUnknownIcon from "@mui/icons-material/BatteryUnknown";
// import ImportContactsIcon from "@mui/icons-material/ImportContacts";
// import PublicIcon from "@mui/icons-material/Public";
// export default function Home() {
//   const [data, setData] = useState([]);
//   const [filtredData, setFiltredData] = useState([]);
//   const [filtrecategory, setFiltreCategory] = useState([]);

//   const [category, setCategory] = useState([]);

//   const [value, setValue] = useState(0);

//   const fetchData = async () => {
//     const response = await axios.get("http://localhost:3000/articles");
//     setData(response.data);
//     setFiltredData(response.data);
//     setFiltreCategory(response.data);
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchCategory = async () => {
//     const response = await axios.get("http://localhost:3000/category");
//     setCategory(response.data);
//   };
//   useEffect(() => {
//     fetchCategory();
//   }, []);

//   const search = (event) => {
//     let word = event.target.value;
//     let test = data.filter((item) =>
//       item.title.toLowerCase().includes(word.toLowerCase())
//     );
//     // console.log(test);
//     setFiltredData(test);
//   };

//   const searchCategory = (idCategory) => {
//     let test2 = filtrecategory.filter(
//       (article) => article.id_category == idCategory
//     );
//     setFiltredData(test2);
//   };

//   return (
//     <div>
//       <Paper
//         component="form"
//         sx={{
//           p: "2px 4px",
//           display: "flex",
//           alignItems: "center",
//           width: "30%",
//           m: "auto",
//           my: "2%",
//         }}
//       >
//         <InputBase
//           sx={{ ml: 1, flex: 1 }}
//           placeholder="Search Article..."
//           inputProps={{ "aria-label": "Search products" }}
//           onChange={(e) => {
//             search(e);
//           }}
//         />
//         <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
//           <SearchIcon />
//         </IconButton>
//       </Paper>

//       <BottomNavigation
//         className="font-bold"
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       >
//         <BottomNavigationAction
//           onClick={() => {
//             fetchData();
//           }}
//           label="All"
//           icon={<PublicIcon sx={{ fontSize: "50px" }} />}
//         />
//         {category.map((categ, i) => {
//           return (
//             <BottomNavigationAction
//               onClick={() => {
//                 searchCategory(categ.id);
//               }}
//               key={i}
//               label={categ.name}
//               icon={
//                 categ.id == 1 ? (
//                   <BatteryUnknownIcon sx={{ fontSize: "50px" }} />
//                 ) : categ.id == 2 ? (
//                   <NewspaperIcon sx={{ fontSize: "50px" }} />
//                 ) : (
//                   <ImportContactsIcon sx={{ fontSize: "50px" }} />
//                 )
//               }
//             />
//           );
//         })}
//       </BottomNavigation>

//       <div className="w-[90%] mx-auto z-0">
//         {filtredData.map((article, index) => {
//           return (
//             <div
//               key={index}
//               className="grid gap-4 m-10 w-[90%] mx-auto p-6 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
//             >
//               <span className=" mx-auto mb-2 text-gray-500 dark:text-gray-400">
//                 {article.id_category == 1 ? (
//                   <BatteryUnknownIcon />
//                 ) : article.id_category == 2 ? (
//                   <NewspaperIcon />
//                 ) : (
//                   <ImportContactsIcon />
//                 )}
//               </span>
//               <a href="#">
//                 <h5 className="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
//                   {article.title}
//                 </h5>
//               </a>
//               <p className="mb-3 font-normal text-center text-gray-500 dark:text-gray-400">
//                 {article.description}
//               </p>
//               <Link
//                 to={"detail/" + article.id}
//                 className="inline-flex  items-center text-blue-600 hover:underline hover:font-bold"
//               >
//                 Read more ...
//                 <svg
//                   className="w-5 h-5 ml-2"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
//                   <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
//                 </svg>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, ChangeEvent } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BatteryUnknownIcon from "@mui/icons-material/BatteryUnknown";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PublicIcon from "@mui/icons-material/Public";

interface Article {
  id: number;
  title: string;
  description: string;
  id_category: number;
}

interface Category {
  id: number;
  name: string;
}

export default function Home() {
  const [data, setData] = useState<Article[]>([]);
  const [filtredData, setFiltredData] = useState<Article[]>([]);
  const [filtrecategory, setFiltreCategory] = useState<Article[]>([]);

  const [category, setCategory] = useState<Category[]>([]);

  const [value, setValue] = useState<number>(0);

  const fetchData = async () => {
    const response = await axios.get<Article[]>(
      "http://localhost:3000/articles"
    );
    setData(response.data);
    setFiltredData(response.data);
    setFiltreCategory(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchCategory = async () => {
    const response = await axios.get<Category[]>(
      "http://localhost:3000/category"
    );
    setCategory(response.data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    let word = event.target.value;
    let test = data.filter((item) =>
      item.title.toLowerCase().includes(word.toLowerCase())
    );
    setFiltredData(test);
  };

  const searchCategory = (idCategory: number) => {
   
    let test2 = filtrecategory.filter(
      (article) => article.id_category == idCategory
     );
      

    setFiltredData(test2);
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "30%",
          m: "auto",
          my: "2%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Article..."
          inputProps={{ "aria-label": "Search products" }}
          onChange={search}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <BottomNavigation
        className="font-bold dark:bg-[#111827]"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={fetchData}
          className="dark:text-white"
          label="All"
          icon={<PublicIcon sx={{ fontSize: "50px"}} />}
        />
        {category.map((categ, i) => {
          return (
            <BottomNavigationAction
            className="dark:text-white"
              onClick={() => {
                searchCategory(categ.id);
              }}
              key={i}
              label={categ.name}
              icon={
                categ.id === 1 ? (
                  <BatteryUnknownIcon sx={{ fontSize: "50px" }} />
                ) : categ.id === 2 ? (
                  <NewspaperIcon sx={{ fontSize: "50px" }} />
                ) : (
                  <ImportContactsIcon sx={{ fontSize: "50px" }} />
                )
              }
            />
          );
        })}
      </BottomNavigation>

      <div className="w-[90%] mx-auto z-0">
        {filtredData.map((article, index) => {
          return (
            <div
              key={index}
              className="grid gap-4 m-10 w-[90%] mx-auto p-6 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <span className=" mx-auto mb-2 text-gray-500 dark:text-gray-400">
                {article.id_category === 1 ? (
                  <BatteryUnknownIcon sx={{ fontSize: "50px" }} />
                ) : article.id_category === 2 ? (
                  <NewspaperIcon sx={{ fontSize: "50px" }} />
                ) : (
                  <ImportContactsIcon sx={{ fontSize: "50px" }} />
                )}
              </span>
              <a href="#">
                <h5 className="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {article.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-center text-gray-500 dark:text-gray-400">
                {article.description}
              </p>
              <Link
                to={"detail/" + article.id}
                className="inline-flex  items-center text-blue-600 hover:underline hover:font-bold"
              >
                Read more ...
                <svg
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
