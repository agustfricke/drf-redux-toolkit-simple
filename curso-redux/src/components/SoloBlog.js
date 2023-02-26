import { useSelector } from "react-redux";
import { selectBlogById } from "../features/blogsSlice";
import { useParams } from "react-router-dom";
import Error from "./Error";


const SoloBlog = () => {

    const { blogId } = useParams();

    const blog = useSelector((state) => selectBlogById(state, Number(blogId)));

    if (!blog) {
        return (
            <Error>{'No blogs!'}</Error>
        )
    }
    return (
        <div className="flex justify-center">
        <div>
        <div className='bg-gray-300 m-4 p-3 rounded-lg'>
               <p className="text-center">{blog.body}</p>
        </div>
        </div>
    </div>
    );
};
export default SoloBlog;
