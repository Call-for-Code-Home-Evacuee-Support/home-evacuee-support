const md5 = require('spark-md5');

function main(params) {
  return {
    users: params.rows.map((row) => { return {
      _id: row.doc._id,
      _rev: row.doc._rev,
      name: row.doc.name,
      email: row.doc.email,
      phone: row.doc.phone,
      zipcode: row.doc.zipcode,
      family: row.doc.family,
      latlng: row.doc.latlng,
      shelterId: row.doc.shelterId,
      way: row.doc.way
    }})
  };
}