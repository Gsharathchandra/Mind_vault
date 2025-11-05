import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";


interface CardProps{
    title:string;
    link :string;
    type:"twitter"|"youtube"
}

export function Card({title,link,type} : CardProps) {
  return (
    <div>
      <div className="p-4 bg-white rounded-lg border-gray-200 border max-w-72 ">
        <div className="flex justify-between ">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <PlusIcon/>
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="text-gray-500 pr-2">
                <a href={link} target="_blank"> <PlusIcon/></a>
            </div>
            <div className="text-gray-500">
              <ShareIcon/>
            </div>
          </div>
        </div>
        <div className="pt-5">
            {type === "youtube" &&   <iframe
         className="w-full"
          src={link.replace("watch","embed").replace("?v=","/")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>}
        
         {type === "twitter" &&  <blockquote className="twitter-tweet">
            <a href={link.replace("x.com","twitter.com")}></a>
          </blockquote>}
        </div>
      </div>
    </div>
  );
}
