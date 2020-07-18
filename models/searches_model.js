const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const searchesSchema = new Schema({
    twitterId: { type: String, trim: true, required: true },
    searchDetails: {
        q: {type: String},
        result_type: {type: string},
        count: {type: Number},
        geocode: {type: String},
        language:  {type: String}
    }
},{
  timestamps: true,
  collection: 'users'
});

module.exports = mongoose.model("user", userSchema)
