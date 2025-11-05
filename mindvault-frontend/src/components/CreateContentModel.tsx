// import { useRef, useState } from "react";
// import { CrossIcon } from "../icons/CrossIcon";
// import { Button } from "./Button";
// import { Input } from "./Input";

// enum ContentType = {
//   Youtube = "youtube",
//   Twitter = "twitter"
// } 

// export function CreateContentModel({ open, onClose }) {
//  const titleref = useRef<HTMLInputElement/>();
//  const linkref = useRef<HTMLInputElement/> (); 
//  const [type,setType] = useState(ContentType.Youtube);

//   function addcontent(){


//   }
//   return (
//     <div>
//       {open && (
//         <div className="w-screen h-screen fixed top-0 left-0 bg-gray-50 flex justify-center">
//           <div className="flex flex-col justify-center">
//             <span className="bg-white opacity-100 p-4 rounded-md">
//               <div className="flex justify-end">
//                 <div onClick={onClose} className="cursor-pointer">
//                   <CrossIcon />
//                 </div>
//               </div>
//               <div>
//                 <Input reference={titleref} placeholder={"Title"}></Input>
//                 <Input reference={linkref} placeholder={"Link"}></Input>
//               </div>
//               <div>
//                 <div className="flex gap-4"> 
//                    <h1>TYPE</h1>
//                 <Button onClick={() => {
//                   setType(ContentType.Youtube)
//                 }} text="Youtube" variant = {type === ContentType.Youtube ? "primary" : "secondary"}></Button>
//                 <Button onClick={()=>{
//                   setType(ContentType.Twitter)
//                 }} text="Twitter" variant = {type === ContentType.Twitter ? "primary" : "secondary"}></Button>
//                 </div>
               
//               </div>
//               <div className="flex justify-center">
//                 <Button onClick={addcontent} variant="primary" text="Submit"></Button>
//               </div>
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

 import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  async function addcontent() {
    const title = titleref.current?.value;
    const link = linkref.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/content`,{
      link,title,type
    },{
      headers:{
        "Authorization":localStorage.getItem("token")
      }
    })
    
     onClose();
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-gray-50 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded-md">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input reference={titleref} placeholder="Title" />
                <Input reference={linkref} placeholder="Link" />
              </div>
              <div>
                <div className="flex gap-4">
                  <h1>TYPE</h1>
                  <Button
                    onClick={() => setType(ContentType.Youtube)}
                    text="Youtube"
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                  />
                  <Button
                    onClick={() => setType(ContentType.Twitter)}
                    text="Twitter"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={addcontent}
                  variant="primary"
                  text="Submit"
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

