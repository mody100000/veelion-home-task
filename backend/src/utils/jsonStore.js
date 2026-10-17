const fs = require('node:fs/promises');
const path = require('node:path');

const fileLocks = new Map();

function withFileLock(filePath, fn) {
  const currentPromise = fileLocks.get(filePath) || Promise.resolve();
  const nextPromise = currentPromise
    .catch(() => {})
    .then(() => fn());
  fileLocks.set(filePath, nextPromise);
  return nextPromise;
}

async function readJsonArray(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    if (!raw.trim()) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(filePath, '[]\n', 'utf-8');
      return [];
    }

    throw error;
  }
}

async function writeJsonArray(filePath, data) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });

  const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`;
  await fs.writeFile(tempPath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
  await fs.rename(tempPath, filePath);
}

async function mutateJsonArray(filePath, mutator) {
  return withFileLock(filePath, async () => {
    const data = await readJsonArray(filePath);
    const result = await mutator(data);
    await writeJsonArray(filePath, data);
    return result;
  });
}

module.exports = {
  readJsonArray,
  writeJsonArray,
  mutateJsonArray,
  withFileLock,
};
