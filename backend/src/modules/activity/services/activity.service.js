const { ACTIVITY_FILE_PATH } = require('../../../config/paths');
const { createId } = require('../../../utils/id');
const { readJsonArray, mutateJsonArray } = require('../../../utils/jsonStore');

async function getAllActivity() {
  return readJsonArray(ACTIVITY_FILE_PATH);
}

async function createNewActivity(payload) {
  const now = new Date().toISOString();
  const newActivity = {
    id: createId(),
    action: payload.action,
    info: payload.info,
    when: now,
    createdAt: now,
  };

  await mutateJsonArray(ACTIVITY_FILE_PATH, (activityList) => {
    activityList.push(newActivity);
  });

  return newActivity;
}

module.exports = {
  getAllActivity,
  createNewActivity,
};
