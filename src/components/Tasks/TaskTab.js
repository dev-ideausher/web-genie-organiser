import { useRouter } from "next/navigation";
import Cal from "../../../public/icons/Cal";
import History from "../../../public/icons/History";
import Plus from "../../../public/icons/Plus";
import { getTodayPendingAPI ,addTask,editTask,completeTask,deleteTask,getTaskByID} from "../../services/APIs/Task";
import { useEffect, useRef, useState } from "react";
import { Cross, CrossIcon, X } from "lucide-react";
import { toast } from "react-toastify";
import Dots from "../../../public/icons/Dots";
import Edit from "../../../public/icons/Edit";
import Complete from "../../../public/icons/Complete";
import Del from "../../../public/icons/Del";

export default function TasksTab() {
  const router = useRouter();
  const dateInputRef = useRef(null);
  const [openMenuId, setOpenMenuId] = useState(null);  
  const [editModal, setEditModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("10:30");
  const [repeat, setRepeat] = useState("never");
  const todayISO = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const fetchData = async (date) => {
    try {
      const response = await getTodayPendingAPI(date);

      if (response?.status) {
        setTasks(response.data || []);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
      setTasks([]);
    }
  };
 
  
  // ADD TASK HANDLER
  const handleAddTask = async () => {
    const dueDate = `${day} ${time}:00.123`;
  
    const payload = {
      title,
      dueDate,
      repeat,
    };
  
    const res = await addTask(payload);
  
    if (res?.status) {
      setOpenModal(false);
      setTitle("")
      fetchData(selectedDate); 
      toast.success("Task created successfully!")
    }
    else{
      toast.error(res?.message||"Error creating Task")
    }
  };
  
 
  const formatDateTime = (iso) => {
    const dt = new Date(iso);
    const date = dt.toLocaleDateString("en-GB"); // DD/MM/YYYY
    const time = dt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} • ${time}`;
  };
// COMPLETE TASK
const handleCompleteTask = async (taskId) => {
  const res = await completeTask(taskId);
  if (res?.status) {
    toast.success("Task marked complete!");
    fetchData(selectedDate);
  } else {
    toast.error(res?.message || "Error completing task");
  }
};

// DELETE TASK
const handleDeleteTask = async (taskId) => {
  const res = await deleteTask(taskId);
  if (res?.status) {
    toast.success("Task deleted!");
    fetchData(selectedDate);
  } 
};

// UPDATE TASK
const handleEditTask = async () => {
  const dueDate = `${day} ${time}:00.123`;
  const payload = {

    title,
    dueDate,
    repeat,
  };

  const res = await editTask(payload,editTaskData._id);

  if (res?.status) {
    toast.success("Task updated!");
    setEditModal(false);
    setEditTaskData(null);
    fetchData(selectedDate);
  } else {
    toast.error(res?.message || "Error updating task");
  }
};
const openEditModal = async (taskId) => {
  try {
    const res = await getTaskByID(taskId);

    if (res?.status && res.data) {
      const data = res.data;

      setEditTaskData(data);

      setTitle(data.title);

      const iso = data.dueDate;
      setDay(iso.split("T")[0]);
      setTime(iso.split("T")[1].slice(0, 5));

      setRepeat(data.repeat || "never");

      setEditModal(true);
    } else {
      toast.error("Failed to load task details");
    }
  } catch (err) {
    toast.error("Error fetching task");
  }
};


  return (
    <div>
      {/* Date + History */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Hidden Date Picker */}
          <input
            type="date"
            ref={dateInputRef}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="hidden "
          />

          {/* Button that opens date picker */}
          <button
            onClick={() => dateInputRef.current.showPicker()}
            className="border border-primary px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Cal /> {selectedDate}
          </button>

          <button className="border border-primary px-4 py-2 rounded-lg flex items-center gap-2">
            <History /> History
          </button>
        </div>

        <button
  onClick={() => setOpenModal(true)}
  className="px-5 py-2 cursor-pointer bg-[#6C63FF] text-white rounded-xl shadow-md flex items-center gap-2 "
>
  <Plus /> Create Task
</button>

      </div>

      <h2 className="text-2xl font-semibold">Today's tasks</h2>
      <p className="text-gray-500 mb-4">Stay on Track with Individual Tasks</p>

      {/* Task Cards */}
      <div className="flex flex-col gap-3 w-3/5">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No pending tasks for this date.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium capitalize">{task.title}</p>
        
                <p className="text-sm text-gray-500">
                  {formatDateTime(task.dueDate)}
                </p>
              </div>
              <div className="relative">
  <span
    onClick={() => setOpenMenuId(openMenuId === task._id ? null : task._id)}
    className="text-gray-400 text-xl cursor-pointer"
  >
    <Dots />
  </span>

  {openMenuId === task._id && (
    <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl p-3 z-50">

      <p
        className="flex items-center gap-2 pb-2 cursor-pointer  hover:text-[#757DFF] rounded-lg"
        onClick={() => {
          setOpenMenuId(null);
          openEditModal(task._id);
        }}
        
      >
       <Edit/>Edit Task
      </p>

      <p
        className="flex items-center gap-2 pb-2 cursor-pointer  rounded-lg hover:text-[#757DFF]"
        onClick={() => handleCompleteTask(task._id)}
      >
        <Complete/> Complete Task 
      </p>

      <p
        className="flex items-center gap-2 pb-2 cursor-pointer hover:text-[#FF3333] rounded-lg "
        onClick={() => handleDeleteTask(task._id)}
      >
        <Del/> Delete
      </p>
    </div>
  )}
</div>

            </div>
          ))
        )}
      </div>
      {openModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white w-[420px] p-5 rounded-2xl shadow-lg">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Task</h2>
        <button onClick={() => setOpenModal(false)}><X/></button>
      </div>

      {/* TITLE */}
      <label className="text-sm font-medium">Add Task</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mt-1 mb-4 p-2 border border-[#E1E1E1] rounded-lg"
        placeholder="Enter task title"
      />

      {/* SET DAY */}
      <div className="mb-4">
        <label className="text-sm font-medium">Set Day</label>
        <input
  type="date"
  value={day}
  min={todayISO}     // prevent past date
  onChange={(e) => setDay(e.target.value)}
  className="w-full mt-1 p-2 rounded-lg bg-indigo-100"
/>

      </div>

      {/* SET TIME */}
      <div className="mb-4">
        <label className="text-sm font-medium">Set Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full mt-1 p-2 rounded-lg bg-indigo-100"
        />
      </div>

      {/* REPEAT */}
      <div className="mb-4">
        <label className="text-sm font-medium">Repeat</label>
        <select
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          className="w-full mt-1 p-2 rounded-lg bg-indigo-100"
        >
          <option value="never">Do not repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="weekdays">Weekdays</option>
        </select>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={handleAddTask}
        className="w-full bg-[#6C63FF] text-white py-3 rounded-xl mt-3"
      >
        Add Task
      </button>
    </div>
  </div>
)}
{editModal && editTaskData && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white w-[420px] p-5 rounded-2xl shadow-lg">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Task</h2>
        <button onClick={() => setEditModal(false)}><X/></button>
      </div>

      {/* TITLE */}
      <label className="text-sm font-medium">Task Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mt-1 mb-4 p-2 border border-[#E1E1E1] rounded-lg"
      />

      {/* SET DAY */}
      <label className="text-sm font-medium">Set Day</label>
      <input
        type="date"
        value={day}
        min={todayISO}
        onChange={(e) => setDay(e.target.value)}
        className="w-full mt-1 p-2 rounded-lg bg-indigo-100 mb-4"
      />

      {/* SET TIME */}
      <label className="text-sm font-medium">Set Time</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full mt-1 p-2 rounded-lg bg-indigo-100 mb-4"
      />

      {/* REPEAT */}
      <label className="text-sm font-medium">Repeat</label>
      <select
        value={repeat}
        onChange={(e) => setRepeat(e.target.value)}
        className="w-full mt-1 p-2 rounded-lg bg-indigo-100 mb-4"
      >
        <option value="never">Do not repeat</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="weekdays">Weekdays</option>
      </select>

      {/* SAVE */}
      <button
        onClick={handleEditTask}
        className="w-full bg-[#6C63FF] text-white py-3 rounded-xl mt-3"
      >
        Save Changes
      </button>
    </div>
  </div>
)}


    </div>
  );
}
