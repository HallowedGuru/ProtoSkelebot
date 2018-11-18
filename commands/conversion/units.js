const commando = require('discord.js-commando');

class UnitsCommand extends commando.Command {
  constructor(client) {
    super(client,{
      name: 'units',
      group: 'conversion',
      memberName: 'units',
      description: 'Provides a detailed list of valid units and formats for those units.'
    });
  }

  async run(message, args) {
    message.channel.send({"embed": {
      "title": "Valid Units",
      "description": "Below is a list of valid units for the convert command.",
      "color": 16777215,
      "fields": [
          {
            "name": "__Distance__",
            "value": "-**Millimeters:** Can be written as mm, millimeter, or millimeters\n-**Centimeters:** Can be written as cm, centimeter, or centimeters\n-**Meters:** Can be written as m, meter, or meters\n-**Kilometers:** Can be written as km, kilometer, or kilometers\n**-Inches:** Can be written as in, inch, or inches\n-**Feet:** Can be written as ft, foot, or feet\n-**Miles:** Can be written as mi, mile, or miles"
          },
          {
            "name": "__Velocity__",
            "value": "-**Kilometers Per Hour:** Can be written as km/h, kmph, kilometer per hour, or kilometers per hour\n-**Miles Per Hour:** Can be written as mi/h, mph, miph, mile per hour, or miles per hour\n-**Knots:** Can be written as kt, knot, or knots"
          },
          {
            "name": "__Weight__",
            "value": "-**Kilograms:** Can be written as kg, kilogram, or kilograms\n-**Grams:** Can be written as g, gram, or grams\n-**Pounds:** Can be written as lb, lbs, pound, or pounds"
          },
          {
            "name":"__Volume__",
            "value":"-**Gallons:** Can be written as gl, gallon, or gallons\n-**Liters:** Can be written as l, liter, liters, litre, or litres"
          },
          {
            "name": "__Temperature__",
            "value": "-**Celsius:** Can be written as c, celsius, or centigrade\n-**Fahrenheit:** Can be written as f or fahrenheit\n-**Kelvin:** Can be written as k or kelvin"
          },
          {
            "name": "Note:",
            "value": "Units provided to the 'convert' command are *not* case sensitive. They can be all caps, all lower case, or any combination."
          }
        ]
      }
    });
  }
}

module.exports = UnitsCommand;
