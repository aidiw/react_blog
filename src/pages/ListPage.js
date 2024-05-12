import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";

const ListPage = () => {
    // posts에서 state를 관리함
    const history = useNavigate();
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        axios.get('http://localhost:3009/posts').then((res => {
            setPosts(res.data);
        }))
    }

    useEffect(() => { //state가 업데이트가 되어도 렌더링이 한번만 실행되게됨
        getPosts();
    }, []);

   
    
    return (
        <div>
            <div className="d-flex justify-content-between align-content-center">
              <h1>Blogs</h1>
              <div>
                <Link to="/blogs/create" className="btn btn-success">
                  Create New
                </Link>
              </div>
            </div>
            {posts.map(post => {
                return (
                    <Card 
                      key={post.id} 
                      title={post.title} 
                      onClick={() => history('/blogs/edit')}/>
                );
            })}
        </div>
        
    )
};

export default ListPage;
