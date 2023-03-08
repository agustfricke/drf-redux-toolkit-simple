import PostList from "./components/PostList";
import SoloPost from "./components/SoloPost";
import EditPost from "./components/EditPost";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";

function App() {
  return (
      <Router>
      <Routes>

        <Route path="/" element={<Layout/>}>
        <Route index element={<PostList/>}/> 

        <Route path="post">
            <Route path=':postId' element={<SoloPost/>}/>
            <Route path='edit/:postId' element={<EditPost/>}/>
        </Route>
        
        </Route>

      </Routes >
      </Router>
  );
}

export default App;
