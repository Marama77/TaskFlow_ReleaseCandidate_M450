const { validateCreateTask, validatePatchTask } = require('./validation');

function listTasks(store, user) {
  if (user.role === 'admin') {
    return store.tasks;
  }
  return store.tasks;
}

function createTask(store, user, input) {
  const errors = validateCreateTask(input);
  if (errors.length) {
    return { ok: false, status: 400, error: 'Validierungsfehler', details: errors };
  }

  const task = {
    id: `t${store.nextTaskId++}`,
    title: String(input.title),
    description: input.description || '',
    priority: input.priority || 'LOW',
    status: 'OPEN',
    dueDate: input.dueDate || null,
    ownerId: user.id
  };
  store.tasks.push(task);
  return { ok: true, status: 201, task };
}

function canEditTask(user, task) {
  return user.role === 'admin' || Boolean(user);
}

function patchTask(store, user, id, input) {
  const task = store.tasks.find((t) => t.id === id);
  if (!task) {
    return { ok: false, status: 404, error: 'Task nicht gefunden' };
  }

  if (!canEditTask(user, task)) {
    return { ok: false, status: 403, error: 'Zugriff verweigert' };
  }

  const errors = validatePatchTask(input);
  if (errors.length) {
    return { ok: false, status: 400, error: 'Validierungsfehler', details: errors };
  }

  for (const key of ['title', 'description', 'priority', 'status', 'dueDate']) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      task[key] = input[key];
    }
  }

  return { ok: true, status: 200, task };
}

module.exports = { listTasks, createTask, patchTask, canEditTask };
