import { Request, Response } from "express";
import * as ThoughtService from "../services/thought_service";

export const createThought = async (req: Request, res: Response) => {
  try {
    // 1. 클라이언트가 보낸 데이터 꺼내기
    const { title, content, knockDt } = req.body;

    // 2. 서비스 호출 (비즈니스 로직 실행)
    const newThought = await ThoughtService.createThought({
      title,
      content,
      knockDt,
    });

    // 3. 성공 응답 보내기
    res.status(201).json(newThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "생각을 저장하는 중 오류가 발생했습니다." });
  }
};

export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await ThoughtService.getAllThoughts();
    res.status(200).json(thoughts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "데이터를 불러오는 중 오류가 발생했습니다." });
  }
};
