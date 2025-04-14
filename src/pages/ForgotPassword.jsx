import { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
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

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data,
        });
        setData({
          email: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container mx-auto w-full px-2">
      <div className="mx-auto my-4 w-full max-w-lg rounded bg-white p-7">
        <p className="text-lg font-semibold">Forgot Password</p>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
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

          <button
            type="submit"
            disabled={!validValue}
            className={`${validValue ? "cursor-pointer bg-green-800 hover:bg-green-700" : "cursor-not-allowed bg-gray-500"} mt-3 rounded py-2 font-semibold tracking-wide text-white`}
          >
            Send OTP
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link
            className="font-semibold text-green-700 hover:text-green-800 hover:underline"
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};
export default ForgotPassword;
