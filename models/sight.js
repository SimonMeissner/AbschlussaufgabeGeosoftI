var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//var SightSchema = new Schema(
//  {
//    name: {type: String, required: true, maxLength: 100},
//    link: {type: String, required: true, maxLength: 100},
//    description: {type: String, required: true, maxLength: 500},
//    geojson: mongoose.Schema.Types.FeatureCollection,
//  }
//);

var PolygonSchema = new Schema(
  {
    _id: false,
    type: {
      type: String,
      required: true,
      enum: ['Polygon']
    },
    coordinates: {
      type: [[[Number]]], //Array of arrays of arrays of numbers
      required: true
    }
  }
);

var SightSchema = new Schema(
  {
    type: {type: String, required: true, enum: ['FeatureCollection']
    },
    features: [
      {
        _id: false,
        type: {type: String, required: true, enum: ['Feature']
        },
        properties: {
          name: {type: String, required: [true, 'Please add a Sightname'], unique: true, maxLength: 100},
          link: {type: String, required: [true, 'Please add a Sightlink'], maxLength: 100},
          description: {type: String, default: 'not available' , maxLength: 500}
        },
        geometry: PolygonSchema
      }
    ]
  }
);



//Export model
module.exports = mongoose.model('Sight', SightSchema);
