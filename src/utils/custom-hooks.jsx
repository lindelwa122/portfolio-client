import { useEffect, useState, useRef } from 'react';
import { serverURI } from './global-variables';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }

    if (delay) {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
}

const useDraftsData = () => {
  const [drafts, setDrafts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(serverURI + '/blog/drafts');
        if (!response.ok) {
          const err = new Error(`Something wrong occurred. Status: ${response.status}.`);
          err.status = response.status;
          throw err;
        }
  
        const { drafts } = await response.json();
        setDrafts(drafts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { drafts, error, loading };
}

const useBlogData = (id) => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(serverURI + '/blog/' + id);
        if (!response.ok) {
          const err = new Error(`Something wrong occurred. Status: ${response.status}.`);
          err.status = response.status;
          throw err;
        }

        const { blog } = await response.json();
        setBlog(blog);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return { blog, error, loading };
}

const useBlogsData = (id) => {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(serverURI + '/blog/published');
        if (!response.ok) {
          const err = new Error(`Something wrong occurred. Status: ${response.status}.`);
          err.status = response.status;
          throw err;
        }

        const { blogs } = await response.json();
        setBlogs(blogs);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return { blogs, error, loading };
}

export { useInterval, useDraftsData, useBlogData, useBlogsData };