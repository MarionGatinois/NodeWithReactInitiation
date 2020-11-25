//mongoose model class
const mongoose = require ('mongoose');
//const Schema = mongoose.Schema; remplacé par :
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  //name: String
  credits: { type: Number, default:0 }
});
//new collection :
//not remove if exist , just create if not exist
mongoose.model('users',userSchema);
