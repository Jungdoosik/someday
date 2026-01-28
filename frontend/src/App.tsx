import { useEffect, useState } from "react";
import "./App.css";

interface Thought {
  id: number;
  title: string;
  content: string;
  knockDt: string | null;
}

function App() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/thought")
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("데이터 로딩 실패 : ", err);
        setLoading(true);
      });
  }, []);

  if (loading) return <div>재나이가 데이터를 가져오는 중입니다.</div>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>언젠가</h1>
      {thoughts.length === 0 ? (
        <p>아직 저장된 생각이 없습니다.</p>
      ) : (
        <div>
          {thoughts.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <small>알림 날짜 : {item.knockDt || "알림없음"}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
