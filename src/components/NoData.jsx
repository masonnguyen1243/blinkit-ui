import noDataImage from "../assets/nothing_here_yet.webp";

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <img src={noDataImage} alt="no data" className="w-36" />
      <p className="text-neutral-500">No Data</p>
    </div>
  );
};

export default NoData;
