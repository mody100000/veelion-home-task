const tasksService = require('../../tasks/services/tasks.service');
const activityService = require('../../activity/services/activity.service');

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

async function getTasksSummary() {
  const [tasks, activities] = await Promise.all([
    tasksService.getAllTasks(),
    activityService.getAllActivity(),
  ]);

  const total = tasks.length;

  const byStatus = {
    todo: tasks.filter((t) => !t.completed).length,
    'in-progress': 0,
    done: tasks.filter((t) => t.completed).length,
  };

  const now = Date.now();
  const recentActivityCount = activities.filter((activity) => {
    const timestamp = new Date(activity.when || activity.createdAt).getTime();
    return !Number.isNaN(timestamp) && now - timestamp < ONE_DAY_MS;
  }).length;

  return {
    total,
    byStatus,
    recentActivityCount,
  };
}

module.exports = {
  getTasksSummary,
};
