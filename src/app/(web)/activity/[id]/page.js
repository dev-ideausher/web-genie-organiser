"use client";

import { ArrowLeft, X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  addTask,
  getActivityById,
} from "../../../../services/APIs/Task";
import { toast } from "react-toastify";

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const activityId = params.id;

  /* ---------------- STATES ---------------- */
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("10:30");
  const [repeat, setRepeat] = useState("never");

  /* ---------------- FETCH ACTIVITY AND TASKS ---------------- */
  const fetchActivityTasks = async (activityId) => {
    try {
      const res = await getActivityById(activityId);
      console.log(res);
      if (res?.status) {
        setActivity(res.data);
        if (res.result?.data?.pendingTasks) {
          setTasks(res?.data?.pendingTasks);
        } else {
          setTasks([]);
        }
      }
    } catch (err) {
      console.error("Error fetching activity", err);
      toast.error("Error fetching activity");
    }
  };

  useEffect(() => {
    if (activityId) {
      fetchActivityTasks(activityId);
    }
  }, [activityId]);

  /* ---------------- ADD TASK ---------------- */
  const handleAddTask = async () => {
    if (!taskTitle.trim() || !activityId) return;

    try {
      setLoading(true);
      const dueDate = `${day} ${time}:00.123`;

      const payload = {
        title: taskTitle,
        dueDate,
        repeat,
        activityId: activityId,
      };

      const res = await addTask(payload);

      if (res?.status) {
        toast.success("Task added");
        setTaskTitle("");
        setOpenModal(false);
        // Refresh tasks after successful task creation
        await fetchActivityTasks(activityId);
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
        <ArrowLeft
          className="w-5 h-5 cursor-pointer text-gray-700"
          onClick={() => router.back()}
        />
        <h1 className="text-lg font-semibold">
          {activity?.title || "Activity"}
        </h1>
      </div>

      {/* ACTIVITY DETAILS */}
      {activity && (
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{activity.title}</h2>
              {activity.totalCount !== undefined && (
                <p className="text-sm text-gray-500 mt-1">
                  {activity.totalCount - (activity.pendingCount || 0)}/{activity.totalCount} completed
                  {activity.pendingCount !== undefined && activity.pendingCount > 0 && (
                    <span className="ml-2">• {activity.pendingCount} pending</span>
                  )}
                </p>
              )}
            </div>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600"
            >
              Add Task
            </button>
          </div>

          {/* PENDING TASKS SECTION */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">
              Pending Tasks
              {activity.pendingCount !== undefined && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({activity.pendingCount})
                </span>
              )}
            </h3>

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
              <p className="ml-4 text-gray-400 text-sm">No pending tasks</p>
            )}
          </div>
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
              disabled={loading}
              className={`w-full py-3 rounded-xl ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white`}
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

