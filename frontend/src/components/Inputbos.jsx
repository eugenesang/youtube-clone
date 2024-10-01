export function InputBox({ placeholder, onChange, name }) {
  return (
    <div>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
        onChange={onChange}
      />
    </div>
  );
}
