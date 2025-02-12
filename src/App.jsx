import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [status, setStatus] = useState("");
  const [toggle, setToggle] = useState("");
  const [all, setAll] = useState(true);
  const [editId, setEditId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    cstatus: "",
    ppriority: "",
  });
  const [error,setError]=useState(false);
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
    return temp ? JSON.parse(temp) : [];
  });

  useEffect(() => {
    let date = new Date();
    console.log(date.getFullYear() + 1);
  }, []);

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
    localStorage.setItem("tasks", JSON.stringify(arr));
  };

  const handleDelete = (id) => {
    setArr(arr.filter((task) => task.id !== id));
    localStorage.setItem("tasks", JSON.stringify(arr));
  };

  const handleError = () => {
    const newTask = {
      id: Date.now(),
      task: formData.name,
      status: formData.cstatus,
      When: formData.ppriority,
    };

    setError(false);
    setArr([...arr, newTask]);
    setFormData({
      name: "",
      cstatus: "",
      ppriority: "",
    });
    localStorage.setItem("tasks", JSON.stringify(arr));
  };
  const isTaskComplete =
    formData.name && formData.cstatus && formData.ppriority;

  const handleChange = (e) => {
    e.target.value === "all" ? setAll(true) : setAll(false);
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  return (
    <>
      <div className="flex bg-black text-white h-16 mt-4 justify-center items-center top-0 sticky text-4xl">
        TODO App
      </div>
      <div className="flex justify-center items-center p-6">
      <select
        className="flex justify-center  mt-6 gap-4 border-5 p-3 rounded-md"
        value={status}
        onChange={handleChange}
      >
        <option value="" disabled selected>
          Select Time
        </option>
        <option value="all">All</option>
        <option
          className={`bg-gray-100 p-4 rounded-md hover:bg-green-200 ease-in-out 2s ${
            toggle === "today" ? "bg-green-500" : ""
          } `}
          value="today"
        >
          Today
        </option>
        <option
          className={`bg-gray-100 p-4 rounded-md hover:bg-green-200 ease-in-out 2s ${
            toggle === "any day" ? "bg-green-500" : ""
          } `}
          value="any day"
        >
          Any day
        </option>
      </select>
      </div>
      <div className="bg-gray-200 mt-5 mx-4 gap-11 p-5 ">
        <div className="flex gap-4 mb-4 ">
          <input
            className="border-2 p-2 rounded w-1/3  "
            value={formData.name}
            placeholder="Enter Task Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <select
            value={formData.cstatus}
            onChange={(e) =>
              setFormData({ ...formData, cstatus: e.target.value })
            }
            className=" border-2 p-2 rounded w-1/4"
          >
            <option value="" disabled selected>
              Select Status
            </option>
            <option value="Ready for Deployment">Ready for Deployment</option>
            <option value="In Progress">In Progress</option>
            <option value="Development Review">Development Review</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={formData.ppriority}
            onChange={(e) =>
              setFormData({ ...formData, ppriority: e.target.value })
            }
            className="border-2 p-2 rounded-md"
          >
            <option value="" disabled selected>
              Select Priority
            </option>
            <option value="Today">Today</option>
            <option value="Any Day">Any Day</option>
          </select>
          <button
            disabled={!isTaskComplete}
            className={` bg-green-500 text-white px-4 py-2 rounded-md ${!isTaskComplete? "cursor-not-allowed":"cursor-pointer"}`}
            onClick={() => {
              handleError();
            }}
          >
            Add
          </button>
        </div>
        <table className="w-full border-collapse">
          <tr className="bg-gray-300">
            <th className="border p-2">Task name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Action</th>
          </tr>
          <tbody>
            {arr
              .filter((item) => {
                return all || item.When.toLowerCase() === status;
              })
              .map((item) => (
                <tr key={item.id} className="text-center w-full h-full">
                  {editId === item.id ? (
                    <>
                      <td className="border p-2">
                        <input
                          className="border p-1 w-full rounded-md"
                          value={newTaskName}
                          onChange={(e) => setNewTaskName(e.target.value)}
                        />
                      </td>
                      <td className="border p-2">
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className=" border p-1 rounded-md w-full "
                        >
                          <option value="In Progress">In Progress</option>
                          <option value="Development Review">
                            Development Review
                          </option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="border p-2">{item.When}</td>
                      <td className="border p-2">
                        <button
                          className="px-3 py-1 bg-blue-300 rounded cursor-pointer"
                          onClick={() => saveStatus(item.id)}
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td key={item.id} className="border p-2">
                        {item.task}
                      </td>
                      <td className="border p-2">{item.status}</td>
                      <td className="border p-2">{item.When}</td>
                      <td className="border-3 p-3.5 flex justify-center gap-2 relative max-h-full">
                        <FaPen
                          className="text-blue-500 cursor-pointer"
                          onClick={() => {
                            changeStatus(item.id);
                          }}
                        />
                        <MdDelete
                          className="text-red-500 cursor-pointer"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        {arr.length === 0 ? <div className="text-red-600 text-xl py-5">Their is no task present currently, please add some new task</div>: <div></div> }
      </div>
    </>
  );
}
export default App;
