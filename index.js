const express = require("express");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/tasks", async (request, response) => {
  const tasks = await prisma.task.findMany();
  return response.json({ tasks });
});

app.post("/tasks", async (request, response) => {
  const task = await prisma.task.create({
    data: {
      title: request.body.name,
    },
  });
  return response.json(task);
});

// Quando tiver completed = false -> true
// Quando tiver completed = true -> false
app.put("/tasks/:id", async (request, response) => {
  const task = await prisma.task.findFirst({
    where: {
      id: request.params.id,
    },
  });

  if (!task) {
    return response.json({
      error: true,
    });
  }

  await prisma.task.update({
    where: {
      id: request.params.id,
    },
    data: {
      completed: !task.completed,
    },
  });

  return response.json({
    error: false,
  });
});

app.delete("/tasks/:id", async (request, response) => {
  const id = request.params.id;
  await prisma.task.delete({
    where: {
      id,
    },
  });

  return response.json();
});

app.listen(3001);
