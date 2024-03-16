import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow, lightFormat } from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { saveDataToServer } from '../../utils/send-data-to-server';
import { useInterval } from '../../utils/custom-hooks';

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

  return (
    <>
      <dialog ref={modalRef}>
        <button onClick={closeModal}>Close Modal</button>
        <input 
          type='datetime-local' 
          name='schedule'
          value={form.schedule} 
          onChange={handleFormChange} 
          min={lightFormat(new Date(), 'yyyy-MM-dd') + 'T08:00'}
        />
        <button onClick={clearSchedule}>Clear Schedule</button>
        <button onClick={publish}>Publish</button>
      </dialog>
      <h1>Edit Draft</h1>
      <p>
        {
          draftState.error
          ? 'There was an error while trying to save your draft'
          : draftState.state === 'changed'
          ? 'Changes not saved.'
          : draftState.state === 'saving'
          ? 'Saving...'
          : draftState.state === 'saved'
          ? `Last saved ${
            formatDistanceToNow(draftState.lastSaved)
          }`
          : 'Not Saved.'
        }
      </p>
      <input 
        placeholder='Add title' 
        name='title'
        value={form.title} 
        onChange={handleFormChange} 
      />
      <ReactQuill 
        theme='snow' 
        value={form.content} 
        onChange={(_v, _d, _s, editor) => {
          setForm(prev => ({ ...prev, content: editor.getHTML() }));
        }} 
      />
      <div>
        <div>
          <button onClick={publish}>Publish</button>
          <span onClick={toggleShowScheduleBtn}>Dropdown</span>
        </div>
        {showScheduleBtn && <button onClick={openModal}>Schedule</button>}
      </div>
    </>
  );
}

export default BlogEditor;
