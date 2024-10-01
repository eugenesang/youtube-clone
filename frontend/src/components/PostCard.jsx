// this card is deprecated.
import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { useCallback, useState } from "react";

export function PostCard({ src }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleLike = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  const toggleBookmarked = useCallback(() => {
    setIsBookmarked(!isBookmarked);
  }, [isBookmarked]);

  return (
    <div className="postCard bg-blue-800 mb-4 py-1 rounded-xl max-w-xl overflow-hidden flex-grow-0">
      <div className="flex flex-col gap-1 mx-auto">
        <div className="UserDetails px-7 pb-1 ">
          <div className="channelName flex gap-1 items-center">
            <div className="profilepic w-10 h-10 rounded-full overflow-hidden ">
              <img src="/profic.png" />
            </div>
            <div className="userName text-gray-200">username</div>
          </div>
        </div>
        {/* <div className="postImg "> */}
        {/* post form backend */}
        <div className=" bg-black aspect-square w-[350px] md:w-[500px] flex justify-between items-center">
          <img src={src} className="object-contain w-full " />
        </div>
        <div className="userInteractivityIcons flex justify-between w-full text-white px-2">
          <div className="text-red-900 flex w-1/5 justify-between">
            <div>
              <Heart
                fill={`${isLiked ? "red" : "none"}`}
                color={`${isLiked ? "red" : "grey"}`}
                onClick={toggleLike}
              />
            </div>
            <div>
              <MessageSquare color="grey" />
            </div>
          </div>
          <div>
            <Bookmark
              fill={`${isBookmarked ? "grey" : "none"}`}
              color="grey"
              onClick={toggleBookmarked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// {src}
// img fixed h,w object contain to set aspect ratio accordingly
//              fill={`${isLiked ? "red" : "grey"}`}
