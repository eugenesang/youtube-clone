import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { useCallback, useState } from "react";

export default function PostCard2({ src, title }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleLike = useCallback(() => {
    setIsLiked((prevState) => !prevState);
  }, []);

  const toggleBookmarked = useCallback(() => {
    setIsBookmarked((prevState) => !prevState);
  }, []);
  //    {
  //     profilePic, username, title, postImage, (isLiked & isbookmarked form backend)
  //   }
  return (
    <div className="postCard bg-blue-800 mx-2 my-3 py-2 min-w-[300px] max-w-[600px] rounded-lg  ">
      {/* User Details */}
      <div className="UserDetails px-4 py-1">
        <div className="channelName flex gap-3 items-center">
          {/* Profile Picture */}
          <div className="profilepic w-8 h-8 rounded-full overflow-hidden">
            <img src="/profic.png" alt="Profile" />
          </div>
          {/* Username */}
          <div className="userName text-gray-300 text-md">username</div>
        </div>
      </div>

      <div className="text-s text-white pb-2 px-2 font-bold">
        {title ? (
          title
        ) : (
          <p>
            this is a title set by developer just to check if it exceeds the
            preset width
          </p>
        )}
      </div>

      <div className="min-w-[300px] h-[350px] md:min-w-[500px] lg:w-[600px] lg:h-[500px] bg-black ">
        <img
          src={src}
          className="w-full h-full object-contain object-center "
        />
      </div>

      {/* Interaction Icons */}
      <div className="userInteractivityIcons flex justify-between w-full text-white px-4 py-2">
        <div className="flex w-1/5 justify-between">
          {/* Like Button */}
          <div onClick={toggleLike} className="cursor-pointer">
            <Heart
              fill={isLiked ? "red" : "none"}
              color={isLiked ? "red" : "grey"}
            />
          </div>
          {/* Comment Button */}
          <div className="cursor-pointer">
            <MessageSquare color="grey" />
          </div>
        </div>
        {/* Bookmark Button */}
        <div onClick={toggleBookmarked} className="cursor-pointer">
          <Bookmark fill={isBookmarked ? "grey" : "none"} color="grey" />
        </div>
      </div>
    </div>
  );
}
