import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestForm from "./RequestForm";

const RequestList = () => {
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
    <div className="request-list-container">
      <RequestForm onAddRequest={(newRequest) => setRequests([...requests])} />
      {/* newRequest, */}

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
    </div>
  );
};

export default RequestList;
