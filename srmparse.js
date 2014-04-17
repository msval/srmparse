module.exports = function( config ) {
	var mappings = config.mappings;
	var parser = config.parser;

	function isNumNotEmpty(str) {
		return !isNaN(str) && str !== "";
	}

	return {
		parse: function( data ) {
			var parsed = {};

			if (parser === 'commaseparated') {
				if (mappings && mappings instanceof Array) {

					var dataArray = typeof data == "string" ? data.split(",") : [];

					var mappingLength = mappings.length;
					for (var i = 0; i < mappingLength; i++) {
						if (typeof dataArray[i] !== "undefined") {
							var parsedData;

							var dataType = mappings[i].type;
							if (dataType === "int" && isNumNotEmpty(dataArray[i])) {
								parsedData = parseInt(dataArray[i], 10);
							} else if (dataType === "float" && isNumNotEmpty(dataArray[i])) {
								parsedData = parseFloat(dataArray[i], 10);
							}

							parsed[mappings[i].name] = parsedData;
						}
					}
				}
			}

			return parsed;
		}
	};
};