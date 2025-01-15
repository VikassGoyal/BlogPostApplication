"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Modal({ onClose, onSubmitFunc }) {
  const handleFormSubmit = (e) => {
    
    e.preventDefault();
    const title = e.target.title.value.trim();
    const content = e.target.content.value.trim();

    if (!title) {
        console.log("check");
      toast.error("Title is required!");
      return;
    }
    if (!content) {
      toast.error("Content is required!");
      return;
    }

    // Pass validated data to the parent
    onSubmitFunc({ title, content });
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button onClick={onClose} style={modalStyles.closeButton}>
          X
        </button>
        <h2 style={modalStyles.header}>Create Blog</h2>
        <form onSubmit={handleFormSubmit} style={modalStyles.form}>
          <div style={modalStyles.inputGroup}>
            <label htmlFor="title" style={modalStyles.label}>
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              style={modalStyles.input}
              
            />
          </div>
          <div style={modalStyles.inputGroup}>
            <label htmlFor="content" style={modalStyles.label}>
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              style={modalStyles.textarea}
             
            ></textarea>
          </div>
          <div style={modalStyles.buttonContainer}>
            <button type="submit" style={modalStyles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%",
    boxSizing: "border-box",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    cursor: "pointer",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "16px",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "10px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    width: "100%",
    height: "150px",
    boxSizing: "border-box",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};
