import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

const Signin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userId", data.data.userId);
        localStorage.setItem("token", data.data.token);
        navigate("/todo");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="card card--center">
        <h1>Welcome back!</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="form">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="card__link">Don&apos;t have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Signin;