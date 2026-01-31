import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ThoughtWrite.css";

const ThoughtModify = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [knockDt, setKnockDt] = useState("");
  const navigate = useNavigate(); // 이동을 위한 도구

  useEffect(() => {
    fetch(`http://localhost:3000/thought/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setKnockDt(data.knockDt);
      });
  }, [id]);

  const handleModify = async (id: number) => {
    if (!title) return alert("제목을 입력해주세요.");
    try {
      const res = await fetch(
        `http://localhost:3000/thought/modifyThought/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, knockDt }),
        },
      );

      if (res.ok) {
        navigate("/"); // 저장 후 메인 페이지로 슝!
      }
    } catch (error) {
      console.error("저장 실패 : ", error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <button onClick={() => navigate("/")} className="back-btn">
          ← 뒤로가기
        </button>
        <h2>새로운 생각 기록 ✍️</h2>
      </header>

      <div className="write-section write-page">
        <input
          className="main-input"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="main-textarea"
          placeholder="당신의 생각을 자유롭게 적어보세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="date-picker-group">
          <label htmlFor="knockDt">나중에 다시 알려드릴까요?</label>
          <input
            type="datetime-local" // ← 여기를 datetime-local로 변경!
            id="knockDt"
            className="write-date"
            value={knockDt}
            onChange={(e) => setKnockDt(e.target.value)}
          />
        </div>
        <button className="save-btn" onClick={() => handleModify(Number(id))}>
          생각 수정하기
        </button>
      </div>
    </div>
  );
};
export default ThoughtModify;
