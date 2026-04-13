import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 🔐 giả lập login
    localStorage.setItem("token", "abc123");

    navigate("/users");
  };

  return (
    <div className="login-container">
      {/* LEFT */}
      <div className="login-left">
        <div className="brand">
          <span className="logo">🔷</span>
          <h2 className="hover-text">Aura CRM</h2>
        </div>

        <h1 className="hover-text">
          Trí tuệ vận hành <br />
          <span>cho đội ngũ bán hàng hiện đại.</span>
        </h1>

        <p className="hover-text">
          Trải nghiệm quy trình làm việc tối ưu với hiệu suất cao và độ chính xác vượt trội.
          Quản lý người dùng, theo dõi giao dịch và mở rộng hệ thống một cách hiệu quả.
        </p>

        <div className="stats">
          <div className="stat-box hover-text">
            <strong>99.9%</strong>
            <p>Thời gian hoạt động</p>
          </div>
          <div className="stat-box hover-text">
            <strong>256-bit</strong>
            <p>Mã hóa bảo mật</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="login-box">
          <h2>Chào mừng trở lại</h2>
          <p>Vui lòng nhập thông tin để đăng nhập.</p>

          <input type="text" placeholder="Tên đăng nhập" />
          <input type="password" placeholder="Mật khẩu" />

          <div className="options">
            <label className="checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Ghi nhớ đăng nhập
            </label>

            <span className="forgot">Quên mật khẩu?</span>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Đăng nhập →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;