var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SightSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
    weburl: {type: String, required: true, maxLength: 100},
    description: {type: String, required: true, maxLength: 500},
    geojson: mongoose.Schema.Types.FeatureCollection,
  }
);

//Export model
module.exports = mongoose.model('Sight', SightSchema);
