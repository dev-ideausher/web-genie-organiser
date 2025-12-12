import { ArrowRight } from "lucide-react";
import Cal from "../../../public/icons/Cal";
import History from "../../../public/icons/History";
import Plus from "../../../public/icons/Plus";
import { useRouter } from "next/navigation";
export default function ActivitiesTab() {
  const router=useRouter()
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB"); // DD/MM/YYYY
  
    return (
      <div>
        {/* Date + History */}
        <div className="flex justify-between  mb-6">

       
        <div className="flex items-center gap-3">
        <button className="border border-primary px-4 py-2 rounded-lg flex items-center gap-2">
  <Cal /> {formattedDate}
</button>

          <button className="border border-primary px-4 py-2 rounded-lg  flex items-center gap-2">
  <History/>
History</button>
        </div>
        
        <button
          onClick={() => router.push("/task/create")}
          className="px-5 py-2 cursor-pointer bg-[#6C63FF] text-white rounded-xl shadow-md flex items-center gap-2 "
        >
<Plus/>Create Activity
        </button>
        </div>
  

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((act) => (
            <div
              key={act}
              className="bg-white p-4 shadow rounded-xl flex flex-col gap-3"
            >
              <div className="w-14 h-14 mx-auto border-8 border-gray-300 border-t-indigo-500 rounded-full"></div>
  
              <p className="font-medium">{`5/7 left`}</p>
              <div className="flex justify-between items-center">
                <p>Grocery</p>
                <span className="text-xl"><ArrowRight/></span>
              </div>
            </div>
          ))}
        </div>
  

        <button className="fixed bottom-6 right-6 w-12 h-12 bg-indigo-500 text-white rounded-full shadow flex items-center justify-center text-2xl">
          +
        </button>
      </div>
    );
  }
  