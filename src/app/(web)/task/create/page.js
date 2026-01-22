"use client";

import { ArrowLeft, X, Plus } from "lucide-react";
import { useState } from "react";
import {
  addActivity,
  addTask,
  getActivityById,
} from "../../../../services/APIs/Task";
import { toast } from "react-toastify";

export default function Page() {
  /* ---------------- STATES ---------------- */
  const [activityTitle, setActivityTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const [createdActivity, setCreatedActivity] = useState(null); // Store only the created activity
  const [tasks, setTasks] = useState([]); // Tasks for the created activity

  const [openModal, setOpenModal] = useState(false);
  const [activeActivityId, setActiveActivityId] = useState(null);

  const [taskTitle, setTaskTitle] = useState("");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("10:30");
  const [repeat, setRepeat] = useState("never");

  const MAX_LENGTH = 20;

  /* ---------------- FETCH TASKS BY ACTIVITY ---------------- */
  const fetchActivityTasks = async (activityId) => {
    try {
      const res = await getActivityById(activityId);
      console.log(res);
      if (res?.status && res.data?.pendingTasks) {
        // Replace tasks with the pendingTasks array from the API response
        setTasks(res?.data?.pendingTasks);
      } else if (res?.status) {
        // If no pendingTasks, set empty array
        setTasks([]);
      }
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };
  /* ---------------- ADD ACTIVITY ---------------- */
  const handleAddActivity = async () => {
    if (!activityTitle.trim()) return;

    try {
      setLoading(true);

      const payload = { title: activityTitle.trim() };
      const res = await addActivity(payload);

      if (res?.status) {
        toast.success("Activity created");
        setActivityTitle("");
        // Store the created activity
        setCreatedActivity(res.data);
        setActiveActivityId(res.data?._id);
        // Fetch tasks for the created activity
        if (res.data?._id) {
          await fetchActivityTasks(res.data._id);
        }
      } else {
        toast.error(res?.message || "Error creating activity");
      }
    } catch (err) {
      toast.error("Error creating activity");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ADD TASK ---------------- */
  const handleAddTask = async () => {
    if (!taskTitle.trim() || !activeActivityId) return;

    try {
      setLoading(true);
      const dueDate = `${day} ${time}:00.123`;

      const payload = {
        title: taskTitle,
        dueDate,
        repeat,
        activityId: activeActivityId,
      };

      const res = await addTask(payload);

      if (res?.status) {
        toast.success("Task added");
        setTaskTitle("");
        setOpenModal(false);
        // Fetch tasks for the activity after successful task creation
     const resp= await fetchActivityTasks(activeActivityId);
     console.log(resp)
      } else {
        toast.error(res?.message || "Error adding task");
      }
    } catch (err) {
      toast.error("Error adding task");
    } finally {
      setLoading(false);
    }
  };


  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-white px-6 py-4">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-8">
        <ArrowLeft className="w-5 h-5 cursor-pointer text-gray-700" />
        <h1 className="text-lg font-semibold">Shopping List</h1>
      </div>

      {/* CREATE ACTIVITY */}
     {/* CREATE ACTIVITY (only if not created yet) */}
{!createdActivity && (
  <div className="flex items-center gap-6 mb-10">
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="Add activity title..."
        value={activityTitle}
        maxLength={MAX_LENGTH}
        onChange={(e) => setActivityTitle(e.target.value)}
        className="w-full border-b border-gray-300 text-lg outline-none pb-2 pr-10"
      />

      {activityTitle && (
        <X
          onClick={() => setActivityTitle("")}
          className="absolute right-2 top-1 cursor-pointer text-gray-400"
          size={18}
        />
      )}

      <span className="absolute right-0 -bottom-6 text-sm text-gray-400">
        {activityTitle.length}/{MAX_LENGTH}
      </span>
    </div>

    <button
      onClick={handleAddActivity}
      disabled={!activityTitle.trim() || loading}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium
      ${
        loading
          ? "bg-gray-300"
          : "bg-indigo-600 hover:bg-indigo-700 text-white"
      }`}
    >
      <Plus size={18} />
      Add Activity
    </button>
  </div>
)}


      {/* CREATED ACTIVITY */}
      {createdActivity && (
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{createdActivity.title}</h2>
            <button
              onClick={() => {
                setActiveActivityId(createdActivity._id);
                setOpenModal(true);
              }}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600"
            >
              Add Task
            </button>
          </div>

          {/* TASKS LIST */}
          {tasks.length > 0 ? (
            <div className="ml-4 space-y-2">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    {task.dueDate && (
                      <p className="text-sm text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleString()}
                      </p>
                    )}
                    {task.repeat && task.repeat !== "never" && (
                      <p className="text-sm text-gray-500">
                        Repeat: {task.repeat}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="ml-4 text-gray-400 text-sm">No tasks yet</p>
          )}
        </div>
      )}

      {/* ADD TASK MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] p-5 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Task</h2>
              <X
                className="cursor-pointer"
                onClick={() => setOpenModal(false)}
              />
            </div>

            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Task title"
              className="w-full p-2 border rounded-lg mb-3"
            />

            <input
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full p-2 mb-3 rounded-lg bg-indigo-100"
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 mb-3 rounded-lg bg-indigo-100"
            />

            <select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="w-full p-2 mb-4 rounded-lg bg-indigo-100"
            >
              <option value="never">Do not repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>

            <button
              onClick={handleAddTask}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl"
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
