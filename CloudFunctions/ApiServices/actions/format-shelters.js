const md5 = require('spark-md5');

function main(params) {
  return {
    shelters: params.rows.map((row) => { return {
      _id: row.doc._id,
      _rev: row.doc._rev,
      name: row.doc.name,
      email: row.doc.email,
      phone: row.doc.phone,
      zipcode: row.doc.zipcode,
      address: row.doc.address,
      latlng: row.doc.latlng
    }})
  };
}