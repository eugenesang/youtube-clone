export function SideBarButton({ label, iconSrc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex justify-start items-center hover:bg-neutral-800 p-1 pl-3 m-1 rounded-lg text-white"
    >
      <img src={iconSrc} alt="" />
      <span className=" mx-2 my-1">{label}</span>
    </button>
  );
}
