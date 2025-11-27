import React from 'react'

const AiTemplates = () => {
    const templates = [
        {
          title: "Default Template",
          desc: "A space to jot down your thoughts and ideas.",
          img: "/images/template.png",
        },
        {
          title: "Goal Setting",
          desc: "Set and track your goals and be proactive.",
          img:  "/images/template.png",
        },
        {
          title: "Gratitude",
          desc: "This template helps you practice gratitude.",
          img:  "/images/template.png",
        },
     
      ];
    
  return (
    <div>  <div className="space-y-4 max-w-3xl ">
    {templates.map((item) => (
      <div
        key={item.title}
        className="flex bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 cursor-pointer border border-gray-100"
      >
  
        <div className="w-20 h-24 bg-gray-200 rounded-lg overflow-hidden">
          <img src={item.img} className="object-cover w-full h-full" />
        </div>

        {/* Text */}
        <div className="ml-4 flex flex-col justify-center">
          <p className="font-semibold text-lg">{item.title}</p>
          <p className="text-gray-500 text-sm">{item.desc}</p>
        </div>
      </div>
    ))}
  </div></div>
  )
}

export default AiTemplates