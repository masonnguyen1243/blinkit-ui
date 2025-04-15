import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto grid p-3 lg:grid-cols-[250px,1fr]">
        {/* menu left */}
        <div className="sticky top-24 hidden overflow-y-auto py-4 lg:block">
          <UserMenu />
        </div>

        {/* content right */}
        <div className="bg-white p-4">content display</div>
      </div>
    </section>
  );
};
export default Dashboard;
