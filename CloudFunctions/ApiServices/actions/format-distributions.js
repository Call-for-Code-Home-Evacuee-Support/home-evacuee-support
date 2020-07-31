const md5 = require('spark-md5');

function main(params) {
  return {
    distributions: params.rows.map((row) => { return {
      _id: row.doc._id,
      _rev: row.doc._rev,
      date: row.doc.date,
      userId: row.doc.userId,
      supplyId: row.doc.supplyId,
      num: row.doc.num,
      status: row.doc.status,
      timeslotId: row.doc.timeslotId,
      shelterId: row.doc.shelterId
    }})
  };
}

