import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
  username: "",
  password: "",
  full_name: "",
  email: "",
  phone: "",
  role_id: "",
  status: "ACTIVE"
});

const handleEdit = (id) => {
  axios.get(`http://localhost:8080/users/${id}`)
    .then((res) => {
      const u = res.data;

      setForm({
        username: u.username || "",
        password: "",
        full_name: u.full_name || "",
        email: u.email || "",
        phone: u.phone || "",
        role_id: u.role_id || "", // 🔥 thêm
        status: u.status || "ACTIVE"
      });

      setEditingId(id);
      setShowModal(true);
    });
};

const handleUpdateUser = () => {
  const payload = {
    full_name: form.full_name,
    email: form.email,
    phone: form.phone,
    role_id: form.role_id,
    status: form.status
  };

  // chỉ gửi password nếu có nhập
  if (form.password) {
    payload.password = form.password;
  }

  axios.put(`http://localhost:8080/users/${editingId}`, payload)
    .then(() => {
      setShowModal(false);
      setEditingId(null);

      setForm({
        username: "",
        password: "",
        full_name: "",
        email: "",
        phone: "",
        role_id: "",
        status: "ACTIVE"
      });

      fetchUsers();
    })
    .catch(err => console.error(err));
};

const handleDelete = (id) => {
  if (!window.confirm("Are you sure to delete this user?")) return;

  axios.delete(`http://localhost:8080/users/${id}`)
    .then(() => {
      fetchUsers(); // 🔥 reload list
    })
    .catch(err => console.error(err));
};

const fetchUsers = () => {
  axios
    .get("http://localhost:8080/users")
    .then((res) => setUsers(res.data.result))
    .catch((err) => console.error(err));
};
useEffect(() => {
  fetchUsers();
}, []);
  // 📡 gọi API

  useEffect(() => {
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [showModal]);
  
const handleCreateUser = () => {
  axios
    .post("http://localhost:8080/users", form)
    .then(() => {
      // ✅ đóng modal
      setShowModal(false);

      // ✅ reset form
      setForm({
  username: "",
  password: "",
  full_name: "",
  email: "",
  phone: "",
  role_id: "", // 🔥 thêm
  status: "ACTIVE"
});

      // ✅ reload list (KHÔNG reload page)
      fetchUsers();
    })
    .catch((err) => {
      console.error("Create user failed:", err);
    });
};
  return (
    <div className="container">
      {/* 🔥 HEADER */}
      <div className="header">
        <div>
          <h2>User Management</h2>
          <p>Manage enterprise access, roles, and organizational assignments.</p>
        </div>
        <button
  className="btn-primary"
  onClick={() => {
    setEditingId(null);
    setForm({
      username: "",
      password: "",
      full_name: "",
      email: "",
      phone: "",
      role_id: "",
      status: "ACTIVE"
    });
    setShowModal(true);
  }}
>
  + Add New User
</button>
      </div>

      {/* 📊 STATS */}
      <div className="stats-wrapper">
        <div className="stats-card">
          <div className="stats-header">
            <span>TOTAL USERS</span>
            <span>👥</span>
          </div>

          <div className="stats-body">
            <h2>{users.length}</h2> {/* 🔥 dynamic */}
            <span className="percent">+12%</span>
          </div>
        </div>

        <div className="filter-box">
          <div className="filter-item">
            <label>ROLE</label>
            <select><option>All Roles</option></select>
          </div>

          <div className="filter-item">
            <label>BRANCH</label>
            <select><option>All Branches</option></select>
          </div>

          <div className="filter-item">
            <label>TEAM</label>
            <select><option>All Teams</option></select>
          </div>

          <button className="filter-btn">☰</button>
        </div>
      </div>

      {/* 📋 TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Info</th>
            <th>Role</th>
            <th>Org Unit</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>#{u.id}</td>

              {/* 👤 USER INFO */}
              <td>
                <div>
                  <strong>{u.full_name}</strong>
                  <br />
                  <small>{u.username}</small>
                </div>
              </td>

              {/* 🎭 ROLE */}
              <td>
                <span className="badge">
                  {u.role?.role_name || "N/A"}
                </span>
              </td>

              {/* 🏢 ORG (chưa có → tạm để '-') */}
              <td>-</td>

              {/* 📌 STATUS */}
              <td>
                <span className={u.status === "ACTIVE" ? "active" : "inactive"}>
                  {u.status}
                </span>
              </td>

              {/* 📅 CREATED */}
              <td>
                {u.created_at
                  ? new Date(u.created_at).toLocaleDateString()
                  : "-"}
              </td>

              <td>
  <button onClick={() => handleEdit(u.id)}>✏️</button>
  <button onClick={() => handleDelete(u.id)}>🗑</button>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔢 PAGINATION */}
      <div className="pagination">
        <span>Showing {users.length} users</span>
        <div>
          <button>{"<"}</button>
          <button className="active-page">1</button>
          <button>{">"}</button>
        </div>
      </div>

        {showModal && (
  <div className="modal-overlay">
    <div className="modal-pro">
          <button
    className="modal-close"
    onClick={() => setShowModal(false)}
  >
    ✕
  </button>
      <h2>Create New Identity</h2>
      <p className="subtitle">
        Fill out the credentials and assign organizational attributes.
      </p>

      {/* 🔐 ACCOUNT */}
<div className="form-section">
  <h4>🔐 ACCOUNT SECURITY</h4>

  <div className="grid-2">
    <div>
      <label>Username</label>
      <input
  value={form.username}
  disabled={editingId !== null}
  onChange={(e) =>
    setForm({ ...form, username: e.target.value })
  }
/>
    </div>

    <div>
      <label>Password</label>
      <input
        type="password"
        placeholder={editingId ? "Leave blank to keep old password" : ""}
        value={form.password}
        onChange={(e)=>setForm({...form, password:e.target.value})}
      />
    </div>
  </div>
</div>

{/* 👤 PROFILE */}
<div className="form-section">
  <h4>👤 PROFILE INFORMATION</h4>

  <div className="grid-2">
    <div>
      <label>Full Name</label>
      <input
        value={form.full_name}
        onChange={(e)=>setForm({...form, full_name:e.target.value})}
      />
    </div>

    <div>
      <label>Email</label>
      <input
        value={form.email}
        onChange={(e)=>setForm({...form, email:e.target.value})}
      />
    </div>

    <div>
      <label>Phone</label>
      <input
        value={form.phone}
        onChange={(e)=>setForm({...form, phone:e.target.value})}
      />
    </div>

    <div>
      <label>Status</label>
      <select
        value={form.status}
        onChange={(e)=>setForm({...form, status:e.target.value})}
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
      </select>
    </div>
  </div>
</div>

{/* 🏢 ROLE */}
<div className="form-section">
  <h4>🏢 ROLE</h4>

  <select
    value={form.role_id}
    onChange={(e)=>setForm({...form, role_id:e.target.value})}
  >
    <option value="">Select Role</option>
    <option value="1">Admin</option>
    <option value="2">Manager</option>
    <option value="3">User</option>
  </select>
</div>

     

      {/* 🏢 ORG */}
      <div className="form-section">
        <h4>🏢 ORGANIZATION CONTEXT</h4>

        <div className="grid-3">
          <select><option>Select Role</option></select>
          <select><option>Select Branch</option></select>
          <select><option>Select Team</option></select>
        </div>
      </div>

      {/* 🎯 ACTION */}
      <div className="modal-actions">
        <button className="btn-cancel" onClick={()=>setShowModal(false)}>
          Cancel
        </button>

        <button
  className="btn-primary"
  onClick={() => {
    if (editingId) {
      handleUpdateUser(); // 🔥 dùng update
    } else {
      handleCreateUser();
    }
  }}
>
  {editingId ? "Update User →" : "Create User →"}
</button>
      </div>

    </div>
  </div>
)}


    </div>
    
    
  );
  
}