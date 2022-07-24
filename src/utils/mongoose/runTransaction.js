const mongoose = require('mongoose');

/**
 * Run session
 * @param runner
 * @return {Promise<void>}
 */
async function runTransaction(runner = async function() {}) {
  const session = await mongoose.startSession();

  let runnerResult = undefined;

  await session.withTransaction(async (transactionSession) => {
    runnerResult = await runner(transactionSession);
  });

  session.endSession();
  return runnerResult;
}

module.exports = runTransaction;
