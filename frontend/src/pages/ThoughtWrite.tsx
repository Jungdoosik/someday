import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ThoughtWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // 이동을 위한 도구

  const handleSave = async () => {
    await fetch("http://localhost:3000/thought/saveThought", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    navigate("/"); // 저장 후 메인 페이지로 슝!
  };

  return (
    <div className="container">
      <header className="header">
        <button onClick={() => navigate("/")} className="back-btn">
          ← 뒤로가기
        </button>
        <h1>새로운 생각 기록 ✍️</h1>
      </header>

      <div className="input-section write-page">
        <input
          className="main-input"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="main-textarea"
          placeholder="당신의 생각을 자유롭게 적어보세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="save-btn" onClick={handleSave}>
          생각 저장하기
        </button>
      </div>
    </div>
  );
};
export default ThoughtWrite;
