import styles from './create-blog-index.module.css';
import { createDraft } from '../../utils/send-data-to-server';
import { useNavigate } from 'react-router-dom';

const CreateBlogIndex = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await createDraft().catch(err => {
      console.error(err);
    });
    if (id) navigate(`draft/${id}/edit`);
  }

  return (
    <div className={styles.main}>
      <button onClick={handleClick}>Create a new blog</button>
    </div>
  )
} 

export default CreateBlogIndex;