import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await api.register({ name, email, password });
      const data = await res.json();
      if (res.ok) {
        navigate("/signin");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="card">
        <h1>Welcome Onboard!</h1>
        <p className="card__sub">Lets help you meet up some tasks</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup} className="form">
          <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing up..." : "Register"}
          </button>
        </form>
        <p className="card__link">Already have an account? <Link to="/signin">Sign in</Link></p>
      </div>
    </div>
  );
};

export default SignUp;