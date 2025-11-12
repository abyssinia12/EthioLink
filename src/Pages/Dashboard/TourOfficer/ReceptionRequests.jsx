import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./OfficerT.module.css";
import { MessageSquareMore } from "lucide-react";

const statusOptions = ["Pending", "In Progress", "Resolved", "Rejected"];

export default function ReceptionRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [comment, setComment] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/officer/requests");
      setRequests(res.data);
    } catch (err) {
      setError("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      await axios.put(`http://localhost:5000/api/officer/request/${id}`, {
        status,
        comment,
      });
      setComment("");
      fetchRequests();
    } catch (err) {
      alert("Failed to update request");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={classes.special_interest_container}>
      <div className={classes.mid}>
        <MessageSquareMore color="orange" className={classes.ms} size={32} />
        <h2>Reception Requests</h2>
      </div>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr className={classes.header}>
              <th>Type</th>
              <th>Room</th>
              <th>Room Number</th>
              <th>Floor Number</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td className={classes.cell}>{req.type}</td>
                <td className={classes.cell}>{req.room}</td>
                <td className={classes.cell}>{req.room_number ?? "-"}</td>
                <td className={classes.cell}>{req.floor_number ?? "-"}</td>
                <td className={classes.cell}>{req.description}</td>
                <td className={classes.cell}>{req.priority}</td>
                <td className={classes.cell}>{req.status}</td>
                <td className={classes.cell}>
                  {new Date(req.created_at).toLocaleString()}
                </td>
                <td>
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add comment"
                    style={{ width: 120 }}
                    disabled={updatingId === req.id}
                  />
                </td>
                <td>
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    disabled={updatingId === req.id}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
