# node-xml-demo
node read and build xml

## xml file
```
<note count="1">
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
</note>
```

## read and build xml
```
var xml2js = require('xml2js');
var fs = require('fs');
const bluebird = require('bluebird');

var parser = new xml2js.Parser();//用于解析xml为json对象
var builder = new xml2js.Builder();//用于把json对象解析为xml
bluebird.promisifyAll(parser);

async function test(){
    // 读取
    const data = await fs.readFileSync( './demo.xml');

    // 转换成Json
    const result = await parser.parseStringAsync(data);
    console.dir(result);

    // 更新内容
    result.note.$.count = 2;
    result.note.to[0] = 'update';
    console.dir(result);

    //输出xml
    var outxml = builder.buildObject(result); 
    console.log(`outxml.toString() ${outxml.toString()}`);
}
test();
```