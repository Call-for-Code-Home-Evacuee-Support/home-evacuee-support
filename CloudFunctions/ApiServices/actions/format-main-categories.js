const md5 = require('spark-md5');

function main(params) {
  return {
    mainCategories: params.rows.map((row) => { return {
      _id: row.doc._id,
      _rev: row.doc._rev,
      name: row.doc.name
    }})
  };
}
