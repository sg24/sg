const runSerial = (arrayOfPromises) => {
    var results = [];
    return arrayOfPromises.reduce(function(seriesPromise, promise) {
      return seriesPromise.then(function() {
        return promise
        .then(function(result) {
          results.push(result);
        });
      });
    }, Promise.resolve())
    .then(function() {
      return results;
    });
  };

module.exports = runSerial