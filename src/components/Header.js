export function Header({ title }) {
    return (
      <div className="h-[74px] bg-white p-6 border-b-[#E1E1E1] flex items-center gap-3 text-black ">
        <button
          onClick={() => history.back()}
          className=" flex items-center gap-2"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M4.26562 12.8018H21.3323M4.26562 12.8018L8.53229 8.53516M4.26562 12.8018L8.53229 17.0685" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </button>
        <h1 className="text-[20px] font-medium">{title}</h1>
      </div>
    );
  }