var srmparse = require("../srmparse");

var config = {
	parser : 'commaseparated',
	mappings: [
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

var translator = srmparse(config);

describe("test data parsing regular", function () {
	it("should return parsed values", function () {
		var inData = "20.66,35,66";
		var outData = translator.parse(inData);

		expect(outData.temperature).toBe(20.66);
		expect(outData.lightLevel).toBe(35);
		expect(outData.soilHumidity).toBe(66);
	});
});

describe("test data parsing just first", function () {
	it("should return parsed values", function () {
		var inData = "22.11";
		var outData = translator.parse(inData);

		expect(outData.temperature).toBe(22.11);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(undefined);
	});
});

describe("test data parsing just last", function () {
	it("should return parsed values", function () {
		var inData = ",,11";
		var outData = translator.parse(inData);
		
		expect(outData.temperature).toBe(undefined);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(11);
	});
});