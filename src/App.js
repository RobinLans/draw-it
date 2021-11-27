import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Pictionary from "./pages/Pictionary";
import Sandbox from "./pages/Sandbox";

function App() {
  return (
    <div className="font-caveat bg-drawBg w-screen h-screen ">
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sandbox" element={<Sandbox />}></Route>
          <Route path="/pictionary" element={<Pictionary />}></Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
