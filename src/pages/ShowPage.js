import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const ShowPage = () => {
    const {id} = useParams(); // routes의 id이기때문에 맞춰줘야함
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPost = (id) => {
        axios.get(`http://localhost:3009/posts/${id}`).then((res) => {
            setPost(res.data)
            setLoading(false)
        })
    };

    useEffect (() => {
        getPost(id)
    }, [id])

    if (loading) {
        return <LoadingSpinner/>
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}

export default ShowPage;