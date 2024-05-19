import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './routes';
import Toast from './components/Toasts';
import useToast from './hooks/toasts';  // 경로 수정

function App() {
  const [toasts, addToast, deleteToast] = useToast();

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
            const Component = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Component addToast={addToast} />}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
