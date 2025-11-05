export function Input({ 
  placeholder,
  reference
}: {
 reference?:any;
  placeholder: string
}) {
  return (
    <div>
      <input
        ref={reference}
        className="px-2 py-4 border m-1"
        type={"text"}
        placeholder={placeholder}
        //@ts-ignore
       
      ></input>
    </div>
  );
}