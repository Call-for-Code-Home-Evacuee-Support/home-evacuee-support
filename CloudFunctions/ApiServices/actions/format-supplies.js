const md5 = require('spark-md5');

function main(params) {
  return {
    supplies: params.rows.map((row) => { return {
      _id: row.doc._id,
      _rev: row.doc._rev,
      name: row.doc.name,
      mainCategoryId: row.doc.mainCategoryId,
      subCategoryId: row.doc.subCategoryId,
      unit: row.doc.unit,
      num: row.doc.num,
      image: row.doc.image,
      description: row.doc.description,
      shelterId: row.doc.shelterId,
      priority: row.doc.priority
    }})
  };
}