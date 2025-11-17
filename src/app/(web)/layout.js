// layout.js


export default function Layout({ children }) {
  return (
  <div className="flex min-h-screen bg-[#f6f7fb]">
  {/* Sidebar */}
  <aside className="w-64 bg-white shadow-xl p-6 flex flex-col gap-4">
  <h1 className="text-2xl font-semibold text-[#4a4bda]">Genie AI</h1>
  <nav className="flex flex-col gap-2 mt-4">
  {[
  "Home",
  "Tasks",
  "Calendar",
  "Journal",
  "Videos & Audios",
  "Gratitude",
  "Vision board",
  "Ask Genie",
  "Horoscope",
  "Profile",
  ].map((item) => (
  <button
  key={item}
  className="text-left px-4 py-2 rounded-lg hover:bg-[#eef0ff] transition"
  >
  {item}
  </button>
  ))}
  </nav>
  
  
  <button className="mt-auto px-4 py-2 text-white bg-red-500 rounded-lg">Logout</button>
  </aside>
  
  
  {/* Main Content */}
  <main className="flex-1 p-6 overflow-auto">{children}</main>
  </div>
  );
  }
  
  