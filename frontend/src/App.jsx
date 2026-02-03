import task from "./assets/task.png";
import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Todo from "./Components/Todo";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/signup" element={<Signup/>} ></Route>
        <Route path="/signin" element={<Signin/>} ></Route>
        <Route path="/todo" element={<Todo/>} ></Route>
      </Routes>
      </BrowserRouter>

      </div>
  );
};

export default App;
