import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";

export function SharedBrain() {
  const { shareLink } = useParams();
  const [data, setData] = useState<{ username: string; contents: any[] }>({
    username: "",
    contents: []
  });

  useEffect(() => {
    const fetchBrain = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Invalid or expired link");
      }
    };
    fetchBrain();
  }, [shareLink]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">
        🧠 {data.username}'s Brain
      </h1>
      <div className="flex flex-wrap gap-4">
        {data.contents.map(({ type, link, title }) => (
          <Card key={link} type={type} link={link} title={title} />
        ))}
      </div>
    </div>
  );
}
