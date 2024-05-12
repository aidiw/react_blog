import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

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

    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    }

    if (loading) {
        return <LoadingSpinner/>
    }

    return (
        <div>
            <div className="d-flex">
                <h1 className="flex-grow-1">{post.title}</h1>
                <div>
                    <Link 
                        className="btn btn-primary"
                        to={`/blogs/${id}/edit`}
                    >
                            edit
                    </Link>
                </div>
            </div>
            <small className="text-muted">
             created at: {printDate(post.createdAt)}
            </small>©
            <hr/>
            <p>{post.body}</p>
        </div>
    );
}

export default ShowPage;