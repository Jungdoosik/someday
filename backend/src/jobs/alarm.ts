import schedule from "node-schedule";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const startScheduler = () => {
  console.log("알림.ts 시작");

  schedule.scheduleJob("* * * * *", async () => {
    const now = new Date();

    const targets = await prisma.thought.findMany({
      where: {
        sentYn: "N",
        deleteYn: "N",
      },
    });

    for (const thought of targets) {
      if (thought.knockDt === null) {
        const randomDays = (thought.id % 24) * 7;
        const targetDate = new Date(thought.createdAt);
        targetDate.setDate(targetDate.getDate() + randomDays);

        console.log("알람하기로한 날짜 :", targetDate);

        if (now >= targetDate) {
          console.log(`[알림 조건 충족] ID : ${thought.id}`);

          await prisma.thought.update({
            where: { id: thought.id },
            data: { sentYn: "Y" },
          });
        }
      } else {
        console.log("알람 knockDt : ", thought.knockDt);
      }
    }
  });
};
