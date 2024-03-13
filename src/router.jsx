import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CreateBlog from './components/create_blog/create-blog';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/blogs/create',
      element: <CreateBlog />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
