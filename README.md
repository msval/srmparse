Serial message parser
=====================

About
-----

Communication on devices like Arduino and other microcontroller
based devices is usually some sort of string messages with various
delimiting techniques and parsing schemes.

One of the most common ones is using comma separated lists with
each value in the list holding some measurement. For instance string
"20.66,35,66" could mean temperature of 20.66, light level of 35% and
soil humidity of 66%.

Having some utility to parse this data in an easy way and with minimal
configuration would be very time saving. The above mentioned example
string could be parsed with a config like this:

```javascript
var config = {
	parser : 'symbolseparated',
	separator : ',',
	mappings : [
		{
			name: 'temperature',
			type: 'float'
		},
		{
			name: 'lightLevel',
			type: 'int'
		},
		{
			name: 'soilHumidity',
			type: 'int'
		}
	]
};

//fixed size parsing config
var configFixedSize = {
	parser : 'fixedSizes',
	mappings : [
		{
			name: 'temperature',
			size: 5,
			type: 'float'
		},
		{
			name: 'lightLevel',
			size: 2,
			type: 'int'
		},
		{
			name: 'soilHumidity',
			size: 2,
			type: 'int'
		}
	]
};
```

Using
-----

```javascript
var srmparse = require("srmparse");

var config = {}; // one of above configs
var translator = srmparse(config);

var inData = "20.66,35,66";
var outData = translator.parse(inData);

console.log(outData.temperature);

```

Types
-----
	- int
	- float
	- str

Testing
-------

This project uses jasmine-node for testing. It's easy to install:

```bash
npm install jasmine-node -g
```

Running the tests is also straight forward looks like. Jasmine locates
the test js files in the spec folder automatically.

```bash
jasmine-node .
```

