const express = require("express");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/tasks", async (request, response) => {
  const tasks = await prisma.task.findMany();
  return response.json({ tasks });
});

app.post("/tasks", (request, response) => {
  response.send("ADD TASK");
});

app.put("/tasks/:id", (request, response) => {
  response.send("UPDATE TASK");
});

app.delete("/tasks/:id", (request, response) => {
  response.send("DELETAR TASK");
});

app.listen(3001);
