import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-neutral-800 bg-opacity-60 p-4">
      <div className="w-full max-w-sm rounded bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Permanent Delete</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <p className="my-4">Are you sure permanent delete ?</p>
        <div className="ml-auto flex w-fit items-center gap-3">
          <button
            onClick={cancel}
            className="rounded border border-red-500 px-4 py-1 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="rounded border border-green-500 px-4 py-1 text-green-500 hover:bg-green-500 hover:text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmBox;
