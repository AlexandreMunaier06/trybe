const camelize = require('camelize');
const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
} = require('../utils/generateFormattedQuery');

const connection = require('./connection');

const findAll = async () => {
  const [passengers] = await connection.execute(
    'SELECT * FROM passengers',
  );
  return camelize(passengers);
};

const findById = async (passengerId) => {
  const [[passenger]] = await connection.execute(
    'SELECT * FROM passengers WHERE id = ?',
    [passengerId],
  );
  return camelize(passenger);
};

const insert = async (passenger) => {
  const columns = getFormattedColumnNames(passenger);
  const placeholders = getFormattedPlaceholders(passenger);
  const query = `INSERT INTO passengers (${columns}) VALUE (${placeholders})`;
  const [{ insertId }] = await connection.execute(query, [...Object.values(passenger)]);

  return insertId;
};

const update = async (passengerId, dataToUpdate) => {
  const formattedColumns = getFormattedUpdateColumns(dataToUpdate);
  const query = `UPDATE passengers SET ${formattedColumns} WHERE id = ?`;
  return connection.execute(query, [...Object.values(dataToUpdate), passengerId]);
};

const remove = async (passengerId) => {
  await connection.execute(
    'DELE FROM passengers WHERE id = ?',
    [passengerId],
  );
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove
};