import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow, lightFormat } from 'date-fns';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { BsXCircleFill } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { saveDataToServer } from '../../utils/send-data-to-server';
import { useBlogData, useInterval } from '../../utils/custom-hooks';
import styles from './blog-editor.module.css';

const BlogEditor = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    schedule: '',
  });
  const [draftState, setDraftState] = useState({
    state: null,
    lastSaved: null,
    error: null,
  });
  const [previousDraft, setPreviousDraft] = useState({
    title: '',
    content: '',
  });
  const [showScheduleBtn, setShowScheduleBtn] = useState(false);

  const { id } = useParams();

  const saveDraft = async () => {
    if (!form.title || !form.content || form.content.length < 50) {
      return false;
    }

    const formData = Object.assign({}, form);
    delete formData.schedule;

    const res = await saveDataToServer('/blog/save-draft/' + id, formData)
      .catch(err => {
        setDraftState(prev => ({ ...prev, error: err }));
        console.error(err);
        return false;
      });

    if (res.success) {
      setDraftState(prev => ({ ...prev, error: null }));
      setPreviousDraft({ title: form.title, content: form.content });
      return true;
    } else {
      return false;
    }
  }

  const navigate = useNavigate();

  const validateForm = () => {
    if (!form.title) {
      alert('Title cannot be empty.');
      return false;
    } else if (form.title < 3 || form.title > 50) {
      alert('Title must have between 3 and 50 characters.');
      return false;
    } else if (!form.content) {
      alert('Content cannot be empty.');
      return false;
    }

    return true;
  }

  const publish = async () => {
    const formValid = validateForm();
    if (!formValid) {
      return false;
    }

    const formData = Object.assign({}, form);
    if (!formData.schedule) {
      delete formData.schedule;
    }

    const res = await saveDataToServer('/blog/publish/' + id, formData)
      .catch(err => {
        alert("There was an error and your blog wasn't saved.");
        setDraftState(prev => ({ ...prev, error: err }));
        console.error(err);
        return false;
      });

    if (res.success) {
      setDraftState(prev => ({ ...prev, error: null }));
      navigate('/blogs/create');
    } else {
      return false;
    }
  }

  const compareDrafts = () => {
    if (
      form.title !== previousDraft.title ||
      form.content !== previousDraft.content
    ) {
      const fieldEmpty = [form.title, form.content].some(field => !field);
      if (!fieldEmpty) {
        return true;
      }
    }
    return false;
  }

  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const toggleShowScheduleBtn = () => {
    setShowScheduleBtn(prev => !prev);
  }

  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.showModal();
  }

  const closeModal = () => {
    modalRef.current.close();
  }

  const clearSchedule = () => {
    setForm(prev => ({ ...prev, schedule: '' }));
  }

  useInterval(async () => {
    console.log('the interval runs')
    const changesMade = compareDrafts();
    console.log({ changesMade })
    if (changesMade && draftState.state !== 'saving') {
      setDraftState(prev => ({ 
        ...prev, 
        state: 'saving', 
        error: null,
      }));

      await saveDraft();

      setDraftState(prev => ({
        ...prev, 
        state: 'saved', 
        lastSaved: Date.now(),
      }));
    }
  }, 1000 * 30);

  const { error, loading, blog } = useBlogData(id);

  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title ?? '',
        content: blog.content ?? '',
        schedule: blog.scheduled_to_be_published_on ?? '',
      });

      setDraftState(prev => ({
        ...prev, 
        state: 'saved',
        lastSaved: blog.last_saved ?? null,
      }));

      setPreviousDraft({
        title: blog.title,
        content: blog.title,
      });
    }
  }, [blog]);

  return (
    <>
      <div>
      {
        !blog && 
          error 
          ? 'There was an error while loading your data. Check your internet connection and try reloading the page'
          : loading
          ? 'Loading your data...'
          : ''
      }
      </div>
      <dialog ref={modalRef} className={styles.dialog}>
        <div className={styles.xWrapper}>
          <BsXCircleFill onClick={closeModal} className={styles.x} />
        </div>
        <input 
          className={styles.input}
          type='datetime-local' 
          name='schedule'
          value={form.schedule} 
          onChange={handleFormChange} 
          min={lightFormat(new Date(), 'yyyy-MM-dd') + 'T08:00'}
        />
        <div className={styles.dBtnWrapper}>
          <button onClick={clearSchedule}>Clear Schedule</button>
          <button className='secondary-btn' onClick={publish}>Publish</button>
        </div>
      </dialog>
      <h1 className={styles.h1}>Edit Draft</h1>
      <p>
        {
          draftState.error
          ? 'There was an error while trying to save your draft'
          : draftState.state === 'changed'
          ? 'Changes not saved.'
          : draftState.state === 'saving'
          ? 'Saving...'
          : draftState.state === 'saved' && draftState.lastSaved
          ? `Last saved ${
            formatDistanceToNow(draftState.lastSaved)
          }`
          : 'Not Saved.'
        }
      </p>
      <input 
        className={styles.input}
        placeholder='Add title' 
        name='title'
        value={form.title} 
        onChange={handleFormChange} 
      />
      <ReactQuill
        className={styles.editor} 
        theme='snow' 
        value={form.content} 
        onChange={(_v, _d, _s, editor) => {
          setForm(prev => ({ ...prev, content: editor.getHTML() }));
        }} 
      />
      <div>
        <div className={styles.btnWrapper}>
          <button onClick={publish}>Publish</button>
          <IoIosArrowDropdownCircle 
            className={styles.dropdown}
            onClick={toggleShowScheduleBtn} 
          />
        </div>
        {showScheduleBtn && 
          <button className='secondary-btn' onClick={openModal}>Schedule</button>}
      </div>
    </>
  );
}

export default BlogEditor;
