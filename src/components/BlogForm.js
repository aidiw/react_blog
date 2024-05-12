import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = async () => {
    await axios
      .post('http://localhost:3009/posts', {
        title: title,
        body: body,
      })
      .then(() => {
        history('/blogs'); // 페이지 리디렉션
      })
      .catch((error) => {
        console.error('Failed to post data:', error); // 오류 처리 추가
      });
  };

  return (
    <div>
      <h1>CREATE A BLOG POST</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={20}
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Post
      </button>
    </div>
  );
};

export default BlogForm;
