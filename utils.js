const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');

const usersFilePath = path.join(__dirname, 'Data', 'users.json');

function getUsers() {
  const rawData = fs.readFileSync(usersFilePath);
  const users = JSON.parse(rawData);

  // Attribue un id unique à chaque utilisateur
  users.forEach((user, index) => {
    if (!user.id) {
      user.id = uuidv4();
    }
  });

  return users;
}

function saveUsers(users) {
  const rawData = JSON.stringify(users, null, 2);
  fs.writeFileSync(usersFilePath, rawData);
}

function formatBirth(birth) {
  return dayjs(birth).format('DD/MM/YYYY');
}

module.exports = { getUsers, saveUsers, formatBirth };