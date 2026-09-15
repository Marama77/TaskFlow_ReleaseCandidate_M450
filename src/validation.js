const ALLOWED_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];
const ALLOWED_STATUS = ['OPEN', 'IN_PROGRESS', 'DONE'];

function validateCreateTask(input) {
  const errors = [];

  if (input.title == null) {
    errors.push('title ist erforderlich');
  }

  if (input.priority && !ALLOWED_PRIORITIES.includes(input.priority)) {
    errors.push('priority ist ungueltig');
  }

  if (input.dueDate && Number.isNaN(Date.parse(input.dueDate))) {
    errors.push('dueDate ist ungueltig');
  }

  return errors;
}

function validatePatchTask(input) {
  const errors = [];

  if (input.priority && !ALLOWED_PRIORITIES.includes(input.priority)) {
    errors.push('priority ist ungueltig');
  }

  if (input.status && !ALLOWED_STATUS.includes(input.status)) {
    errors.push('status ist ungueltig');
  }

  if (input.dueDate && Number.isNaN(Date.parse(input.dueDate))) {
    errors.push('dueDate ist ungueltig');
  }

  return errors;
}

module.exports = {
  ALLOWED_PRIORITIES,
  ALLOWED_STATUS,
  validateCreateTask,
  validatePatchTask
};
