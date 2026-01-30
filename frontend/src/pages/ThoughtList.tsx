import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ThoughtList,.css";

interface Thought {
  id: number;
  title: string;
  content: string;
  knockDt: string | null;
}

function ThoughtList() {
  const navigate = useNavigate();
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

  if (loading) return <div>데이터를 가져오는 중입니다.</div>;

  const handleDelete = async (id: number) => {
    if (!window.confirm("이 생각을 정리하시겠습니까?")) return;

    try {
      const res = await fetch(
        `http://localhost:3000/thought/deleteThought/${id}`,
        {
          method: "PATCH",
        },
      );

      if (res.ok) {
        setThoughts((prev) => prev.filter((item) => item.id !== id));
        alert("생각이 정리되었습니다.");
      }
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleModify = (id: number) => {
    navigate(`/modify/${id}`);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>언젠가 💭</h1>
        <p className="subtitle">흩어지는 생각들을 모아두는 곳</p>
      </header>

      {/* 입력창 (다음 단계에서 기능 연결!) */}
      <div className="input-section">
        <button className="add-btn" onClick={() => navigate("/write")}>
          + 새로운 생각 남기기
        </button>
      </div>

      {loading ? (
        <div className="loading">재나이가 데이터를 가져오는 중입니다...</div>
      ) : thoughts.length === 0 ? (
        <p className="empty-msg">아직 저장된 생각이 없습니다.</p>
      ) : (
        <div className="thought-grid">
          {thoughts.map((item) => (
            <div key={item.id} className="thought-card">
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
              <div className="card-footer">
                <small>📅 {item.knockDt || "알림 없음"}</small>
                <button
                  className="modify-btn"
                  onClick={() => handleModify(item.id)}
                >
                  수정
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  정리
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThoughtList;
