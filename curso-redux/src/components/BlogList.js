import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllBlogs, getBlogError, getBlogsStatus, fetchBlogs} from "../features/blogsSlice";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";

const BlogList = () => {

    const dispatch = useDispatch();

    const blogs = useSelector(selectAllBlogs);
    const blogStatus = useSelector(getBlogsStatus);
    const error = useSelector(getBlogError);

    useEffect(() => {
        if (blogStatus === 'idle'){
            dispatch(fetchBlogs())
        }
    }, [blogStatus, dispatch])

    let content;

    if (blogStatus === 'loading') {
        content = <Loader/>
    } else if (blogStatus === 'succeeded') {
        content = blogs.map(blog => 
            <div key={blog.id} className='bg-gray-300 m-4 p-3 rounded-lg'>
               <p className="text-center">{blog.body}</p>
               <div className="m-3">
                <Link to={`soloBlog/${blog.id}`} className='bg-slate-900 rounded-lg p-2 text-white m-2'>SEE</Link>
                <Link to={`edit/${blog.id}`} className='bg-slate-900 rounded-lg p-2 text-white m-2'>EDIT</Link>
                </div>
            </div>)
    } else if (blogStatus === 'failed') {
        content = <Error>{error}</Error>
    }

    return (
        <div className="flex justify-center">
            <div>
                { content }
            </div>
        </div>
    )






}
export default BlogList;
