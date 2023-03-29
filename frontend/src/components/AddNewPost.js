import { useState } from 'react';
import { useAddNewPostMutation } from '../features/postsSlice';
import { useNavigate } from 'react-router-dom';
import { AiFillPlusSquare } from "react-icons/ai";
import toast from 'react-hot-toast';

const AddNewPost = () => {

    const navigate = useNavigate()

    const [addNewPost, {isLoading}] = useAddNewPostMutation();

    const [body, setBody] = useState('')

    const canSave = Boolean(body) && !isLoading;

    const success= () => toast.success('Post created!');
    const error= (err) => toast.error(err);

    const onSavePost = async () => {
        if (canSave) {
            try {
                await addNewPost({ body }).unwrap()
                setBody('')
                navigate('/')
                success()
            } catch (err) {
                error(err.error)
            }
        }
    }

    return (
        <form className='flex justify-center'>
            <input value={body} className='rounded-lg p-1.5 m-5 outline-none' onChange={(e) => setBody(e.target.value)} placeholder="Add New Post"/>
            <button type='button' className='text-white' onClick={onSavePost}><AiFillPlusSquare size={30}/></button>
        </form>
    )
}
export default AddNewPost;
