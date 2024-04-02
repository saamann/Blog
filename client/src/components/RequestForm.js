import React, { useState } from "react";
import axios from "axios";
import "./RequestForm.css"; // Import the CSS file for styling
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RequestForm = ({ onAddRequest }) => {
  const [residentName, setResidentName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Remove HTML tags from content
      const cleanContent = content.replace(/(<([^>]+)>)/gi, "");

      // Create form data
      const formData = new FormData();
      formData.append("residentName", residentName);
      formData.append("content", cleanContent);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/requests",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Assuming the backend returns the newly created request
      onAddRequest(response.data);
      setResidentName("");
      setContent("");
      setImage(null);

      // Display a success message
      alert("Your post has been added!");
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="request-form-container">
      <h2>Create a Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="residentName">Title:</label>
          <input
            id="residentName"
            type="text"
            value={residentName}
            onChange={(e) => setResidentName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
