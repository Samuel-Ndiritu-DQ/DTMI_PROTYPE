const contentTypes = require('./src/data/contentTypes.js');
const defaultType = contentTypes.getContentType('default');
console.log('getContentType("default"):');
console.log('  id:', defaultType.id);
console.log('  name:', defaultType.name);
console.log('  category:', defaultType.category);
console.log('  color:', defaultType.color);