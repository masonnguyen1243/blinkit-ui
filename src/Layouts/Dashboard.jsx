import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto grid p-3 lg:grid-cols-[250px,1fr]">
        {/* menu left */}
        <div className="sticky top-24 hidden max-h-[calc(100vh-120px)] overflow-y-auto border-r py-4 lg:block">
          <UserMenu />
        </div>

        {/* content right */}
        <div className="min-h-[75vh] bg-white">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
