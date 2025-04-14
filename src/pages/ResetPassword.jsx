import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
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

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((pre) => {
        return {
          ...pre,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and Confirm password must be same");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container mx-auto w-full px-2">
      <div className="mx-auto my-4 w-full max-w-lg rounded bg-white p-7">
        <p className="text-lg font-semibold">Enter Your New Password</p>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password: </label>
            <div className="flex items-center rounded border bg-blue-50 p-2 focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password..."
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
            type="submit"
            disabled={!validValue}
            className={`${validValue ? "cursor-pointer bg-green-800 hover:bg-green-700" : "cursor-not-allowed bg-gray-500"} mt-3 rounded py-2 font-semibold tracking-wide text-white`}
          >
            Change Password
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
export default ResetPassword;
