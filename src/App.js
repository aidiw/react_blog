import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import NavBar from './components/NavBar';
import routes from './routes';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="container">
          <Routes>
              {routes.map((route) => {
                return <Route key={route.path} path={route.path} Component={route.component} />;
              })}
          </Routes>
        </div>
      </div>
    </Router>
  );
  
}

export default App;
