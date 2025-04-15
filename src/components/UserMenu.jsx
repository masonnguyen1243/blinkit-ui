import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";

const UserMenu = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm">{user.name || user.mobile}</div>

      <Divider />

      <div className="grid gap-3 text-sm">
        <Link to={""} className="px-2">
          My Orders
        </Link>
        <Link to={""} className="px-2">
          Save Address
        </Link>
        <button className="px-2 text-left">Logout</button>
      </div>
    </div>
  );
};
export default UserMenu;
