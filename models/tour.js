var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var TourSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
    items: [
      { type: Schema.Types.ObjectId, ref: 'Sight' }
    ]
  }
);

// Virtual for tour's URL
TourSchema
.virtual('url')
.get(function () {
  return '/cityguide/tour/' + this._id;
});

//Export model
module.exports = mongoose.model('Tour', TourSchema);
