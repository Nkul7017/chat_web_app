import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socketIO from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";
import Message from "../Components/Message";
const ENDPOINT = "https://chat-backend-pwt1.onrender.com";
const socket = socketIO(ENDPOINT);

function Home() {
  const { name } = useParams();
  const [data1, setData1] = useState({
    message: "",
    id: "",
  });
  const [msg, setMsg] = useState([]);
  function send() {
    if (data1.message.trim().length > 0) {
      socket.emit("Message", { message: data1.message });
      setData1({ ...data1, message: "" });
    }
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      setData1({ ...data1, id: socket.id });
    });

    socket.emit("joined", { name });

    socket.on("Welcome", (data) => {
      setMsg((prev) => [...prev, data]);
      console.log(data?.message);
    });

    socket.on("Leave", (data) => {
      setMsg((prev) => [...prev, data]);
      console.log(data?.message);
    });

    socket.on("userJoined", (data) => {
      setMsg((prev) => [...prev, data]);
      console.log(data?.message);
    });
    socket.on("sendMessage", (data) => {
      setMsg((prev) => [...prev, data]);
      console.log(data?.user + " = " + data?.message);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  // useEffect(()=>{

  // },[msg])

  return (
    <>
      <div className=" grid  bg-slate-200 w-screen h-screen place-content-center ">
        <div className="  rounded-lg w-[80vw] h-[80vh] bg-red-500 ">
          <div className="h-[15%] bg-red-500 rounded-lg  flex items-center">
            <p className="text-white text-xl sm:text-3xl font-bold pl-7">
              Group Chat
            </p>
          </div>
          <ReactScrollToBottom className=" mx-8 rounded-md  h-[70%] bg-white">
            {msg.map((item) => (
              <Message
                item={item}
                pos={item?.id === data1.id ? "right" : "left"}
              />
            ))}
          </ReactScrollToBottom>
          <div className="h-[15%] space-x-2 rounded-md py-4 px-8 flex ">
            <input
              placeholder=" Type Here..."
              value={data1.message}
              onChange={(e) => setData1({ ...data1, message: e.target.value })}
              type="text"
              className=" rounded-md px-4  flex-1 h-[100%]"
            />
            <button
              onClick={send}
              className=" rounded-md  grid place-content-center bg-white    w-[80px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                viewBox="0 0 20 20"
              >
                <path
                  fill="blue"
                  d="M2.724 2.053a.5.5 0 0 0-.707.576l1.498 5.618a.5.5 0 0 0 .4.364l6.855 1.142c.279.047.279.447 0 .494l-6.854 1.142a.5.5 0 0 0-.401.364l-1.498 5.618a.5.5 0 0 0 .707.576l15-7.5a.5.5 0 0 0 0-.894z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
