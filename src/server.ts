import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHoutString } from "./utils/convert-minutes-to-hour-string";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/games", async (req: Request, res: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

app.post("/games/:gameId/ads", async (req: Request, res: Response) => {
  const data = req.body;
  const gameId = req.params.gameId;

  const newAd = await prisma.ad.create({
    data: {
      gameId,
      name: data.name,
      yearsPlaying: data.yearsPlaying,
      discord: data.discord,
      weekDays: data.weekDays.join(","),
      hourStart: convertHourStringToMinutes(data.hourStart),
      hourEnd: convertHourStringToMinutes(data.hourEnd),
      useVoiceChannel: data.useVoiceChannel,
    },
  });

  return res.json(newAd);
});

app.get("/games/:id/ads", async (req: Request, res: Response) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHoutString(ad.hourStart),
        hourEnd: convertMinutesToHoutString(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (req: Request, res: Response) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.json({
    discord: ad.discord,
  });
});

app.listen(3333);
