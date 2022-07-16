const Counter = require('./model')

class CounterService {

  static findOneAndUpdate = ({ field }) => {
    return Counter.findOneAndUpdate(
      {},
      { $inc: { [field]: 1 } },
      { upsert: true }
    )
  }

	/**
   * 
   */
}

module.exports = CounterService;
