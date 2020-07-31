const md5 = require('spark-md5');

function main(params) {
  return {
    timeslots: params.rows.map((row) => { return {
      _id: row.doc._id,
      _rev: row.doc._rev,
      date: row.doc.date,
      startTime: row.doc.startTime,
      endTime: row.doc.endTime,
      shelterId: row.doc.shelterId
    }})
  };
}
