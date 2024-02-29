import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [pathname]);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    message: "",
  });
  function handle() {
    setData({ ...data, message: "" });
    console.log(data);
    if (data.name.trim().length > 3)
      navigate(`/home/${data.name}`, { replace: true });
    else setData({ ...data, message: "* Invalid" });
  }
  return (
    <>
      <div className="grid relative place-content-center w-screen bg-red-500 rounded-br-full h-screen ">
        <div className=" w-[300px] lg:w-[600px] h-[300px] pt-[8vh] bg-white px-6  rounded-3xl relative ">
          <div className=" absolute left-0  -top-12  "></div>
          <div className=" flex flex-col gap-5 ">
            <div>
              <p className=" pl-3 font-bold text-3xl">Start Chat</p>
            </div>
            <div className="text-white gap-2 flex flex-col">
              <input
                placeholder="Enter Name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                type="text"
                name="text"
                className="px-2 capitalize text-red-800 font-bold h-12 rounded-md m-2 bg-gray-200 "
              />
            </div>
            <div className=" flex items-center justify-center pl-3 gap-10">
              <button
                onClick={handle}
                className="text-white  bg-blue-500  grid place-content-center rounded-xl    p-3 "
              >
                {/* <span className="  font-semibold">Login</span> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="white" d="M6 14h8v-2H6zm0-3h12V9H6zm0-3h12V6H6zM2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z"/></svg>
              </button>
              <span className="text-lg  text-red-600">{data.message}</span>
            </div>
            
          </div>
        </div>
        <div className="absolute right-5 bottom-5 sm:right-10 sm:bottom-10 font-bold">
          <h1 className=" text-3xl sm:text-4xl underline underline-offset-4 ">
            Chat App
          </h1>
        </div>
      </div>
    </>
  );
}

export default Login;
