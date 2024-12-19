// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from './userSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    if (!formData.name || !formData.email) return;
    dispatch(createUser({ name: formData.name, email: formData.email }));
    setFormData({ name: '', email: '' });
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.email) return;
    dispatch(updateUser(formData));
    setEditing(false);
    setFormData({ name: '', email: '' });
  };

  const handleEdit = (user) => {
    setEditing(true);
    setFormData({ id: user.id, name: user.name, email: user.email });
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard - User Management</h2>

      {/* Loading and error states */}
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}

      {/* User Form */}
      <div className="mb-4">
        <h3>{editing ? 'Edit User' : 'Create User'}</h3>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="form-control mb-2"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control mb-2"
          />
        </div>
        <button
          className={`btn btn-${editing ? 'success' : 'primary'}`}
          onClick={editing ? handleUpdate : handleCreate}
        >
          {editing ? 'Update User' : 'Create User'}
        </button>
      </div>

      {/* Users Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
