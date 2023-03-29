import { useState } from "react";
import { selectPostById } from "../features/postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdatePostMutation } from "../features/postsSlice";
import { useSelector } from "react-redux";
import { AiFillPlusSquare } from "react-icons/ai";
import toast from 'react-hot-toast';

const EditPost = () => {

    const { postId } = useParams()

    const navigate = useNavigate()

    const [updatePost, {isLoading}] = useUpdatePostMutation();

    const success= () => toast.success('Post updated!');
    const error= (err) => toast.error(err);

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    const [body, setBody] = useState(post?.body)
    
    const canSave = Boolean(body) && !isLoading

    const onSavePost = async () => {
        if (canSave) {
            try {
                await updatePost({ id: post.id, body }).unwrap()
                setBody('')
                navigate('/')
                success()
            } catch (err) {
                error(err.error)
            }
        }
    }

    
    if (!post) {
        return (
        <div>
            <p className="font-mono text-rojo">No post here!</p>
        </div>
        )
    }

    return (

        <form className='flex justify-center'>
            <input value={body} className='rounded-lg p-1.5 m-5 outline-none' onChange={(e) => setBody(e.target.value)} placeholder="Update Post"/>
            <button type='button' className='text-white' onClick={onSavePost}><AiFillPlusSquare size={30}/></button>
        </form>
    )
}
export default EditPost;
