import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputWithContainer from "../../components/InputWithLabel"; // Import the InputWithContainer component
import { Link, useNavigate } from "react-router-dom";
import { _post } from "../../Service/ApiServiceProvider";
import { useAuth } from "../../ProtectedRoute/AuthProvider";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const {handleLogin} = useAuth()

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async(values) => {
      // Handle the login submission (e.g., API call)
      setIsLoading(true)
      try{
        const data = await handleLogin(values);
        toast.success(data.message)
      }
      catch (error){    
        toast.error(error.response.data.message)
      }
      finally{
        setIsLoading(false)
      }
    },
  });

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    // Navigate to sign-up screen
    navigate("/auth/signup");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-gray-700 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          Login
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <InputWithContainer
            label="Email"
            name="email"
            type="email"
            placeholder="example@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />

          <InputWithContainer
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />

          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Forgot Password?
            </button>
          </div>

          <div className="mt-4 text-center text-white">
            <span className="text-sm text-white">Don't have an account? </span>
            <button
              type="button"
              onClick={handleSignUp}
              className="text-sm text-blue-500 hover:text-indigo-800"
              disabled={isLoading}
            >
              {isLoading ? 'Sign Up...' : "Sign Up"}
            </button>
            {" "} or <Link to={"/"} className="text-sm text-blue-600 hover:text-indigo-800">Go to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
