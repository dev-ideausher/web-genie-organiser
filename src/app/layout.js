import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Urbanist } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Genie Organizer AI",
  description: "Organize your life — journal, tasks, calendar and more!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.className} bg-[#ffffff] text-[#171717] min-h-screen`}
      >
                <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
