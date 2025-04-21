import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-neutral-900 bg-opacity-70 p-4">
      <div className="w-full max-w-md rounded bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Add Field</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
          className="my-2 w-full rounded border bg-blue-50 p-2 outline-none focus-within:border-primary-100"
        />
        <button
          onClick={submit}
          className="mx-auto block w-fit rounded bg-primary-200 px-4 py-2 hover:bg-primary-100"
        >
          Add Field
        </button>
      </div>
    </section>
  );
};
export default AddFieldComponent;
