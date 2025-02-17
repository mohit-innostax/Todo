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
  const [newPriority, setNewPriority] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    cstatus: "",
    ppriority: "",
  });

  const [searchData, setSearchData] = useState({
    searchName: "",
    searchStatus: "",
    searchPriority: "",
  });

  const [error, setError] = useState(true);

  const [arr, setArr] = useState(() => {
    const temp = localStorage.getItem("tasks");
    return temp ? JSON.parse(temp) : [];
  });

  const changeStatus = (id) => {
    setEditId(id);
    const temp = arr.find((task) => task.id === id);
    setNewStatus(temp.status);
    setNewTaskName(temp.task);
    setNewPriority(temp.When);
  };

  const saveStatus = (id) => {
    setArr(
      arr.map((tasks) =>
        tasks.id === id
          ? {
              ...tasks,
              task: newTaskName,
              status: newStatus,
              When: newPriority,
            }
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
  };
  localStorage.setItem("tasks", JSON.stringify(arr));
  const isTaskComplete =
    formData.name && formData.cstatus && formData.ppriority;

  const handleChange = (e) => {
    e.target.value === "all" ? setAll(true) : setAll(false);
    // console.log(e.target.value);
    setStatus(e.target.value);
  };

  const sortedArr = [...arr].sort((a, b) => {
    const orderToFollow = { High: 1, Medium: 2, Low: 3 };
    return orderToFollow[a.When] - orderToFollow[b.When];
  });
  localStorage.setItem("tasks", JSON.stringify(arr));

  return (
    <>
      <div className="flex bg-black text-white h-16 mt-4 justify-center items-center top-0 sticky text-4xl">
        TODO App
      </div>
      <div className="flex justify-center items-center px-3 py-6">
        <span className="text-3xl px-5 py-5  ">
          Search Tasks based on your choice
        </span>
      </div>
      <div className="flex gap-4 mb-4 ">
        <input
          className="border-2 p-2 rounded w-1/3  "
          value={searchData.searchName}
          placeholder="Enter Task Name"
          onChange={(e) =>
            setSearchData({ ...searchData, searchName: e.target.value })
          }
        />
        <select
          value={searchData.searchStatus}
          onChange={(e) => {
            setAll(false);
            setSearchData({ ...searchData, searchStatus: e.target.value });
          }}
          className=" border-2 p-2 rounded w-1/4"
        >
          <option value="" disabled selected>
            Select Status
          </option>
          <option value="ready for deployment">Ready for Deployment</option>
          <option value="in progress">In Progress</option>
          <option value="development review">Development Review</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={searchData.searchPriority}
          onChange={(e) => {
            setAll(false);
            setSearchData({ ...searchData, searchPriority: e.target.value });
          }}
          className="border-2 p-2 rounded-md"
        >
          <option value="" disabled selected>
            Select Priority
          </option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
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
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            disabled={!isTaskComplete}
            className={` bg-green-500 text-white px-4 py-2 rounded-md ${
              !isTaskComplete ? "cursor-not-allowed" : "cursor-pointer"
            }`}
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
            {sortedArr
              .filter((item) => {
                return (
                  all ||
                  item.task.toLowerCase() === searchData.searchName ||
                  item.status.toLowerCase() === searchData.searchStatus ||
                  item.When.toLowerCase() ===
                    searchData.searchPriority.toLowerCase()
                );
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
                      <td className="border p-2">
                        <select
                          value={newPriority}
                          onChange={(e) => setNewPriority(e.target.value)}
                          className=" border p-1 rounded-md w-full "
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </td>
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
                      <td
                        className={`border p-2 ${
                          item.When === "High" && "bg-red-500"
                        } ${item.When === "Medium" && "bg-yellow-500"} ${
                          item.When === "Low" && "bg-green-500"
                        }`}
                      >
                        {item.When}
                      </td>
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
        {arr.length === 0 && (
          <div className="text-2xl text-red-600 p-4">
            Your task list is empty, Please add some new tasks!!
          </div>
        )}
      </div>
    </>
  );
}
export default App;
