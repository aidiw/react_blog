import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './routes';
import Toast from './components/Toasts';
import useToast from './hooks/toasts'; // 경로 수정
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const toasts = useSelector(state => state.toast.toasts);
  const { deleteToast } = useToast();

  return (
    <Router>
      <Toast 
        toasts={toasts}
        deleteToast={deleteToast}
      />
      <NavBar />
      <div className="container mt-3">
        <Routes>
          {routes.map((route) => {
            return (
              <Route 
                key={route.path}
                path={route.path}
                element={
                  route.auth 
                    ? <ProtectedRoute element={route.element} /> 
                    : route.element
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
