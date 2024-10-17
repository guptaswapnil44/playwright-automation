const fs = require('fs');
const path = require('path');

const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map((v) => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => {
          obj[title.trim()] = values[index]?.trim();
          return obj;
        },
        {}
      );
    });
};

// Example usage
const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "..");

// Change to 'testdata' folder
const testdataDir = path.resolve(srcDir, "testdata");

const convertCsvFileToJsonFile = (csvFileName, jsonFileName, delimiter = ',') => {
  try {
    // Read the CSV file
    const csvData = fs.readFileSync(`${testdataDir}//${csvFileName}`, 'utf8');

    // Convert CSV to JSON
    const jsonData = CSVToJSON(csvData, delimiter);

    // Write JSON data to a new file
    fs.writeFileSync(`${testdataDir}//${jsonFileName}`, JSON.stringify(jsonData, null, 2));

    console.log(`Conversion completed. JSON data written to: ${testdataDir}//${jsonFileName}`);
  } catch (error) {
    console.error('Error converting CSV to JSON:', error.message);
  }
};

// Uncomment below line for example usage:
 //convertCsvFileToJsonFile('data.csv', 'output.json');

 module.exports = convertCsvFileToJsonFile;
