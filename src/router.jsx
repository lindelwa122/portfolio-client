import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CreateBlog from './components/create_blog/create-blog';
import CreateBlogIndex from './components/create_blog_index/create-blog-index';
import AllBlogs from './components/all_blogs/all-blogs';
import BlogEditor from './components/blog_editor/blog-editor';
import Blog from './components/blog/blog';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/blogs/create',
      element: <CreateBlog />,
      children: [
        { 
          index: true,
          element: <CreateBlogIndex /> 
        },
        {
          path: 'draft/:id/edit',
          element: <BlogEditor />,
        }
      ]
    },
    {
      path: '/blog',
      element: <AllBlogs />,
    },
    {
      path: '/blog/:id',
      element: <Blog />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
