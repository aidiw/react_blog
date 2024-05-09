import { useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3009/posts', {
        title: title, 
        body: body  // 오타 수정
      });
      console.log('Post Created:', response.data);
      // 성공 후 추가 동작 (예: 폼 초기화)
    } catch (error) {
      console.error('Error posting data:', error);
      // 실패 처리 로직
    }
  };

  return (
    <Router>
    <div>
      <Link to="/">Home</Link>
      <Link to="/blogs">Blogs</Link>
    </div>
    <Routes>
      <Route path="/" element={<div>Homa page</div>} />
      <Route path="/blogs" element={
        <div className="container">
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
          <button 
            className="btn btn-primary"
            onClick={onSubmit}
          >
            Post
          </button>
        </div>
      } />
    </Routes>
  </Router>
  
  
   
  );
}

export default App;
