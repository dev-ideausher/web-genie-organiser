"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash, Edit3, Check } from "lucide-react";
import { CreateVisionboard } from "../../../../services/APIs/VisionBoard";
import { toast } from "react-toastify";

export default function CreateVisionBoard() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]); 
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");




  const deleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };


  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals([...goals, newGoal]);
    setNewGoal("");
  };


  const deleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
  
    if (images.length + files.length > 10) return;
  
    setImages([...images, ...files]);
  };
  

  const saveEditedGoal = (index) => {
    const updated = [...goals];
    updated[index] = editingText;
    setGoals(updated);
    setEditingIndex(null);
  };
  const handleCreateVisionBoard = async () => {
    const formData = new FormData();
  

    const formattedGoals = goals.map((g) => ({ title: g }));
    formData.append("goals", JSON.stringify(formattedGoals));
  

    images.forEach((imgFile) => {
      formData.append("images", imgFile); 
    });
  console.log(formData)
    try {
      const res = await CreateVisionboard(formData);
  
      if (res.status) {
      toast.success("Vision board created successfully!")
      }
  
  
  
    } catch (error) {
      console.log("Error:");
    }
  };
  

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => router.push("/visionBoard")}
        className="flex items-center gap-2 text-gray-700 mb-6"
      >
        ← Vision Board
      </button>

      {/* Upload Box */}
    {/* Upload Box */}
<div
  className="border border-dashed rounded-2xl p-4 flex flex-col gap-3 items-center justify-start text-gray-500 mb-6 w-4/5 cursor-pointer"
  onClick={() => fileInputRef.current.click()}
>
  <p className="text-lg">Upload up to 10 pics</p>

  {/* Previews inside box */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
    {images.map((img, index) => (
      <div key={index} className="relative group">
        <img
          src={URL.createObjectURL(img)}
          className="w-full h-28 object-cover rounded-xl shadow"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteImage(index);
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


      {/* Image Preview Grid */}
      {/* {images.length > 0 && (
        <div className="w-4/5 grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {images.map((img, index) => (
            <div key={index} className="relative group">
          <img src={URL.createObjectURL(img)} className="w-full h-32 object-cover rounded-xl shadow" />

              <button
                onClick={() => deleteImage(index)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow text-red-500 opacity-0 group-hover:opacity-100 transition"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      )} */}

      {/* Goals Card */}
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
              {/* Goal text / Edit field */}
              <div className="flex items-center gap-2 flex-1">
                <input type="checkbox" className="w-4 h-4" />

                {editingIndex === index ? (
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 border px-2 py-1 rounded"
                  />
                ) : (
                  <span>{goal}</span>
                )}
              </div>

              {/* Edit / Save buttons */}
              {editingIndex === index ? (
                <button
                  onClick={() => saveEditedGoal(index)}
                  className="text-green-500"
                >
                  <Check size={18} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingIndex(index);
                    setEditingText(goal);
                  }}
                  className="text-gray-400"
                >
                  <Edit3 size={18} />
                </button>
              )}

              {/* Delete goal */}
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

        {/* Create Board Button */}
        <div className="text-right mt-6">
        <button
  onClick={handleCreateVisionBoard}
  className="px-6 py-2 bg-[#6C63FF] text-white rounded-xl shadow-md"
>
  Create Vision Board
</button>

        </div>
      </div>
    </div>
  );
}
