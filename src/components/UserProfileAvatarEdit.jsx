import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updatedAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });

      const { data: responseData } = response;

      dispatch(updatedAvatar(responseData.data.avatar));
    } catch (error) {
      AxiosToastError(error);
    }

    setLoading(false);
  };

  return (
    <section className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-neutral-900 bg-opacity-70 p-4">
      {/* profile avatar upload */}
      <div className="flex w-full max-w-sm flex-col items-center justify-center rounded bg-white p-4">
        <button
          onClick={() => close(true)}
          className="ml-auto block w-fit text-neutral-800"
        >
          <IoClose size={20} />
        </button>

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

        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="my-3 cursor-pointer rounded border border-primary-200 px-4 py-1 text-sm hover:bg-primary-200">
              {loading ? "Loading..." : "Upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatarImage}
            type="file"
            id="uploadProfile"
            className="hidden"
          />
        </form>
      </div>
    </section>
  );
};
export default UserProfileAvatarEdit;
