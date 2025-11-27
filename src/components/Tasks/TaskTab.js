export default function TasksTab() {
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
  
        <h2 className="text-2xl font-semibold">Today's tasks</h2>
        <p className="text-gray-500 mb-4">
          Stay on Track with Individual Tasks
        </p>
  
        {/* Task Cards */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((task) => (
            <div
              key={task}
              className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">Task title</p>
                <p className="text-sm text-gray-500">
                  Today • Everyday • 02:30 PM
                </p>
              </div>
              <span className="text-gray-400 text-xl">...</span>
            </div>
          ))}
        </div>
  

        <button className="fixed bottom-6 right-6 w-12 h-12 bg-indigo-500 text-white rounded-full shadow flex items-center justify-center text-2xl">
          +
        </button>
      </div>
    );
  }
  