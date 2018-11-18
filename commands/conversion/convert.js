const commando = require('discord.js-commando');

class ConvertCommand extends commando.Command {
	constructor(client) {
		super(client,{
			name: 'convert',
			group: 'conversion',
			memberName: 'convert',
			description: 'Converts the provided value from one unit to another. (Use the "$units" command to see a detailed list of valid units and formats for those units).',
			format: '[value] [starting unit] to [result unit]',
			examples: ['$convert 25 meters to feet', '$convert 100 mph to km/h', '$convert 30C to F']
		});
	}

	async run(message, args) {
		try {
			var values = args.split(" to ");
			var checked = checkConversionInput(values);
			message.channel.send("Converting " +  checked[0] + " " + checked[1].toLowerCase() + " to " + checked[2].toLowerCase() + "...");
			var converted = unitConvert(checked[0], checked[1], checked[2]);
			if (converted === false) {
				message.channel.send("Not a valid conversion");
			}
			else {
				message.channel.send(checked[0] + " " + checked[1].toLowerCase() + " is " + converted + " " + checked[2].toLowerCase());
			}
		} catch (ex) {
			message.channel.send("Not a valid conversion");
		}
	}
}

//Checks input provided to the convert command to assure that it is valid and properly formatted, and then separates the value, the unit to convert from,
//and the unit to convert to into individual variables
function checkConversionInput(valuesToCheck) {
	if (valuesToCheck.length == 2) {
		if (((valuesToCheck[0].match(/^\d/) || valuesToCheck[0].charAt(0) === "-" || valuesToCheck[0].includes(".")) && valuesToCheck[0].charAt(valuesToCheck[0].length-1).match(/\w/)) && 
			(valuesToCheck[1].charAt(valuesToCheck[1].length-1).match(/\w/))) {
			var fromUnit = checkUnit(valuesToCheck[0].replace(/\d+/g, '').replace(/\-+/g, '').replace(/\.+/g, '').replace(/\s+/g, '').toUpperCase());
			var toUnit = checkUnit(valuesToCheck[1].toUpperCase());
			var value  = valuesToCheck[0].replace(/[a-zA-Z]+/g, '').replace(/(\/)+/g, '').replace(/\s+/g, '');
			var set = [value, fromUnit, toUnit];
			return set;
		}
		else {
			return "F";
		}
	}
	else {
		return "V";
	}
}

//Checks the units provided to assure they are valid
function checkUnit(unitToCheck) {
	var validUnitTypes = new Map();
	validUnitTypes.set("METERS", ["M", "METER", "METERS"]);
	validUnitTypes.set("MILLIMETERS", ["MM", "MILLIMETER", "MILLIMETERS"]);
	validUnitTypes.set("CENTIMETERS", ["CM", "CENTIMETER", "CENTIMETERS"]);
	validUnitTypes.set("KILOMETERS", ["KM", "KILOMETER", "KILOMETERS"]);
	validUnitTypes.set("LITERS", ["L", "LITER", "LITERS"]);
	validUnitTypes.set("MILLILITERS", ["ML", "MILLILITER", "MILLILITERS"]);
	validUnitTypes.set("INCHES", ["IN", "INCH", "INCHES"]);
	validUnitTypes.set("FEET", ["FT", "FOOT", "FEET"]);
	validUnitTypes.set("MILES", ["MI", "MILE", "MILES"]);
	validUnitTypes.set("GALLONS", ["GL", "GALLON", "GALLONS"]);
	validUnitTypes.set("LITERS", ["L", "LITER", "LITERS", "LITRE", "LITRES"]);
	validUnitTypes.set("FAHRENHEIT", ["F", "FAHRENHEIT"]);
	validUnitTypes.set("CELSIUS", ["C", "CELSIUS", "CENTIGRADE"]);
	validUnitTypes.set("KELVIN", ["K", "KELVIN"]);
	validUnitTypes.set("KILOGRAMS", ["KG", "KILOGRAM", "KILOGRAMS"]);
	validUnitTypes.set("GRAMS", ["G", "GRAM", "GRAMS"]);
	validUnitTypes.set("POUNDS", ["LB", "LBS", "POUND", "POUNDS"]);
	validUnitTypes.set("KILOMETERS PER HOUR", ["KM/H", "KMPH", "KILOMETER PER HOUR", "KILOMETERS PER HOUR"]);
	validUnitTypes.set("MILES PER HOUR", ["MI/H", "MPH", "MIPH", "MILE PER HOUR", "MILES PER HOUR"]);
	validUnitTypes.set("KNOTS", ["KN", "KNOT", "KNOTS"]);
	
	var valid = false;
	for (var unitType of validUnitTypes.values()) {
		for (const unit of unitType) {
			if (unitToCheck === unit) {
				valid = true;
				return getKeyByValue(validUnitTypes, unitType);
			}
		}
	}
	if (valid = false) {
		return "Unit not recognized";
	}
}
	

//Performs conversion of the provided value from the fromUnit to the toUnit
function unitConvert(value, fromUnit, toUnit) {
	var valid = true;
	var converted = parseFloat(value);
	switch(fromUnit) {
		case "METERS":
			switch (toUnit) {
				case "MILLIMETERS":
					converted *= 1000;
					break;
				case "CENTIMETERS":
					converted *= 100;
					break;
				case "KILOMETERS":
					converted *= .001;
					break;
				case "INCHES":
					converted *= 39.37007874;
					break;
				case "FEET":
					converted *= 3.2808;
					break;
				case "MILES":
					converted *= 0.000621371;
					break;
				default:
					valid = false;
			}
			break;
		case "MILLIMETERS":
			switch (toUnit) {
				case "METERS":
					converted *= 0.001;
					break;
				case "CENTIMETERS":
					converted *= 0.01;
					break;
				case "KILOMETERS":
					converted *= 0.000001;
					break;
				case "INCHES":
					converted *= 0.03937007874;
					break;
				case "FEET":
					converted *= 0.0032808;
					break;
				case "MILES":
					converted *= 0.0000000621371;
					break;
				default:
					valid = false;
			}
			break;
		case "CENTIMETERS":
			switch (toUnit) {
				case "METERS":
					converted *= 0.01;
					break;
				case "MILLIMETERS":
					converted *= 10;
					break;
				case "KILOMETERS":
					converted *= 0.00001;
					break;
				case "INCHES":
					converted *= 0.393701;
					break;
				case "FEET":
					converted *= 0.032808;
					break;
				case "MILES":
					converted *= 0.000000621371;
					break;
				default:
					valid = false;
			}
			break;
		case "KILOMETERS":
			switch(toUnit) {
				case "METERS":
					converted *= 1000;
					break;
				case "MILLIMETERS":
					converted *= 1000000;
					break;
				case "INCHES":
					converted *= 37370.1;
					break;
				case "FEET":
					converted *= 3280.84;
					break;
				case "MILES":
					converted *= 0.621371;
					break;
				default:
					valid = false;
			}
			break;
		case "INCHES":
			switch(toUnit) {
				case "METERS":
					converted *= 0.0254;
					break;
				case "MILLIMETERS":
					converted *= 25.4;
					break;
				case "CENTIMETERS":
					converted *= 2.54;
					break;
				case "KILOMETERS":
					converted *= 0.0000254;
					break;
				case "FEET":
					converted *= 0.0833333;
					break;
				case "MILES":
					converted *= 0.0000157828;
					break;
				default:
					valid = false;
			}
			break;
		case "FEET":
			switch(toUnit) {
				case "METERS":
					converted *= 0.3048;
					break;
				case "MILLIMETERS":
					converted *= 304.8;
					break;
				case "CENTIMETERS":
					converted *= 30.48;
					break;
				case "KILOMETERS":
					converted *= 0.0003048;
					break;
				case "INCHES":
					converted *= 12;
					break;
				case "MILES":
					converted *= 0.000189394;
					break;
				default:
					valid = false;
			}
			break;
		case "MILES":
			switch(toUnit) {
				case "METERS":
					converted *= 1609.34;
					break;
				case "MILLIMETERS":
					converted *= 1609340;
					break;
				case "CENTIMETERS":
					converted *= 160934
					break;
				case "KILOMETERS":
					converted *= 1.60934;
					break;
				case "INCHES":
					converted *= 63360;
					break;
				case "FEET":
					converted *= 5280;
					break;
				default:
					valid = false;
			}
			break;
		case "GALLONS":
			switch(toUnit) {
				case "LITERS":
					converted *= 3.78541;
					break;
				default:
					valid = false;
			}
			break;
		case "LITERS":
			switch(toUnit) {
				case "GALLONS":
					converted *= 0.264172;
					break;
				default:
					valid = false;
			}
			break;
		case "FAHRENHEIT":
			switch(toUnit) {
				case "CELSIUS":
					if ((converted - 32) != 0) {
						converted = (converted - 32)*(5/9);
					}
					else {
						converted = 0;
					}
					break;
				case "KELVIN":
					converted += 459.67;
					converted *= 0.5555555555;
					break;
				default:
					valid = false;
			}
			break;
		case "CELSIUS":
			switch(toUnit) {
				case "FAHRENHEIT":
					converted = (converted * 1.8) + 32;
					break;
				case "KELVIN":
					converted += 273.15;
					break;
				default:
					valid = false;
			}
			break;
		case "KELVIN":
			switch(toUnit) {
				case "FAHRENHEIT":
					converted = (converted * (5/9)) - 459.67;
					break;
				case "CELSIUS":
					converted -= 273.15;
					break;
				default:
					valid = false;
			}
			break;
		case "KILOGRAMS":
			switch(toUnit) {
				case "GRAMS":
					converted *= 1000;
					break;
				case "POUNDS":
					converted *= 2.20462;
					break;
				default:
					valid = false;
			}
			break;
		case "GRAMS":
			switch(toUnit) {
				case "KILOGRAMS":
					converted *= 0.001;
					break;
				case "POUNDS":
					converted *= 0.00220462;
					break;
				default:
					valid = false;
			}
			break;
		case "POUNDS":
			switch(toUnit) {
				case "GRAMS":
					converted *= 453.592;
					break;
				case "KILOGRAMS":
					converted *= 0.453592;
					break;
				default:
					valid = false;
			}
			break;
		case "KILOMETERS PER HOUR":
			switch(toUnit) {
				case "MILES PER HOUR":
					converted *= 0.621371;
					break;
				case "KNOTS":
					converted *= 0.539957;
					break;
				default:
					valid = false;
			}
			break;
		case "MILES PER HOUR":
			switch(toUnit) {
				case "KILOMETERS PER HOUR":
					converted *= 1.60934;
					break;
				case "KNOTS":
					converted *= 0.868976;
					break;
				default:
					valid = false;
			}
			break;
		case "KNOTS":
			switch(toUnit) {
				case "KILOMETERS PER HOUR":
					converted *= 1.852;
					break;
				case "MILES PER HOUR":
					converted *= 1.15078;
					break;
				default:
					valid = false;
			}
			break;
	}
	if (!valid) {
		return false;
	}
	else { 
		return converted;
	}
}

//Gets the key of a key-value pair from a provided value
function getKeyByValue(object, value) {
	for (var key of object.keys()) {
		if (object.get(key) === value) {
			return key;
		}
	}
}

module.exports = ConvertCommand;
