import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;
