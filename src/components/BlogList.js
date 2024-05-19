import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { bool } from 'prop-types';
import Pagination from './Pagination';
import useToast from '../hooks/toasts';

// BlogList 컴포넌트 정의
const BlogList = ({ isAdmin }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page'); // 현재 페이지 파라미터를 가져옴

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [searchText, setSearchText] = useState('');
    const { addToast } = useToast();
    const limit = 5; // 한 페이지에 보여줄 게시물 수

    // 게시물 수에 따라 총 페이지 수를 계산
    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit));
    }, [numberOfPosts]);

    // 페이지 버튼 클릭 시 호출되는 함수
    const onClickPageButton = (page) => {
        navigate(`${location.pathname}?page=${page}`);
        setCurrentPage(page);
        getPosts(page);
    };

    // 게시물 목록을 가져오는 함수
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

    // 컴포넌트 마운트 시 및 페이지 파라미터 변경 시 게시물 목록을 가져옴
    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1);   
        getPosts(parseInt(pageParam) || 1);
    }, [getPosts, pageParam]);


    // 블로그 게시물 삭제 함수
    const deleteBlog = (e, id) => {
        e.stopPropagation();
        axios.delete(`http://localhost:3009/posts/${id}`).then(() => {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        });
        addToast({
            text: 'Successfully deleted',
            type: 'success'
        });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    // 블로그 목록을 렌더링하는 함수
    const renderBlogList = () => {
        return posts.map((post) => (
            <Card
                key={post.id}
                title={post.title}
                onClick={() => navigate(`/blogs/${post.id}`)}
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

    // 검색 입력 필드에서 Enter 키를 눌렀을 때 호출되는 함수
    const onSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`${location.pathname}?page=1`);
            setCurrentPage(1);
            getPosts(1);
        }
    };

    return (
        <div>
            <input 
                type="text"
                placeholder='search..'
                className="form-control"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={onSearch}
            />
            <hr />
            {posts.length === 0 
                ? <div>No blog posts found</div>
                : <>
                    {renderBlogList()}
                    {numberOfPages > 1 && <Pagination
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        onClick={onClickPageButton} // 여기에서 onClickPageButton 전달
                        limit={limit}
                    />}
                </>
            }
        </div>
    );
};

BlogList.propTypes = {
    isAdmin: bool
};

export default BlogList;
