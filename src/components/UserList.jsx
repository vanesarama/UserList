import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/ClipLoader";
import Error from "./Error.jsx";
import Input from "./Input.jsx";
import Dropdown from "./Dropdown.jsx";
import Pagination from "./Pagination.jsx";

function UserList() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [npage, setNPage] = useState(0);
  const [error, setError] = useState();
  const recordPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://dummyjson.com/users");

        setData(res.data.users);
        setLoading(false);
      } catch (error) {
        setError({ message: error.message || "fetching failed " });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setRecords(data);
    }
  }, [data]);

  const filterItems = (searchTerm) => {
    const lastIndex = currentPage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const filteredItems = data.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRecords(filteredItems.slice(firstIndex, lastIndex));
  };

  useEffect(() => {
    if (data.length > 0) {
      const lastIndex = currentPage * recordPerPage;
      const firstIndex = lastIndex - recordPerPage;
      setRecords(data.slice(firstIndex, lastIndex));
      const npage = Math.ceil(data.length / recordPerPage);
      setNPage(npage);
      setNumbers([...Array(npage + 1).keys()].slice(1));
    }
  }, [data, currentPage]);

  function changeCurrentPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  if (error) {
    return <Error title="An error occured! " message={error.message} />;
  }

  const handleSelect = (selectedKey) => {
    if (selectedKey !== "none") {
      const sortedData = [...data].sort((a, b) => {
        if (a[selectedKey] < b[selectedKey]) return -1;
        if (a[selectedKey] > b[selectedKey]) return 1;
        return 0;
      });

      setData(sortedData);
      console.log("Sorted data:", sortedData);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-xl mt-8 md:text-4xl font-title font-semibold tracking-widest text-center uppercase text-black-100 ">
        Users
      </h1>
      <div className="flex gap-32 pt-8">
        <Input onChangeCallback={filterItems} />
        <Dropdown onSelectCallback={handleSelect} />
      </div>
      {loading ? (
        <div className="text-center p-16 pt-32">
          <BeatLoader color="red" />
        </div>
      ) : (
        <Fragment>
          <div className="p-8 pb-6 overflow-auto ">
            <table className="table-auto border  w-full sm:w-[62.5rem]">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="font-bold p-2 border-b text-left" />
                  <th className="font-bold p-2 border-b text-left">Name</th>
                  <th className="font-bold p-2 border-b text-left">Surname</th>
                  <th className="font-bold p-2 border-b text-left">Email</th>
                  <th className="font-bold py-2 px-4 border-b text-left">
                    Phone
                  </th>
                  <th className="font-bold py-2 px-4 border-b text-left">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody>
                {records.map((user, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-300" : ""}
                  >
                    <td className="p-2 border-b text-left">
                      <img src={user.image} />
                    </td>

                    <td className="p-2 border-b text-left">{user.firstName}</td>
                    <td className="p-2 border-b text-left">{user.lastName}</td>
                    <td className="p-2 border-b text-left">{user.email}</td>
                    <td className="py-2 px-4 border-b text-left">
                      {user.phone}
                    </td>
                    <td className="py-2 px-10 border-b text-left">
                      <Link to={`/read/${user.id}`}>
                        <svg
                          className="w-4 h-6  text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                        >
                          <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
                          <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            prePage={prePage}
            nextPage={nextPage}
            currentPage={currentPage}
            numbers={numbers}
            changeCurrentPage={changeCurrentPage}
          />
        </Fragment>
      )}
    </div>
  );
}

export default UserList;
