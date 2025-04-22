import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../components/AddFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;

    setData((pre) => {
      return {
        ...pre,
        image: [...pre.image, imageUrl],
      };
    });

    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);

    setData((pre) => {
      return {
        ...pre,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);

    setData((pre) => {
      return {
        ...pre,
      };
    });
  };

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);

    setData((pre) => {
      return {
        ...pre,
      };
    });
  };

  const handleAddField = () => {
    setData((pre) => {
      return {
        ...pre,
        more_details: {
          ...pre.more_details,
          [fieldName]: "",
        },
      };
    });

    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="">
      <div className="flex items-center justify-between bg-white p-2 shadow-md">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="grid p-4">
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Name */}
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter product name"
              value={data.name}
              onChange={handleChange}
              required
              className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
            />
          </div>

          {/* Description */}
          <div className="grid gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              type="text"
              name="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className="resize-none rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
            />
          </div>

          {/* Image */}
          <div>
            <p>Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="flex h-24 cursor-pointer items-center justify-center rounded border bg-blue-50"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>

                <input
                  id="productImage"
                  type="file"
                  onChange={handleUploadImage}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
            {/* Display uploaded image */}
            <div className="mt-2 flex flex-wrap gap-4">
              {data.image.map((image, index) => {
                return (
                  <div
                    key={image + index}
                    className="group relative h-20 w-20 min-w-20 border bg-blue-50"
                  >
                    <img
                      src={image}
                      alt={image}
                      className="h-full w-full cursor-pointer object-scale-down"
                      onClick={() => setViewImageURL(image)}
                    />
                    <div
                      onClick={() => handleDeleteImage(index)}
                      className="absolute bottom-0 right-0 hidden cursor-pointer rounded bg-red-600 p-1 text-white hover:bg-red-600 group-hover:block"
                    >
                      <MdDelete />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category */}
          <div className="grid gap-1">
            <label htmlFor="">Category</label>
            <div>
              <select
                name=""
                id=""
                className="w-full rounded border bg-blue-50 p-2"
                value={selectedCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);

                  setData((pre) => {
                    return {
                      ...pre,
                      category: [...pre.category, category],
                    };
                  });

                  setSelectedCategory("");
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((c, index) => {
                  return (
                    <option key={index} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="mt-1 flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="flex items-center gap-1 bg-blue-50 text-sm"
                    >
                      <p>{c.name}</p>
                      <div
                        onClick={() => handleRemoveCategory(index)}
                        className="cursor-pointer hover:text-red-500"
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sub Category */}
          <div className="grid gap-1">
            <label htmlFor="">Sub Category</label>
            <div>
              <select
                name=""
                id=""
                className="w-full rounded border bg-blue-50 p-2"
                value={selectedSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (el) => el._id === value,
                  );

                  setData((pre) => {
                    return {
                      ...pre,
                      subCategory: [...pre.subCategory, subCategory],
                    };
                  });

                  setSelectedSubCategory("");
                }}
              >
                <option value="">Select Sub Category</option>
                {allSubCategory.map((c, index) => {
                  return (
                    <option key={index} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="mt-1 flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "subcategory"}
                      className="flex items-center gap-1 bg-blue-50 text-sm"
                    >
                      <p>{c.name}</p>
                      <div
                        onClick={() => handleRemoveSubCategory(index)}
                        className="cursor-pointer hover:text-red-500"
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Unit */}
          <div className="grid gap-1">
            <label htmlFor="unit">Unit</label>
            <input
              id="unit"
              type="text"
              name="unit"
              placeholder="Enter product unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
            />
          </div>

          {/* Stock */}
          <div className="grid gap-1">
            <label htmlFor="stock">Count in Stock</label>
            <input
              id="stock"
              type="text"
              name="stock"
              placeholder="Enter product stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
            />
          </div>

          {/* Price */}
          <div className="grid gap-1">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="text"
              name="price"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleChange}
              required
              className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
            />
          </div>

          {/* Discount */}
          <div className="grid gap-1">
            <label htmlFor="discount">Discount</label>
            <input
              id="discount"
              type="text"
              name="discount"
              placeholder="Enter product discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
            />
          </div>

          {/* Add more fields */}
          <div>
            {Object?.keys(data?.more_details)?.map((k, index) => {
              return (
                <div key={index} className="grid gap-1">
                  <label htmlFor={k}>{k}</label>
                  <input
                    id={k}
                    type="text"
                    name={k}
                    placeholder={`Enter product ${k}`}
                    value={data?.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setData((pre) => {
                        return {
                          ...pre,
                          more_details: {
                            ...pre.more_details,
                            [k]: value,
                          },
                        };
                      });
                    }}
                    required
                    className="rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-200"
                  />
                </div>
              );
            })}
          </div>

          <div
            onClick={() => setOpenAddField(true)}
            className="inline-block w-32 cursor-pointer rounded border border-primary-200 bg-white px-3 py-1 text-center font-semibold hover:bg-primary-200 hover:text-neutral-900"
          >
            Add Field
          </div>

          <button className="rounded bg-primary-100 py-2 font-semibold hover:bg-primary-200">
            Submit
          </button>
        </form>
      </div>

      {viewImageURL && (
        <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
      )}

      {openAddField && (
        <AddFieldComponent
          value={fieldName}
          onChange={(e) => {
            setFieldName(e.target.value);
          }}
          submit={handleAddField}
          close={() => setOpenAddField(false)}
        />
      )}
    </section>
  );
};
export default UploadProduct;
