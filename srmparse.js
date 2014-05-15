module.exports = function(config) {
	var mappings = config.mappings;
	var parser = config.parser;
	var separator = config.separator;

	if (parser === 'fixedSizes' && mappings && mappings instanceof Array) {
		var start = 0;
		var mappingLength = mappings.length;
		for (var j = 0; j < mappingLength; j++) {
			mappings[j].start = start;
			start += mappings[j].size;
		}
	}

	function isNumNotEmpty(str) {
		return !isNaN(str) && str !== "";
	}

	function interpretData(dataType, data) {
		var parsedData;
		if (dataType === "int" && isNumNotEmpty(data)) {
			parsedData = parseInt(data, 10);
		} else if (dataType === "float" && isNumNotEmpty(data)) {
			parsedData = parseFloat(data, 10);
		} else if (dataType === "str") {
			parsedData = data;
		}

		return parsedData;
	}

	function parseSymbolSeparated(data) {
		var parsed = {};
		if (mappings && mappings instanceof Array) {

			var dataArray = typeof data == "string" ? data.split(separator) : [];

			var mappingLength = mappings.length;
			for (var i = 0; i < mappingLength; i++) {
				if (typeof dataArray[i] !== "undefined") {
					parsed[mappings[i].name] = interpretData(mappings[i].type, dataArray[i]);
				}
			}
		}
		return parsed;
	}

	function parseFixedSizes(data) {
		var parsed = {};
		if (mappings && mappings instanceof Array && typeof data == "string") {
			for (var i = 0; i < mappingLength; i++) {
				if (mappings[i].start < data.length) {
					var dataPart = data.substring(mappings[i].start, mappings[i].start + mappings[i].size);
					dataPart = dataPart.trim();
					parsed[mappings[i].name] = interpretData(mappings[i].type, dataPart);
				}
			}
		}
		return parsed;
	}

	return {
		parse: function( data ) {
			if (parser === 'symbolSeparated') {
				return parseSymbolSeparated(data);
			} else if (parser === 'fixedSizes') {
				return parseFixedSizes(data);
			}

			//default
			return {};
		}
	};
};