import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full drop-shadow-lg">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-full w-full rounded-full"
          />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>

      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="mt-5 min-w-20 rounded-full border border-primary-100 px-3 py-1 text-sm hover:border-primary-200 hover:bg-primary-200"
      >
        Edit
      </button>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
      )}

      {/* name, mobile, email, change password */}
      <form onSubmit={handleSubmit} className="my-4 grid gap-4">
        <div className="grid">
          <label htmlFor="name">Name</label>
          <input
            required
            id="name"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={userData.name}
            onChange={handleOnChange}
            className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
          />
        </div>

        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            required
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={userData.email}
            onChange={handleOnChange}
            className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
          />
        </div>

        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            required
            id="mobile"
            type="number"
            placeholder="Enter your mobile"
            name="mobile"
            value={userData.mobile}
            onChange={handleOnChange}
            className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
          />
        </div>

        <button className="rounded border border-primary-100 px-4 py-2 font-semibold text-primary-200 hover:bg-primary-100 hover:text-neutral-800">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
export default Profile;
