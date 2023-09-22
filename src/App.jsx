import SlotMachine from "./components/SlotMachine";
import Test from "./components/Test";
import "./styles/App.css";
import "./styles/pot.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./fonts/BangkokBold.ttf";
function App() {
  return (
    <div className="w-screen h-screen ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SlotMachine />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
