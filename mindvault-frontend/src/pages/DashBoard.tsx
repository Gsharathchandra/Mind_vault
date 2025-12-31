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
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, refresh } = useContent();

  async function handleDelete(contentId: string) {
    if (window.confirm("Are you sure you want to delete this content?")) {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId },
        headers: { Authorization: localStorage.getItem("token") }
      });
      refresh();
    }
  }

  return (
    <><div>
      <Sidebar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
        <CreateContentModel
          open={modelOpen}
          onClose={() => setModelOpen(false)}
          onContentAdded={() => {
            setModelOpen(false);
            refresh();
          }}
        />
        <div className='flex justify-end gap-4'>
          <Button variant='primary' text='Add content' StartIcon={<PlusIcon />} onClick={() => {
            setModelOpen(true);
          }}></Button>
          <Button onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
              share: true
            }, {
              headers: {
                Authorization: localStorage.getItem("token")
              }
            }); const shareurl = `http://localhost:5173/share/${response.data.message}`
            alert(shareurl);
          }} variant='secondary' text='Share brain  ' StartIcon={<ShareIcon />}></Button>
        </div>
        <div className='flex gap-4 flex-wrap'>
          {contents.map(({ type, link, title, _id }) => <Card key={_id} type={type} link={link} title={title} onDelete={() => handleDelete(_id)}></Card>)}
        </div>
      </div>
    </div>
    </>
  );
}

export default DashBoard;