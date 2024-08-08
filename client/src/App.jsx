import "./App.css";
import LoginForm from "./Components/LoginForm/LoginForm";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Category from "./Components/Category/Category";
import SubCategory from "./Components/Sub-Category/SubCategory";
import Product from "./Components/Product/Product";

function Layout() {
  return(
    <>
    <Navbar/>
    <div className="app">
      <Sidebar/>
      <Outlet/>
    </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route element={<Layout/>}>
        <Route path="/dashboard" element = {<Dashboard/>} />
        <Route path="/category" element={<Category/>} />
        <Route path="/sub-category" element={<SubCategory/>} />
        <Route path="/product" element={<Product/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
