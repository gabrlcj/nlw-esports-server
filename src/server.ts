import express, { Request, Response } from "express";

const app = express();

app.get("/ads", (req: Request, res: Response) => {
  return res.json([
    { id: 1, name: "Anuncio 1" },
    { id: 2, name: "Anuncio 2" },
    { id: 3, name: "Anuncio 3" },
  ]);
});

app.listen(3333);
