import { useState } from "react";
import { Toaster } from "react-hot-toast";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  useAuth,
} from "../../contexts/AuthContext";

const SignupPage = () => {
  const navigate =
    useNavigate();

  const { register } =
    useAuth();

  const [formData,
    setFormData] =
    useState({
      name: "",
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

        await register(
          formData
        );

        navigate("/");
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Signup Failed"
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
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={
            formData.name
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
            border
            border-slate-700
          "
          required
        />

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
            border
            border-slate-700
          "
          required
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
            border
            border-slate-700
          "
          required
        />

        <button
          type="submit"
          disabled={
            loading
          }
          className="
            w-full
            bg-red-500
            hover:bg-red-600
            transition
            py-3
            rounded-xl
            font-semibold
          "
        >
          {loading
            ? "Creating Account..."
            : "Sign Up"}
        </button>

        <p
          className="
            text-center
            mt-6
            text-slate-400
          "
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              text-red-500
              hover:text-red-400
            "
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;