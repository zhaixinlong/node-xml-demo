var xml2js = require('xml2js');
var fs = require('fs');
const bluebird = require('bluebird');
const path = require('path');

var parser = new xml2js.Parser(); // convert xml to json
var builder = new xml2js.Builder(); // convert json to xml
bluebird.promisifyAll(parser);

async function test(){
    // read xml file
    const data = await fs.readFileSync(path.resolve(__dirname, 'file/demo.xml'));

    // convert xml to Json
    const result = await parser.parseStringAsync(data);
    console.dir(result);

    // update xml json content
    result.book.$.count = 2;
    result.book.name[0] = 'java';
    result.book.lecture[0].description = 'test';
    console.dir(result);

    // write build xml
    var outxml = builder.buildObject(result); 
    console.log(`outxml.toString() ${outxml.toString()}`);
}
test();