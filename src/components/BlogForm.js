import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { bool } from 'prop-types';

const BlogForm = ( {editing}) => {
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const {id} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3009/posts/${id}`).then(res => {
        setTitle(res.data.title);
        setBody(res.data.body);
    })
  }, [id])

  const onSubmit = async () => {
    await axios
      .post('http://localhost:3009/posts', {
        title: title,
        body: body,
        createdAt: Date.now()
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
      <h1>{editing? 'Eidt' : 'Create'} a blog</h1>
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
          rows={10}
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        {editing? 'Edit' : 'Post'}
      </button>
    </div>
  );
};

BlogForm.propTypes = {
    editing: bool
}

BlogForm.defaultProps = {
    editing: false
}


export default BlogForm;
