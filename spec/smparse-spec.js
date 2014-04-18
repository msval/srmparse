var srmparse = require("../srmparse");

var configSymbolComma = {
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

var configSymbolPipe = {
	parser : 'symbolseparated',
	separator : '|',
	mappings : configSymbolComma.mappings
};

var translatorComma = srmparse(configSymbolComma);
var translatorPipe = srmparse(configSymbolPipe);

describe("test data parsing regular", function () {
	it("should return parsed values", function () {
		var inData = "20.66,35,66";
		var outData = translatorComma.parse(inData);
		expect(outData.temperature).toBe(20.66);
		expect(outData.lightLevel).toBe(35);
		expect(outData.soilHumidity).toBe(66);

		inData = "20.66|35|66";
		outData = translatorPipe.parse(inData);
		expect(outData.temperature).toBe(20.66);
		expect(outData.lightLevel).toBe(35);
		expect(outData.soilHumidity).toBe(66);
	});
});

describe("test data parsing just first", function () {
	it("should return first value", function () {
		var inData = "22.11";
		var outData = translatorComma.parse(inData);
		expect(outData.temperature).toBe(22.11);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(undefined);

		inData = "22.11";
		outData = translatorPipe.parse(inData);
		expect(outData.temperature).toBe(22.11);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(undefined);
	});
});

describe("test data parsing just last", function () {
	it("should return parsed values", function () {
		var inData = ",,11";
		var outData = translatorComma.parse(inData);
		expect(outData.temperature).toBe(undefined);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(11);

		inData = "||11";
		outData = translatorPipe.parse(inData);
		expect(outData.temperature).toBe(undefined);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(11);
	});
});

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

var translatorFixed = srmparse(configFixedSize);

describe("parsing fixed sizes entries regular", function () {
	it("should parse fixed size entries", function () {
		var inData = "20.663566";
		var outData = translatorFixed.parse(inData);

		expect(outData.temperature).toBe(20.66);
		expect(outData.lightLevel).toBe(35);
		expect(outData.soilHumidity).toBe(66);
	});
});

describe("test data parsing just first", function () {
	it("should return first value", function () {
		var inData = "22.11";
		var outData = translatorFixed.parse(inData);

		expect(outData.temperature).toBe(22.11);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(undefined);
	});
});

describe("test data parsing just last", function () {
	it("should return parsed values", function () {
		var inData = "       11";
		var outData = translatorFixed.parse(inData);
		expect(outData.temperature).toBe(undefined);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(11);
	});
});