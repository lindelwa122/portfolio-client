import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditor = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  return (
    <>
      <h1>Edit Draft</h1>
      <input placeholder='Add title' value={title} onChange={handleTitleChange} />
      <ReactQuill theme='snow' value={value} onChange={setValue} />
    </>
  );
}

export default BlogEditor;
