import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Componets
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";
import SoloBlog from "./components/SoloBlog";
import EditBlogForm from "./components/EditBlogForm";
import Header from "./components/Header";

function App() {
  
  return (
    <div className="bg-black min-h-screen">
      <Header/>
      <Router>
      <Routes>
      <Route path="/" exact element={<BlogList/>} />
      <Route path="/add" element={<AddBlog/>} />
      <Route path="/soloBlog/:blogId" element={<SoloBlog/>} />
      <Route path="/edit/:blogId" element={<EditBlogForm/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
