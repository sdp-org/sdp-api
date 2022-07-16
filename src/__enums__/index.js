/**
 * -------- PERMISSIONS -------- 
 * 
 */
const ADMIN = 'ADMIN';
const OPERATOR = 'OPERATOR';
const READ = 'READ';
const WRITE = 'WRITE';
const PERMISSIONS_SELECT = [
  { key: ADMIN, name: 'Administrador' },
  { key: OPERATOR, name: 'Operador' },
  { key: READ, name: 'Lectura' },
  { key: WRITE, name: 'Escritura' },
];
module.exports.PERMISSIONS = [ ADMIN, OPERATOR, READ, WRITE ];
module.exports.PERMISSIONS_SELECT = PERMISSIONS_SELECT;
module.exports.PERMISSIONS_DEFAULT = [ OPERATOR ];

/**
 * ---------- STATUS -----------
 * 
 */
const NOT_STARTED = 'NOT_STARTED';
const IN_PROGRESS = 'IN_PROGRESS';
const PAUSED = 'PAUSED';
const FINISHED = 'FINISHED';
const STATUS_SELECT = [
  { key: NOT_STARTED, name: 'No comenzada' },
  { key: IN_PROGRESS, name: 'En progreso' },
  { key: PAUSED, name: 'Pausada' },
  { key: FINISHED, name: 'Finalizada' },
];
module.exports.FINISHED = FINISHED;
module.exports.STATUS = [ NOT_STARTED, PAUSED, IN_PROGRESS, FINISHED ];
module.exports.STATUS_SELECT = STATUS_SELECT;
module.exports.STATUS_DEFAULT = NOT_STARTED;