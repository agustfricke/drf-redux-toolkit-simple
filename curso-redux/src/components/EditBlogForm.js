import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, selectBlogById, updateBlog } from "../features/blogsSlice";
import { useParams, useNavigate } from "react-router-dom";
import Error from "./Error";

const EditBlogForm = () => {

    const { blogId } = useParams();

    const navigate = useNavigate();

    const blog = useSelector((state) => selectBlogById(state, Number(blogId)));

    const [body, setBody] = useState(blog?.body);
    const [requestStatus, setRequestStatus] = useState('idle');

    const dispatch = useDispatch();

    if (!blog) {
        return (
            <Error>{'No blogs!'}</Error>
        )
    }

    const handleSave = () => {
        if (Boolean(body) && requestStatus === 'idle') {
            try {
                setRequestStatus('pending')
                dispatch(updateBlog({ id: blog.id, body }))

                    setBody('');
                    navigate('/')
            } catch (err) {
                <Error>{ err }</Error>
            } finally {
                setRequestStatus('idle')
            }
        }
    }
    const refresh = () => window.location.reload(true)

    const deleteHandler = () => {
        try {
            setRequestStatus('pending')
            dispatch(deleteBlog({ id: blog.id })).unwrap()

            setBody('')
            navigate('/')
            refresh()
        } catch (err) {
            console.log('Faild to delete blog', err)
        } finally {
            setRequestStatus('idle')
        }
    }
    return (
        <div className="flex justify-center">
            <form className="mt-3">
                <input
                className="rounded-lg p-2 m-2"
                type='text'
                placeholder="Title"
                value={body}
                onChange={(e) => setBody(e.target.value)}/>
                <div className="flex justify-center">
                <button 
                onClick={handleSave}
                className="bg-teal-800 text-white p-2 rounded-lg m-2"
                type="button">SAVE</button>
                <button 
                onClick={deleteHandler}
                className="bg-red-700 text-white p-2 rounded-lg m-2"
                type="button">DELETE</button>
                </div>
            </form>
        </div>
    )
};

export default EditBlogForm;

