import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const About = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/requests/${id}`);
      // Filter out the deleted request from the list
      setRequests(requests.filter((request) => request._id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <AboutContainer>
      <Title>All Blogs</Title>
      <ul className="request-list">
        {requests.map((request) => (
          <div key={request._id} className="request-item">
            <p className="resident-name">{request.residentName}</p>
            <p className="request-content">{request.content}</p>
            <button
              className="delete-button"
              onClick={() => handleDelete(request._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </AboutContainer>
  );
};

export default About;
