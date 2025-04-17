import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaExternalLinkAlt } from "react-icons/fa";
import isAdmin from "../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }

        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="flex items-center gap-2 text-sm">
        <span className="line-clamp-1 max-w-52 text-ellipsis">
          {user.name || user.mobile}{" "}
          <span className="text-sm text-red-600">
            {user.role === "ADMIN" ? "(Admin)" : ""}
          </span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:text-primary-200"
        >
          <FaExternalLinkAlt size={15} />
        </Link>
      </div>

      <Divider />

      <div className="grid gap-1 text-sm">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="px-2 py-1 hover:bg-orange-200"
          >
            Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/subcategory"}
            className="px-2 py-1 hover:bg-orange-200"
          >
            Sub Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-product"}
            className="px-2 py-1 hover:bg-orange-200"
          >
            Upload Product
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="px-2 py-1 hover:bg-orange-200"
          >
            Product
          </Link>
        )}
        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 py-1 hover:bg-orange-200"
        >
          My Orders
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 py-1 hover:bg-orange-200"
        >
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="px-2 py-1 text-left hover:bg-orange-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default UserMenu;
