import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import propTypes from 'prop-types';

const BlogForm = ({ editing = false, addToast }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [body, setBody] = useState('');
  const [originalBody, setOriginalBody] = useState('');
  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3009/posts/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setOriginalTitle(res.data.title);
          setBody(res.data.body);
          setOriginalBody(res.data.body);
          setPublish(res.data.publish);
          setOriginalPublish(res.data.publish);
        })
        .catch(error => {
          console.error('Error fetching post:', error);
        });
    }
  }, [id, editing]);

  const isEdited = () => {
    return title !== originalTitle || body !== originalBody || publish !== originalPublish;
  };

  const goBack = () => {
    if (editing) {
      navigate(`/blogs/${id}`);
    } else {
      navigate('/blogs');
    }
  }

  const validateForm = () => {
    let validated = true;

    if (title === '') {
      setTitleError(true);
      validated = false;
    }

    if (body === '') {
      setBodyError(true);
      validated = false;
    }

    return validated;
  }

  const onSubmit = async () => {
    setTitleError(false);
    setBodyError(false);

    if (validateForm()) {
      if (editing) { //편집시
        axios.patch(`http://localhost:3009/posts/${id}`, {
          title: title,
          body: body,
          publish
        }).then(res => {
          navigate(`/blogs/${id}`);
        });
      } else { //생성시
        await axios.post('http://localhost:3009/posts', {
          title: title,
          body: body,
          publish,
          createdAt: Date.now()
        })
        .then(() => {
          addToast({
            type : 'success',
            text: 'successfully created!'
          })
          // navigate('/admin'); // 페이지 리디렉션
        })
        .catch((error) => {
          console.error('Failed to post data:', error); // 오류 처리 추가
        });
      }
    }
  };

  const onChangePublish = (e) => {
    setPublish(e.target.checked);
  }

  return (
    <div>
      <h1>{editing ? 'Edit' : 'Create'} a blog</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className={`form-control ${titleError ? 'border-danger' : ''}`}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        {titleError && <div className="text-danger">
          Title is required.
        </div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className={`form-control ${bodyError ? 'border-danger' : ''}`}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={10}
        />
        {bodyError && <div className="text-danger">
          Body is required.
        </div>}
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={publish}
          onChange={onChangePublish}
        />
        <label className="form-check-label">
          Publish
        </label>
      </div>
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? 'Edit' : 'Post'}
      </button>
      <button
        className="btn btn-danger ms-2"
        onClick={goBack}
      >
        Cancel
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: propTypes.bool
};

export default BlogForm;
