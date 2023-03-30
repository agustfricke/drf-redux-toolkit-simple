import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectPostById } from "../features/postsSlice";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { useDeletePostMutation } from "../features/postsSlice";
import toast from 'react-hot-toast';


const PostsExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))

    const [deletePost] = useDeletePostMutation()

    const success= () => toast.success('Post deleted!');
    const error= (err) => toast.error(err);

    const onDeletePost = async () => {
        try {
            await deletePost({ id:post.id }).unwrap() 
            success()
        } catch (err) {
            error(err.error)
        } 
    }

    return (
        <>
            <div className="bg-azul p-4 m-4  rounded-md" >

            <header className="flex justify-between">
            <p className="m-2 text-white">{post.body}</p>
            </header>

            <div className="flex justify-center">
                <Link className="text-white m-3" to={`/post/${post.id}`}><AiFillEye size={30}/></Link>
                <Link className="text-claro m-3" to={`/post/edit/${post.id}`}><AiFillEdit size={30}/></Link>
                <button className="text-rojo mb-4 m-3"  type='button' onClick={onDeletePost}><AiFillDelete size={30}/></button>
            </div>
        </div>
        </>
    )
}

export default PostsExcerpt
