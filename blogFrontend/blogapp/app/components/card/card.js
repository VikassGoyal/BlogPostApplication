import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "./editModal";  // Import the EditModal component
import styles from "./card.module.css";
import Link from 'next/link';
import { deletePost ,getPosts } from "../../api/api";
const PostCard = ({title , description, time ,setPosts,id, userId, createdAt, updatedAt}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      
    };
  
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }
  
  const formattedDate = formatDate(createdAt);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = async (updatedPost) => {
    try {
      setPosts(updatedPost);
      toast.success("Post Updated Successfully");
    } catch (error) {
      toast.error("Failed to update the post.");
    }
  }; 

  const handleDelete = async(id)=>{
    try{
        await deletePost(id);
      const allPosts=   await getPosts();
      setPosts(allPosts);
      toast.success("Post Delete Sucessfully");

    }
    catch(error){
      toast.error(error.toString());
    }
  }
  const storedUserId = localStorage.getItem('userId');

  return (
    <div className={styles.card}>
      <img src="/pexels-pixabay-262508.jpg" alt={title} />
      <Link href={{ pathname: `/posts/${id}` }} state={{ title: title, description: description, id:id }}>
        <h1 className={styles.title}>{title}</h1>
      </Link>
      <p className={styles.description}>{description}</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div className={styles.time}>
          <span style={{ fontWeight: 'bold' }}>CreatedAt: </span>{formattedDate}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {storedUserId === userId && (
            <div onClick={openEditModal} style={{ marginRight: '10px', cursor: 'pointer' }}>
              <FaEdit color="blue" />
            </div>
          )}
          {storedUserId === userId && (
            <div onClick={() => handleDelete(id)}>
              <FaTrash color="red" />
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditModal  titleval ={title} descriptionval={description}  id={id} userId={userId} onClose={closeEditModal} onSave={handleSave} />
      )}
    </div>
  );
};

export default PostCard;
