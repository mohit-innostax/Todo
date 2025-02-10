import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import { FaPen } from "react-icons/fa";

function App() {
  const [status, setStatus] = useState("today");
  const [name,setName]=useState('');
  const [cstatus,setCstatus]=useState('');
  const [priority,setPriority]=useState('');
  const arr1 = [
    {
      id: 1,
      task: "Go To market",
      status: "Pending",
      When: "Today",
    },
    {
      id: 2,
      task: "Go to gym",
      status: "Pending",
      When: "Today",
    },
    {
      id: 3,
      task: "Go to buy mobile",
      status: "Pending",
      When: "Any Day",
    },
    {
      id: 4,
      task: "Go to barber Shop",
      status: "Pending",
      When: "Any Day",
    },
    {
      id: 5,
      task: "Do LeetCode",
      status: "Pending",
      When: "Today",
    },
    {
      id: 6,
      task: "Complete project",
      status: "Pending",
      When: "Today",
    },
    {
      id: 7,
      task: "Visit Friend's home",
      status: "Pending",
      When: "Today",
    },
  ];
  const [arr,setArr]=useState(arr1);
  return (
    <>
      <div className="flex bg-black text-white h-10 mt-4 justify-center items-center p-10 text-4xl">
        {" "}
        TODO App
      </div>
      <span className="flex justify-center align-center mt-12 gap-2">
        <button
          className="bg-gray-100 p-4 rounded-md hover:bg-green-200 ease-in-out 2s"
          onClick={() => {
            setStatus("today");
          }}
        >
          Today
        </button>
        <button
          className="bg-gray-100 p-4 rounded-md hover:bg-green-200 ease-in-out 2s"
          onClick={() => {
            setStatus("any day");
          }}
        >
          Any day
        </button>
      </span>
      <div className="bg-gray-200 mt-5 px-3 gap-11 p-5"><h1 className="font-bold text-lg h-full w-full relative mb-10">Tasks</h1>
      <div className="flex gap-3 mb-3">
      <input className="border-2 p-2"
        value={name}
        placeholder="Enter Task Name"
        onChange={e => setName(e.target.value)}
      />
      <input className="border-2 p-2"
      placeholder="Enter Current Status"
        value={cstatus}
        onChange={e => setCstatus(e.target.value)}
      />
      <input
      className="border-2 p-2"
      placeholder="Enter the prioity"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      />
      <button className="border-2 p-3" onClick={() => {
        console.log("hii");
        setArr([...arr,{
          id: 3,
          task: name,
          status:cstatus,
          When:priority
        }]);
      }}>Add</button>
      </div>
        <div className="grid gap-5">
        {
          arr.filter((item)=>{
            return item.When.toLowerCase()===status
          })
          .map((item)=>(
            <div className="flex justify-evenly items-start border-2 border-indigo-600 px-3 py-3">
            <h2 key={item.id}>{item.task}</h2> 
            <span>{item.status}</span>
            <FaPen />
            </div>
          ))
        }
        </div>
        </div>
    </>
  );
}

export default App;
