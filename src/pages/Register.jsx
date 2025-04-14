import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm password must be same");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container mx-auto w-full px-2">
      <div className="mx-auto my-4 w-full max-w-lg rounded bg-white p-7">
        <p>Welcome to Binkit</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-1">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              autoFocus
              value={data.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter your name..."
              className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Password: </label>
            <div className="flex items-center rounded border bg-blue-50 p-2 focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password..."
                className="w-full bg-blue-50 outline-none"
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <div className="flex items-center rounded border bg-blue-50 p-2 focus-within:border-primary-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your confirm password..."
                className="w-full bg-blue-50 outline-none"
              />
              <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button
            disabled={!validValue}
            type="submit"
            className={`${validValue ? "bg-green-800 hover:bg-green-700" : "cursor-not-allowed bg-gray-500"} mt-3 rounded py-2 font-semibold tracking-wide text-white`}
          >
            Register
          </button>
        </form>
        <p>
          Already have account?{" "}
          <Link
            className="font-semibold text-green-700 hover:text-green-800"
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};
export default Register;
