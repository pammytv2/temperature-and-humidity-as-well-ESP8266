const connection = require("../config/datebase");

const Data = {
  // ดึงทั้งหมด
  getAll: (callback) => {
    const sql = `
      SELECT * FROM sensor_data ORDER BY created_at DESC;

    `;
    connection.query(sql, callback);
  },

  // ดึงตาม ID
getById: (id, callback) => {
  const sql = `
    SELECT * FROM sensor_data
    WHERE id = ?
  `;
  connection.query(sql, [id], callback);
},

  create: (data, callback) => {
  const sql = `INSERT INTO sensor_data (temperature, humidity) VALUES (?, ?)`;
  const { temperature, humidity } = data;
  connection.query(sql, [temperature, humidity], callback);
},


  // อัปเดตข้อมูล
  update: (id, data, callback) => {
    const sql = `
      UPDATE sensor_data
      SET temperature = ?, humidity = ?
      WHERE id = ?
    `;
    const { temperature, humidity } = data;
    connection.query(sql, [temperature, humidity,id], callback);
  },

  // ลบ
  delete: (id, callback) => {
    const sql = `
      DELETE FROM sensor_data
      WHERE id = ?
    `;
    connection.query(sql, [id], callback);
  },
};

module.exports = Data;
