import { ArrowRight } from "lucide-react";

export default function ActivitiesTab() {
    return (
      <div>
        {/* Date + History */}
        <div className="flex items-center gap-3 mb-6">
          <button className="border border-primary px-4 py-2 rounded-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M13.3333 1.66602V4.99935M6.66667 1.66602V4.99935M2.5 8.33268H17.5M4.16667 3.33268H15.8333C16.7538 3.33268 17.5 4.07887 17.5 4.99935V16.666C17.5 17.5865 16.7538 18.3327 15.8333 18.3327H4.16667C3.24619 18.3327 2.5 17.5865 2.5 16.666V4.99935C2.5 4.07887 3.24619 3.33268 4.16667 3.33268Z" stroke="#6563FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>17/09/2025
          </button>
          <button className="border border-primary px-4 py-2 rounded-lg  flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
  <circle cx="9.08333" cy="9.08333" r="8.33333" stroke="#6563FF" strokeWidth="1.5"/>
  <path d="M9.08594 5.75V9.08333L10.7526 10.75" stroke="#6563FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>History</button>
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
  