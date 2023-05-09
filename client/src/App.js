import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddNews from "./pages/AddNews";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/add" element={<AddNews />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
