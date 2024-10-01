export function SearchBar() {
  return (
    <div className="flex justify-normal items-center flex-grow bg-neutral-900 px-8 py-2 max-w-xl border-neutral-600 border-2 rounded-3xl">
      <button>
        <img src="/search-icon.svg" alt="search" />
      </button>
      <span className="w-full ">
        <form action="">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 outline-none border-none bg-inherit text-sm "
            autoCorrect="true"
          />
        </form>
      </span>
    </div>
  );
}
