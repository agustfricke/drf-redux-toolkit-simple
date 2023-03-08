import { useSelector } from "react-redux";
import { selectPostIds } from "../features/postsSlice";
import { useGetPostsQuery } from "../features/postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import  AddNewPost from "./AddNewPost";
import Loader from "./Loader";
import toast from 'react-hot-toast';

const PostList = () => {

    // Ponemos los diferentes estados que podemos recibir de useGetPostsQuery
    const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
    
    const orderedPostIds = useSelector(selectPostIds);

    const err = (err) => toast.error(err);

    let content;
    if (isLoading) {
        content = <Loader/>
    } else if (isSuccess) {
        content = orderedPostIds.map(postId =>         
            <PostsExcerpt key={postId} postId={postId}/>
        )
    } else if (isError) {
        err(error)
    }

    return (
        <div> 
            <AddNewPost/>
            { content }
        </div>
    )
}
export default PostList;


