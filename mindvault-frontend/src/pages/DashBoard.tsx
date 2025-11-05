import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CreateContentModel } from '../components/CreateContentModel';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export function DashBoard() {
  const [modelOpen,setModelOpen] = useState(false);
  const contents = useContent();
  return (
    <><div>
      <Sidebar/>
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
      <CreateContentModel open={modelOpen} onClose={() => {
        setModelOpen(false);
      }}/>
      <div className='flex justify-end gap-4'>
      <Button variant='primary' text='Add content' StartIcon={<PlusIcon/>} onClick = {()=>{
       setModelOpen(true); 
      }}></Button>
      <Button onClick={async ()=>{ 
        const response =await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
          share:true
        },{headers : {
          Authorization : localStorage.getItem("token")
        }}); const shareurl = `http://localhost:5173/share/${response.data.message}`
        alert(shareurl);
      }} variant='secondary' text='Share brain  ' StartIcon={<ShareIcon/>}></Button>
      </div>
     <div className='flex gap-4 flex-wrap'>
      {contents.map(({type,link,title}) =>  <Card type={type} link={link} title={title}></Card>)}
       <Card type="twitter" link='https://x.com/RishabhPant17/status/1985279701380972664/photo/1' title='rp tweet'></Card>
      <Card type="youtube" link='https://www.youtube.com/watch?v=t8m4VOSXQ8w' title='yt video1'></Card>
     </div>
     </div>
     </div>
    </>
  );
}

export default DashBoard;