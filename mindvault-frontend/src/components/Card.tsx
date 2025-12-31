import { TrashIcon } from "../icons/TrashIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";

function getYouTubeEmbedUrl(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : url;
}

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete?: () => void;
}

export function Card({ title, link, type, onDelete }: CardProps) {
  return (
    <div>
      <div className="p-4 bg-white rounded-lg border-gray-200 border max-w-72 ">
        <div className="flex justify-between ">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <PlusIcon />
            </div>
            {title}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-gray-500 pr-2">
              <a href={link} target="_blank"> <ShareIcon /></a>
            </div>
            {onDelete && <div className="text-gray-500 cursor-pointer hover:text-red-500" onClick={onDelete}>
              <TrashIcon />
            </div>}
          </div>
        </div>
        <div className="pt-5">
          {type === "youtube" && <iframe
            className="w-full"
            src={getYouTubeEmbedUrl(link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>}

          {type === "twitter" && <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>}
        </div>
      </div>
    </div>
  );
}
