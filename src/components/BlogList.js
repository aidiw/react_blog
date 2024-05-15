import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { bool } from 'prop-types';
import Pagination from './Pagination';


const BlogList = ({ isAdmin }) => {
    const history = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setNumberOfPoasts] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const limit = 5;

    useEffect(()=> {
        setNumberOfPages(Math.ceil(numberOfPosts/limit));
    }, [numberOfPosts]);

  


    const onClickPageButton = (page) => {
        history(`${location.pathname}?page=${page}`)
    }
    const getPosts = useCallback((page = 1) => {
        setCurrentPage(page);
        let params = {
            _page: page, 
            _limit: limit,
            _sort: 'id',
            _order: 'desc'
        };

        if (!isAdmin) {
            params = { ...params, publish: true };
        }

        axios.get(`http://localhost:3009/posts`, { params })
            .then((res) => {
                setNumberOfPoasts(res.headers['x-total-count']);
                setPosts(res.data);
                setLoading(false);
            });
    }, [isAdmin]);

    useEffect(()=> {
        setCurrentPage(parseInt(pageParam) || 1);
        getPosts(parseInt(pageParam) || 1);
    }, [pageParam, getPosts]);

    const deleteBlog = (e, id) => {
        e.stopPropagation();
        axios.delete(`http://localhost:3009/posts/${id}`).then(() => {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (posts.length === 0) {
        return <div>No blog posts found</div>;
    }

    const renderBlogList = () => {
        return posts.map((post) => (
            <Card
                key={post.id}
                title={post.title}
                onClick={() => history(`/blogs/${post.id}`)}
            >
                {isAdmin ? (
                    <div>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={(e) => deleteBlog(e, post.id)}
                        >
                            Delete
                        </button>
                    </div>
                ) : null}
            </Card>
        ));
    };

    return (
        <div>
            {renderBlogList()}
            {numberOfPages > 1 && <Pagination 
                currentPage={currentPage} 
                numberOfPages={numberOfPages}
                onClick={onClickPageButton}
                limit = {limit}
            />}
        </div>
    );
};

BlogList.propTypes = {
    isAdmin: bool
};

export default BlogList;
