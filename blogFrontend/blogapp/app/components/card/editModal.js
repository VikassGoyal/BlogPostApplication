import { useState } from "react";
import styles from "./Modal.module.css";  
import { toast } from "react-toastify";
import { updatePost ,getPosts } from "../../api/api";
const EditModal = ({ titleval, descriptionval, id, onClose, onSave }) => {
  const [title, setTitle] = useState(titleval);
  const [description, setDescription] = useState(descriptionval);
   
  const handleSubmit = async (e)  => {
    e.preventDefault();
     try{
       await updatePost( id,title,description);
     
      const allPosts = await getPosts();
      onSave(allPosts);  
      onClose();
     }
     catch(ex){
      toast.error(ex.toString());
     }
   
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Save Changes</button>

            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
