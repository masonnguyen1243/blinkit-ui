const ProductCardAdmin = ({ data }) => {
  return (
    <div className="w-36 bg-white p-2">
      <div>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="h-full w-full object-scale-down"
        />
      </div>
      <p className="line-clamp-2 text-ellipsis font-medium">{data?.name}</p>
      <p className="text-slate-400">{data?.unit} Unit</p>
    </div>
  );
};
export default ProductCardAdmin;
