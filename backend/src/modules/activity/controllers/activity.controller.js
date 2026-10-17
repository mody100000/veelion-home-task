const activityService = require('../services/activity.service');
const HttpError = require('../../../utils/httpError');

async function getActivity(req, res) {
  const activities = await activityService.getAllActivity();
  res.status(200).json(activities);
}

async function addActivity(req, res) {
  const payload = req.body || {};

  if (typeof payload !== 'object' || Array.isArray(payload)) {
    throw new HttpError(400, 'Body must be a JSON object.');
  }

  if (!payload.action || typeof payload.action !== 'string' || !payload.action.trim()) {
    throw new HttpError(400, '"action" is required and must be a non-empty string.');
  }

  if (!payload.info || typeof payload.info !== 'string' || !payload.info.trim()) {
    throw new HttpError(400, '"info" is required and must be a non-empty string.');
  }

  const newActivity = await activityService.createNewActivity({
    action: payload.action.trim(),
    info: payload.info.trim(),
  });

  res.status(201).json(newActivity);
}

module.exports = {
  getActivity,
  get_activity: getActivity,
  addActivity,
};
