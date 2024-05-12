import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const ListPage = () => {
  // posts에서 state를 관리함
  const history = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPosts = () => {
    axios.get('http://localhost:3009/posts').then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    //state가 업데이트가 되어도 렌더링이 한번만 실행되게됨
    getPosts();
  }, []);

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3009/posts/${id}`).then(() => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  };

  const renderBlogList = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (posts.length === 0) {
      return <div>No blog posts found</div>;
    }
    return posts.map((post) => {
      return (
        <Card
          key={post.id}
          title={post.title}
          onClick={() => history(`/blogs/${post.id}`)}
        >
          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteBlog(e, post.id)}
            >
              Delete
            </button>
          </div>
        </Card>
      );
    });
  };

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
      {renderBlogList()}
    </div>
  );
};

export default ListPage;
