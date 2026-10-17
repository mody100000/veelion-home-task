const path = require('node:path');

const DATA_DIR = path.resolve(__dirname, '../../data');
const TASKS_FILE_PATH = path.join(DATA_DIR, 'tasks.json');
const ACTIVITY_FILE_PATH = path.join(DATA_DIR, 'activity.json');

module.exports = {
  DATA_DIR,
  TASKS_FILE_PATH,
  ACTIVITY_FILE_PATH,
};
