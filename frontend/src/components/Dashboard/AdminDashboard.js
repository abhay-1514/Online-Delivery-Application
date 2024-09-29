import React, { useEffect, useState } from 'react';
import { fetchUsers, blockUser, unblockUser } from '../../services/api'; // Adjust the import based on your API file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/AdminDashboard.css'; // Create this CSS file for styling

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers(); // Function to fetch users from API
        setUsers(response); // Assuming response is the users array
      } catch (error) {
        toast.error('Failed to fetch users.');
      }
    };

    getUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      await blockUser(userId); // Call the block user API
      setUsers(users.map(user => user._id === userId ? { ...user, blocked: true } : user));
      toast.success('User blocked successfully!');
    } catch (error) {
      toast.error('Failed to block user.');
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await unblockUser(userId); // Call the unblock user API
      setUsers(users.map(user => user._id === userId ? { ...user, blocked: false } : user));
      toast.success('User unblocked successfully!');
    } catch (error) {
      toast.error('Failed to unblock user.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>Registered Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <span>{user.name} ({user.role})</span>
            {user.blocked ? (
              <button onClick={() => handleUnblockUser(user._id)}>Unblock</button>
            ) : (
              <button onClick={() => handleBlockUser(user._id)}>Block</button>
            )}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
