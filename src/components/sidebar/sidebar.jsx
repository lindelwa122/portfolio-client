import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import styles from './sidebar.module.css';
import { useDraftsData } from '../../utils/custom-hooks';

const Sidebar = () => {
  const { error, loading, drafts } = useDraftsData();
  const navigate = useNavigate();

  if (error) return <div>There was an error.</div>

  if (loading) return <div>Still loading....</div>

  const draftList = drafts.map(draft => (
    <div 
      key={nanoid()}
      onClick={() => {
        navigate(`/blogs/create/draft/${draft.id}/edit`)
      }}>
        {draft.title}
    </div>
  ));

  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>All Drafts</div>
      {draftList}
    </div>
  );
}

export default Sidebar;
