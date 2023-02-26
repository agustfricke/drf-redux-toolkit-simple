import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewBlog } from "../features/blogsSlice";
import { useNavigate } from "react-router-dom";
import Error from "./Error";

const AddBlog = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [body, setBody] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const refresh = () => window.location.reload(true)

    const handleSave = () => {
        if(Boolean(body) && addRequestStatus === 'idle') {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewBlog({body}))
                setBody('')
                navigate('/')
                refresh()
            } catch (err) {
                <Error>{ err }</Error>
            } finally {
                setAddRequestStatus('idle')
            }
        } else {
            alert('Algo fue mal')
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
                <button 
                onClick={handleSave}
                className="bg-white text-black p-2 rounded-lg"
                type="button">Create</button>
            </form>
        </div>
    )
}

export default AddBlog;
