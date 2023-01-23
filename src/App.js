import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import MyBooks from "./pages/MyBooks";
import Transaction from "./pages/Transaction";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
