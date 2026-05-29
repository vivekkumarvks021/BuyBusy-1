import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../../services/authService";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData.name, formData.email, formData.password);

      toast.success("Signup Successful");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <AuthForm
      title="Signup"
      buttonText="Signup"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLink="/login"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />
    </AuthForm>
  );
}

export default Signup;
