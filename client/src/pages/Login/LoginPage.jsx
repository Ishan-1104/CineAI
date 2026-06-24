import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import {
  useAuth,
} from "../../contexts/AuthContext";

const LoginPage = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await login(
          formData
        );

        navigate("/");
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Login Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-950
      px-6
    "
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="
          w-full
          max-w-md
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-8
        "
      >
        <h1
          className="
          text-4xl
          font-bold
          mb-8
          text-center
        "
        >
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          className="
            w-full
            mb-4
            p-3
            rounded-xl
            bg-slate-800
          "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          className="
            w-full
            mb-6
            p-3
            rounded-xl
            bg-slate-800
          "
        />

        <button
          disabled={
            loading
          }
          className="
            w-full
            bg-red-500
            py-3
            rounded-xl
            font-semibold
          "
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p
          className="
          text-center
          mt-6
          text-slate-400
        "
        >
          Don't have an
          account?{" "}
          <Link
            to="/signup"
            className="
            text-red-500
          "
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;