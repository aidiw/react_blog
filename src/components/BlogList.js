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
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [searchText, setSearchText] = useState('');
    const limit = 5;

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit));
    }, [numberOfPosts]);

    const onClickPageButton = (page) => {
        history(`${location.pathname}?page=${page}`);
        setCurrentPage(page);
        getPosts(page);
    }

    const getPosts = useCallback((page = 1) => {
        setCurrentPage(page);
        let params = {
            _page: page,
            _limit: limit,
            _sort: 'id',
            _order: 'desc',
            title_like: searchText
        };

        if (!isAdmin) {
            params = { ...params, publish: true };
        }

        axios.get(`http://localhost:3009/posts`, { params })
            .then((res) => {
                setNumberOfPosts(parseInt(res.headers['x-total-count'], 10));
                setPosts(res.data);
                setLoading(false);
            });
    }, [isAdmin, searchText]);

   

    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1);   
        getPosts(parseInt(pageParam) || 1);

    }, []);

    const deleteBlog = (e, id) => {
        e.stopPropagation();
        axios.delete(`http://localhost:3009/posts/${id}`).then(() => {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        });
    };

    if (loading) {
        return <LoadingSpinner />;
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

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            history(`${location.pathname}?page=1`)
            setCurrentPage(1);
            getPosts(1);
        }
    }

    return (
        <div>
            <input 
                type="text"
                placeholder=''
                className="form-control"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={onSearch}
            />
            <hr />
            {posts.length === 0 
                ? <div>No blog posts found</div>
                : <>{renderBlogList()}
                {numberOfPages > 1 && <Pagination
                    currentPage={currentPage}
                    numberOfPages={numberOfPages}
                    onClick={onClickPageButton}
                    limit={limit}
                />}
            
            </>}
            
        </div>
    );
};

BlogList.propTypes = {
    isAdmin: bool
};

export default BlogList;
