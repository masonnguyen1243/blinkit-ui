import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
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
        ...SummaryApi.addCategory,
        data: data,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategory = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setLoading(true);

    setData((pre) => {
      return {
        ...pre,
        image: ImageResponse.data.url,
      };
    });
  };

  return (
    <section className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-neutral-800 bg-opacity-60 p-4">
      <div className="w-full max-w-4xl rounded bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button onClick={close} className="ml-auto block w-fit">
            <IoClose size={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="my-3 grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              onChange={handleOnChange}
              className="rounded border border-blue-100 bg-blue-50 p-2 outline-none focus-within:border-primary-200"
            />
          </div>

          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex flex-col items-center gap-4 lg:flex-row">
              <div className="flex h-36 w-full items-center justify-center rounded border bg-blue-50 lg:w-36">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className="h-full w-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${!data.name ? "bg-gray-200" : "bg-primary-200"} cursor-pointer rounded px-4 py-2 text-center`}
                >
                  {loading ? "Loading" : "Upload Image"}
                </div>
                <input
                  disabled={!data.name}
                  onChange={data.name ? handleUploadCategory : () => {}}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            className={`${data.name && data.image ? "bg-primary-200" : "bg-gray-200"} px-1 py-2 font-semibold`}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};
export default UploadCategoryModel;
