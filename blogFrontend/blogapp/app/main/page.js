"use client";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";  // Import the logout icon
import PostPage from "../components/posts/post";
import Modal from "../components/modal";
import { getPosts, storePosts } from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        if(!token){
          router.replace("/splash");
          return;
        }
        const postsValue = await getPosts();
        setPosts(postsValue);
      } catch (error) {
        console.error("Error fetching posts:", error);
        router.replace("/splash");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCLoseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async formData => {
    try {
      await storePosts(formData);
      toast.success("Post Created Successfully");
      const allPosts = await getPosts();
      setPosts(allPosts);
      setIsModalOpen(false);
    } catch (ex) {
      toast.error(ex.toString());
    }
  };

  const handleLogout = () => {
   
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.replace("/login"); 
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <header className="header" style={{ flex: 1, textAlign: "center" }}>
          Trending Blog's
        </header>
        <div style={{ display: "flex", alignItems: "center", paddingRight: '30px' }}>
          <button
            style={{ paddingRight: "50px", fontWeight: "bold" }}
            onClick={handleOpenModal}
          >
            Create Blog
          </button>
          <button
            onClick={handleLogout}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "20px",
              color: "black"
            }}
          >
            <FaSignOutAlt /> 
             <FaSignOutAlt /> 
          </button>
        </div>
      </div>

      <PostPage posts={posts} setPosts={setPosts} loading={loading} />
      {isModalOpen && <Modal onClose={handleCLoseModal} onSubmitFunc={handleFormSubmit} />}
    </div>
  );
}
