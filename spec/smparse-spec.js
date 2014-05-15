var srmparse = require("../srmparse");

var configSymbolComma = {
	parser : 'symbolSeparated',
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
		},
		{
			name: 'id',
			type: 'str'
		}
	]
};

var configSymbolPipe = {
	parser : 'symbolSeparated',
	separator : '|',
	mappings : configSymbolComma.mappings
};

var translatorComma = srmparse(configSymbolComma);
var translatorPipe = srmparse(configSymbolPipe);

describe("test data parsing regular", function () {
	it("should return parsed values", function () {
		var inData = "20.66,35,66,A";
		var outData = translatorComma.parse(inData);
		expect(outData.temperature).toBe(20.66);
		expect(outData.lightLevel).toBe(35);
		expect(outData.soilHumidity).toBe(66);
		expect(outData.id).toBe("A");

		inData = "20.66|35|66|B";
		outData = translatorPipe.parse(inData);
		expect(outData.temperature).toBe(20.66);
		expect(outData.lightLevel).toBe(35);
		expect(outData.soilHumidity).toBe(66);
		expect(outData.id).toBe("B");
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
		expect(outData.id).toBe(undefined);
	});
});

describe("test data parsing just last", function () {
	it("should return parsed values", function () {
		var inData = ",,,A";
		var outData = translatorComma.parse(inData);
		expect(outData.temperature).toBe(undefined);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(undefined);
		expect(outData.id).toBe("A");

		inData = "|||B";
		outData = translatorPipe.parse(inData);
		expect(outData.temperature).toBe(undefined);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(undefined);
		expect(outData.id).toBe("B");
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
		},
		{
			name: 'id',
			size: 1,
			type: 'str'
		}
	]
};

var translatorFixed = srmparse(configFixedSize);

describe("parsing fixed sizes entries regular", function () {
	it("should parse fixed size entries", function () {
		var inData = "20.663566A";
		var outData = translatorFixed.parse(inData);

		expect(outData.temperature).toBe(20.66);
		expect(outData.lightLevel).toBe(35);
		expect(outData.soilHumidity).toBe(66);
		expect(outData.id).toBe("A");
	});
});

describe("test data parsing just first", function () {
	it("should return first value", function () {
		var inData = "22.11";
		var outData = translatorFixed.parse(inData);

		expect(outData.temperature).toBe(22.11);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(undefined);
		expect(outData.id).toBe(undefined);
	});
});

describe("test data parsing just last", function () {
	it("should return parsed values", function () {
		var inData = "         A";
		var outData = translatorFixed.parse(inData);
		expect(outData.temperature).toBe(undefined);
		expect(outData.lightLevel).toBe(undefined);
		expect(outData.soilHumidity).toBe(undefined);
		expect(outData.id).toBe("A");
	});
});