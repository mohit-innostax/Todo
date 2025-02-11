import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [status, setStatus] = useState("today");
  const [toggle,setToggle]=useState('')
  const [all,setAll]=useState(true);
  const [editId, setEditId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    cstatus:"",
    ppriority:"",
  });
  const [error, setError] = useState(false);
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
  const [arr, setArr] = useState(() => {
    const temp = localStorage.getItem("tasks");
    return temp ? JSON.parse(temp) : arr1;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(arr));
    console.log(arr);
  }, [arr]);

  const changeStatus = (id) => {
    setEditId(id);
    const temp = arr.find((task) => task.id === id);
    setNewStatus(temp.status);
    setNewTaskName(temp.task);
  };

  const saveStatus = (id) => {
    setArr(
      arr.map((tasks) =>
        tasks.id === id
          ? { ...tasks, task: newTaskName, status: newStatus }
          : tasks
      )
    );
    setEditId(null);
  };

  const handleDelete = (id) => {
    setArr(arr.filter((task) => task.id !== id));
  };

  const handleError = () => {
    const newTask = {
      id: Date.now(),
      task: formData.name,
      status: formData.cstatus,
      When: formData.ppriority,
    };
    // if (
    //   task.length === 0 ||
    //   cstatus === "Select Status" ||
    //   ppriority === "Select Priority"
    // ) {
    //   setError(true);
    //   // return;
    // }
    setError(false);
    setArr([...arr, newTask]);
    setFormData({
      name:"",
      cstatus:"",
      ppriority:"",
    })
  };
  const isTaskComplete = formData.name && formData.cstatus && formData.ppriority;

  return (
    <>
      <div className="flex bg-black text-white h-10 mt-4 justify-center items-center p-10 text-4xl">
        TODO App
      </div>
      <span className="flex justify-center align-center mt-12 gap-2">
        <button
          className={`bg-gray-100 p-4 rounded-md hover:bg-green-200 ease-in-out 2s ${toggle==='today'? 'bg-green-500':''} `}
          onClick={() => {
            setToggle('today');
            setAll(false);
            setStatus("today");
          }}
        >
          Today
        </button>
        <button
          className={`bg-gray-100 p-4 rounded-md hover:bg-green-200 ease-in-out 2s ${toggle==='any day'? 'bg-green-500':''} `}
          onClick={() => {
            setToggle('any day');
            setAll(false);
            setStatus("any day");
          }}
        >
          Any day
        </button>
      </span>
      <div className="bg-gray-200 mt-5 px-3 gap-11 p-5 ">
        <h1 className="font-bold text-lg h-full w-full relative mb-10">
          Tasks
        </h1>
        <div className="flex gap-3 mb-3 ">
          <input
            className="border-2 p-2 rounded-md  "
            value={formData.name}
            placeholder="Enter Task Name"
            onChange={(e) => setFormData({...formData,name:e.target.value})}
          />
          <select
            value={formData.cstatus}
            onChange={(e) => setFormData({...formData,cstatus:e.target.value})}
            className=" border-2 p-2 rounded-md"
          >
            <option value="" disabled selected>Select Status</option>
            <option value="Ready for Deployment">Ready for Deployment</option>
            <option value="In Progress">In Progress</option>
            <option value="Development Review">Development Review</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={formData.ppriority}
            onChange={(e) => setFormData({...formData,ppriority:e.target.value})}
            className="border-2 p-2 rounded-md"
          >
            <option value="" disabled selected>Select Priority</option>
            <option value="Today">Today</option>
            <option value="Any Day">Any Day</option>
          </select>
          <button
            disabled={!isTaskComplete}
            className="border-2 p-3 rounded-md"
            onClick={() => {
              handleError();
            }}
          >
            Add
          </button>
          {/* {
            true?(<h1>Please Check the details you entered</h1>):(<h1></h1>)
          } */}
        </div>
        <table>
          <tr>
            <th>Task name</th>
            <th>Task Status</th>
          </tr>
        </table>
        <div className="grid gap-5">
          {arr
            .filter((item) => {
              return all || item.When.toLowerCase() === status;
            })
            .map((item) => (
              <div className="flex justify-evenly items-start border-2 border-indigo-600 px-3 py-3 rounded-md hover:bg-gray-300">
                {editId === item.id ? (
                  <>
                    <input
                      className="border p-1 rounded-md"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                    />
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className=" border p-1 rounded-md "
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Development Review">
                        Development Review
                      </option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button
                      className="ml-2 p-1 bg-blue-300 rounded "
                      onClick={() => saveStatus(item.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h2 key={item.id}>{item.task}</h2>
                    <span>{item.status}</span>
                    <span>{item.When}</span>
                  </>
                )}
                <FaPen
                  onClick={() => {
                    changeStatus(item.id);
                  }}
                />
                <MdDelete
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default App;
