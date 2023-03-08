import { useSelector } from "react-redux";
import { selectPostById } from "../features/postsSlice";
import { useParams } from "react-router-dom";

const SoloPost = () => {

    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
        <div>
            <p className="font-mono text-rojo">No post here!</p>
        </div>
        )
    }

    return (
            <div className="bg-azul p-4 m-4  rounded-md" >

            <header className="flex justify-between">
            <p className="m-2 text-white">{post?.body}</p>
            </header>
        </div>
    )
}
export default SoloPost;
