import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TextTranslator from "./components/Translator/TextTranslator";
import ImageTranslator from "./components/Translator/ImageTranslator";
import Footer from "./components/Footer";

function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="min-h-screen w-full bg-slate-200">
      <Navbar setActivePage={setActivePage} />

      {activePage === "home" && <Home setActivePage={setActivePage} />}
      {activePage === "text" && <TextTranslator />}
      {activePage === "image" && <ImageTranslator />}
      <Footer />
    </div>
  );
}

export default App;

