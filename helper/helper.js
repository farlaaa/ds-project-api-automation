const fs = require('fs');

function readJsonSchema(schemaName) {
  const schemaPath = `resource/schema/${schemaName}`;
  try {
    return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  } catch (error) {
    console.error(`JSON Schema - Parsing Error'${schemaName}':`, error);
    return null;
  }
}

module.exports = readJsonSchema;