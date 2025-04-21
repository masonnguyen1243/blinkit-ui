import { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });
  // const allCategory = useSelector((state) => state.product.allCategory);

  // useEffect(() => {
  //   setCategoryData(allCategory);
  // }, [allCategory]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;

      if (response.data.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        // fetchCategory();
        setOpenUploadCategory(false);
        setOpenConfirmBox(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="">
      <div className="flex items-center justify-between bg-white p-2 shadow-md">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="rounded border border-primary-200 px-3 py-1 text-sm hover:bg-primary-200"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}
      {loading && <Loading />}
      <div className="grid cursor-pointer grid-cols-2 gap-2 p-4 md:grid-cols-4 lg:grid-cols-6">
        {categoryData.map((category, index) => {
          return (
            <div key={index} className="h-56 w-32 rounded shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-scale-down"
              />
              <div className="flex h-9 items-center gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1 rounded bg-green-100 py-1 text-green-600 hover:bg-green-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBox(true);
                    setDeleteCategory(category);
                  }}
                  className="flex-1 rounded bg-red-100 py-1 font-medium text-red-600 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {openEdit && (
        <EditCategory
          data={editData}
          fetchData={fetchCategory}
          close={() => setOpenEdit(false)}
        />
      )}

      {openConfirmBox && (
        <ConfirmBox
          close={() => setOpenConfirmBox(false)}
          confirm={handleDeleteCategory}
          cancel={() => setOpenConfirmBox(false)}
        />
      )}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}
    </section>
  );
};
export default Category;
