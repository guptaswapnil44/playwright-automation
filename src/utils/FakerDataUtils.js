const { faker } = require('@faker-js/faker');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

// Function to generate fake user data
const generateUserData = () => {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    phone: faker.phone.number(),
    age: faker.number.int({ min: 18, max: 99 }),
    address: faker.location.country(),
  };
};

// Function to generate an array of fake user data
const generateTestData = (numRecords) => {
  const testData = faker.helpers.multiple(generateUserData, { count: numRecords });
  return testData;
};

const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "..");

// Change to 'testdata' folder
const testdataDir = path.resolve(srcDir, "testdata");

// Function to export data to JSON file
const exportToJson = (data, fileName) => {
  fs.writeFileSync(`${testdataDir}//${fileName}`, JSON.stringify(data, null, 2));
  console.log(`Data exported to JSON file: ${testdataDir}//${fileName}`);
};

// Function to export data to CSV file
const exportToCsv = (data, fileName) => {
  const csvWriter = createCsvWriter({
    path: `${testdataDir}//${fileName}`,
    header: [
      { id: 'name', title: 'Name' },
      { id: 'email', title: 'Email' },
      { id: 'username', title: 'Username' },
      { id: 'phone', title: 'Phone' },
      { id: 'age', title: 'Age' },
      { id: 'address', title: 'Address' },
    ],
  });

  csvWriter.writeRecords(data).then(() => {
    console.log(`Data exported to CSV file: ${testdataDir}//${fileName}`);
  });
};

module.exports = { generateTestData, exportToJson, exportToCsv };

// Example usage
// const testData = generateTestData(3);
// exportToJson(testData, 'testData_en.json');
// exportToCsv(testData, 'testData_en.csv');
