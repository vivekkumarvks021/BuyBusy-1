import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { login } from "../../services/authService";

import AuthForm from "../../components/AuthForm/AuthForm";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      await login(formData.email, formData.password);

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      footerText="Don't have an account?"
      footerLinkText="Signup"
      footerLink="/signup"
      onSubmit={handleSubmit}
    >
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

export default Login;
