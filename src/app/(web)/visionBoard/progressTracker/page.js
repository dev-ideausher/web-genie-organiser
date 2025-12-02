"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash, Edit3, Check } from "lucide-react";
import {
  CreateVisionboard,
  UpdateVisionboard,
  getVisionBoardApi,
} from "../../../../services/APIs/VisionBoard";
import { toast } from "react-toastify";

export default function VisionBoard() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]); 
  const [existingImageUrls, setExistingImageUrls] = useState([]); 
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);

// Fetch Existing Vision Board
const fetchVisionBoard = async () => {
    try {
      setLoading(true);
  
      const res = await getVisionBoardApi();
  
      if (res?.status && res?.data) {
        // images
        const urls = res.data.images.map((img) => img.url);
        setExistingImageUrls(urls);
  
      
        setGoals(res.data.goals); // [{ title, status }]
      }
    } catch (error) {
      console.log("Error fetching vision board:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchVisionBoard();
  }, []);


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (existingImageUrls.length + images.length + files.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    setImages([...images, ...files]);
  };


  const deleteImage = (index, isOld) => {
    if (isOld) {
      setExistingImageUrls(existingImageUrls.filter((_, i) => i !== index));
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
  
    setGoals([...goals, { title: newGoal, status: "pending" }]);
    setNewGoal("");
  };
  
  const deleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };
  

  const saveEditedGoal = (index) => {
    const updated = [...goals];
    updated[index].title = editingText;
  
    setGoals(updated);
    setEditingIndex(null);
  };
  

  const handleUpdateVisionBoard = async () => {
    const formData = new FormData();
  
    const cleanedGoals = goals.map(({ title, status }) => ({
        title,
        status,
      }));
    
      formData.append("goals", JSON.stringify(cleanedGoals));
  

    images.forEach((file) => {
      formData.append("images", file); // binary
    });
  
    try {
      const res = await UpdateVisionboard(formData);
  
      if (res.status) {
        toast.success("Vision board updated successfully!");
        router.push("/visionBoard");
      }
    } catch (error) {
      console.log("Error submitting VB:", error);
    }
  };
  
  const toggleGoalStatus = (index) => {
    const updated = [...goals];
    updated[index].status = updated[index].status === "completed" ? "pending" : "completed";
  
    setGoals(updated);
  };
  

  return (
    <div className="p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.push("/visionBoard")}
        className="flex items-center gap-2 text-gray-700 mb-6"
      >
        ← Vision Board
      </button>

      {/* Loader */}
      {loading ? (
        <div className="w-full flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6C63FF] border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Upload Box */}
          <div
            className="border border-dashed rounded-2xl p-4 flex flex-col gap-3 items-center text-gray-500 mb-6 w-4/5 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <p className="text-lg">Upload up to 10 pics</p>

            {/* Image previews (old + new) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">

              {/* EXISTING IMAGES */}
              {existingImageUrls.map((url, index) => (
                <div key={`old-${index}`} className="relative group">
                  <img
                    src={url}
                    className="w-full h-28 object-cover rounded-xl shadow"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteImage(index, true);
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow text-red-500 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}

              {/* NEWLY UPLOADED IMAGES */}
              {images.map((img, index) => (
                <div key={`new-${index}`} className="relative group">
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-28 object-cover rounded-xl shadow"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteImage(index, false);
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow text-red-500 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Goals */}
          <div className="bg-white shadow-md rounded-2xl p-6 w-4/5">
            <h2 className="font-semibold text-lg">Your Goals</h2>
            <p className="text-sm text-gray-500 mb-4">
              Create, edit, or remove your goals anytime.
            </p>

            <div className="space-y-3">
  {goals.map((goal, index) => (
    <div
      key={index}
      className="flex items-center justify-between border-b pb-2"
    >
      <div className="flex items-center gap-2 flex-1">
        
        {/* Checkbox updates status */}
        <input
          type="checkbox"
          checked={goal.status === "completed"}
          onChange={() => toggleGoalStatus(index)}
          className="w-4 h-4"
        />

        {editingIndex === index ? (
          <input
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="flex-1 border px-2 py-1 rounded"
          />
        ) : (
          <span className={`${goal.status === "completed" ? "line-through text-gray-400" : ""}`}>
            {goal.title}
          </span>
        )}
      </div>

      {editingIndex === index ? (
        <button onClick={() => saveEditedGoal(index)} className="text-green-500">
          <Check size={18} />
        </button>
      ) : (
        <button
          onClick={() => {
            setEditingIndex(index);
            setEditingText(goal.title);
          }}
          className="text-gray-400"
        >
          <Edit3 size={18} />
        </button>
      )}

      <button onClick={() => deleteGoal(index)} className="text-red-400">
        <Trash size={18} />
      </button>
    </div>
  ))}

  {/* Add new goal */}
  <div className="flex items-center justify-between border-b pb-2">
    <input
      value={newGoal}
      onChange={(e) => setNewGoal(e.target.value)}
      placeholder="Type your goal"
      className="outline-none flex-1"
    />
    <button onClick={addGoal} className="text-gray-400">
      <Plus />
    </button>
  </div>
</div>


            {/* Save Button */}
            <div className="text-right mt-6">
              <button
                onClick={handleUpdateVisionBoard}
                className="px-6 py-2 bg-[#6C63FF] text-white rounded-xl shadow-md"
              >
                Save Vision Board
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
