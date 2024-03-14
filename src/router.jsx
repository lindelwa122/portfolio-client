import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CreateBlog from './components/create_blog/create-blog';
import CreateBlogIndex from './components/create_blog_index/create-blog-index';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/blogs/create',
      element: <CreateBlog />,
      children: [
        { 
          index: true,
          element: <CreateBlogIndex /> 
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
