const TaskHistoryModel = require('./model');

class TaskHistoryService {

  /**
   * Find
   * @param {Task} task
   * @returns {Record}
   */
  static async find(query) {
    return TaskHistoryModel.find(query)
  }
  /**
   * Create Record
   * @param {Task} task
   * @returns {Record}
   */
	static async createRecord({ task }) {
    const newRecordInfo = { 
      task: task._id,
      taskType: task.taskType,
      name: task.name,
      quantity: task.quantity,
      status: task.status,
      done: task.done,
      comments: task.comments,
      responsible: task.responsible,
      timeused: task.timeused,
    }
		const newRecord = new TaskHistoryModel(newRecordInfo)
		return newRecord
			.save()
			.then(result => result)
			.catch(err => { throw err });
	}

	/**
   * 
   */
}

module.exports = TaskHistoryService;
