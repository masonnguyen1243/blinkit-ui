import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const validValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        // navigate("/verification-otp");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container mx-auto w-full px-2">
      <div className="mx-auto my-4 w-full max-w-lg rounded bg-white p-7">
        <p className="text-lg font-semibold">Enter OTP</p>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your OTP: </label>
            <div className="mt-3 flex items-center justify-between gap-2">
              {data.map((el, index) => {
                return (
                  <input
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    key={index}
                    type="text"
                    name="otp"
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log("value", value);

                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    maxLength={1}
                    id="otp"
                    className="w-full rounded border bg-blue-50 p-2 text-center font-semibold outline-none focus-within:border-primary-200"
                  />
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={!validValue}
            className={`${validValue ? "cursor-pointer bg-green-800 hover:bg-green-700" : "cursor-not-allowed bg-gray-500"} mt-3 rounded py-2 font-semibold tracking-wide text-white`}
          >
            Verify OTP
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
export default OtpVerification;
