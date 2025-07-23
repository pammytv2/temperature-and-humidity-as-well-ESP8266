const Data = require('../models/sensor_data');

exports.getAll = (req, res) => {
  Data.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  Data.getById(id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

exports.create = (req, res) => {
  const { temperature, humidity } = req.body;
  Data.create({ temperature, humidity }, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, temperature, humidity });
    res.json({status: 'ok'});
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { temperature, humidity } = req.body;
  Data.update(id, { temperature, humidity }, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Updated successfully' });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Data.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted successfully' });
  });
};
