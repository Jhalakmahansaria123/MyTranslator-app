import { Home, Type, Image } from "lucide-react";

function Navbar({ setActivePage }) {
  return (
    <nav className="w-full bg-slate-800 px-8 py-6 flex items-center justify-between shadow-md">
      <h1 className="text-lg italic font-bold text-[#fbbf24] tracking-tight">MyTranslator</h1>
      <div className="flex gap-6 text-white">

        <button onClick={() => setActivePage("home")} className="flex items-center gap-2 hover:text-slate-300 transition"><Home size={18} />Home</button>
        <button onClick={() => setActivePage("text")} className="flex items-center gap-2 hover:text-slate-300 transition"><Type size={18} /> Text</button>
        <button onClick={() => setActivePage("image")} className="flex items-center gap-2 hover:text-slate-300 transition"><Image size={18} />Image</button>
        
      </div>
    </nav>
  );
}
export default Navbar;


