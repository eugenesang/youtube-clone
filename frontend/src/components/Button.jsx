export function Button({ value, onClick, type }) {
  return (
    <>
      <button
        className="bg-black text-white rounded-md p-1 mb-2 px-4"
        onClick={onClick}
        type={type}
      >
        {value}
      </button>
    </>
  );
}

