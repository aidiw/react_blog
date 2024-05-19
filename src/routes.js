import HomePage from './pages/HomPage';
import ListPage from './pages/ListPage';
import AdminPage from './pages/AdminPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ShowPage from './pages/ShowPage';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/blogs',
    element: <ListPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    auth: true
  },
  {
    path: '/blogs/create',
    element: <CreatePage />,
    auth: true
  },
  {
    path: '/blogs/:id',
    element: <ShowPage />,
  },
  {
    path: '/blogs/:id/edit',
    element: <EditPage />,
    auth: true
  },
];

export default routes;
