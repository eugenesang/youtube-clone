// import { PostCard } from "./PostCard";
import PostCard2 from "../PostCard2";

export default function Home() {
  return (
    <div className="bg-slate-800 py-2 flex flex-col items-center ">
      <PostCard2 src={"/p2dkdk.png"} />
      <PostCard2 src={"/post1.png"} />
      <PostCard2 src={"p2.png"} />
      <PostCard2 src={"/p2.png"} />
    </div>
  );
}
