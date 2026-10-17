const { TASKS_FILE_PATH } = require('../../../config/paths');
const { createId } = require('../../../utils/id');
const { readJsonArray, mutateJsonArray } = require('../../../utils/jsonStore');
const HttpError = require('../../../utils/httpError');

function buildTaskRecord(payload) {
  const now = new Date().toISOString();

  return {
    id: createId(),
    title: payload.title,
    completed: Boolean(payload.completed),
    createdAt: now,
    updatedAt: now,
  };
}

async function getAllTasks() {
  return readJsonArray(TASKS_FILE_PATH);
}

async function getTaskById(taskId) {
  const tasks = await readJsonArray(TASKS_FILE_PATH);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    throw new HttpError(404, 'Task not found.');
  }

  return task;
}

async function createTask(payload) {
  if (!payload || !payload.title || typeof payload.title !== 'string') {
    throw new HttpError(400, 'Invalid title.');
  }

  const newTask = buildTaskRecord(payload);

  await mutateJsonArray(TASKS_FILE_PATH, (tasks) => {
    tasks.push(newTask);
  });

  return newTask;
}

async function updateTask(taskId, updates) {
  const updatedTask = await mutateJsonArray(TASKS_FILE_PATH, (tasks) => {
    const taskIndex = tasks.findIndex((item) => item.id === taskId);

    if (taskIndex === -1) {
      throw new HttpError(404, 'Task not found.');
    }

    const existingTask = tasks[taskIndex];
    const modified = {
      ...existingTask,
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.completed !== undefined && { completed: updates.completed }),
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = modified;
    return modified;
  });

  return updatedTask;
}

async function deleteTask(taskId) {
  const removedTask = await mutateJsonArray(TASKS_FILE_PATH, (tasks) => {
    const taskIndex = tasks.findIndex((item) => item.id === taskId);

    if (taskIndex === -1) {
      throw new HttpError(404, 'Task not found.');
    }

    const [removed] = tasks.splice(taskIndex, 1);
    return removed;
  });

  return removedTask;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
