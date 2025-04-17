import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const UploadSubCategoryModel = ({ close }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setSubCategoryData((pre) => {
      return {
        ...pre,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(
      (el) => el._id === categoryId,
    );
    subCategoryData.category.splice(index, 1);
    setSubCategoryData((pre) => {
      return {
        ...pre,
      };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800 bg-opacity-60 p-4">
      <div className="w-full max-w-5xl rounded bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <form onSubmit={handleSubmitSubCategory} className="my-4 grid gap-3">
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              placeholder="Enter your sub category name"
              className="border bg-blue-50 p-3 outline-none focus-within:border-primary-200"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="subCategoryName">Image</label>
            <div className="flex flex-col items-center gap-3 lg:flex-row">
              <div className="flex h-36 w-full items-center justify-center border bg-blue-50 lg:w-36">
                {!subCategoryData.image ? (
                  <p className="text-sm text-neutral-400">No image</p>
                ) : (
                  <img
                    src={subCategoryData.image}
                    alt="subCategoryImage"
                    className="h-full w-full object-scale-down"
                  />
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div className="cursor-pointer rounded border border-primary-200 px-4 py-1 text-primary-200 hover:bg-primary-200 hover:text-neutral-800">
                  Upload Image
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  name="image"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="">Select Category</label>
            <div className="rounded border focus-within:border-primary-200">
              {/* Display value */}
              <div className="flex flex-wrap gap-2">
                {subCategoryData.category.map((cat) => {
                  return (
                    <div
                      key={cat._id + "selectedValue"}
                      className="m-1 flex items-center gap-2 bg-white px-1 shadow-md"
                    >
                      {cat.name}
                      <div
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                        className="cursor-pointer hover:text-red-600"
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Select category */}
              <select
                name=""
                id=""
                className="w-full bg-transparent p-2 outline-none"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value,
                  );

                  setSubCategoryData((pre) => {
                    return {
                      ...pre,
                      category: [...pre.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((category) => {
                  return (
                    <option
                      key={category._id + "subcategory"}
                      value={category?._id}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            className={`border px-4 py-2 font-semibold ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-200"}`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
export default UploadSubCategoryModel;
