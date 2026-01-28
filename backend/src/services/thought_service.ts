import prisma from "../lib/prisma";

// 데이터를 저장하는 로직
export const createThought = async (data: {
  title: string;
  content: string;
  knockDt?: string | null;
}) => {
  // 3. 변수에 담아서 타입을 명확히 해줍니다.
  return await prisma.thought.create({
    data: {
      title: data.title,
      content: data.content,
      knockDt: data.knockDt || null,
    },
  });
};

// 모든 데이터를 가져오는 로직 (추가)
export const getAllThoughts = async () => {
  return await prisma.thought.findMany({
    orderBy: { createdAt: "desc" }, // 최신순 정렬
  });
};
