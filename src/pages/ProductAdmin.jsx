import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearch } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProducts,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((pre) => pre + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((pre) => pre - 1);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;

    setPage(1);
    setSearch(value);
  };

  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);

    return () => {
      clearTimeout(interval);
    };
  }, [search]);

  return (
    <section className="">
      <div className="flex items-center justify-between bg-white p-2 shadow-md">
        <h2 className="font-semibold">Product</h2>
        <div className="ml-auto flex h-full w-full min-w-24 max-w-56 items-center gap-3 rounded border bg-blue-50 px-4 py-2 focus-within:border-primary-200">
          <IoSearch size={25} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleOnChange}
            className="h-full w-full bg-blue-50 outline-none"
          />
        </div>
      </div>
      {loading && <Loading />}

      <div className="bg-blue-50 p-4">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {productData.map((p, index) => {
              return <ProductCardAdmin key={index} data={p} />;
            })}
          </div>
        </div>

        <div className="my-4 flex justify-between">
          <button
            onClick={handlePrevious}
            className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
          >
            Previous
          </button>
          <button className="w-full bg-slate-100">
            {page} / {totalPageCount}
          </button>
          <button
            onClick={handleNext}
            className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProductAdmin;
