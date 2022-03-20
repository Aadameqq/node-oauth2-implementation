import mongoose from "mongoose";

const schema = new mongoose.Schema({
  code: {
    type: String,
  },
  clientId: {
    type: String,
  },
  resourceOwnerId: {
    type: String,
  },
  permissions: {
    type: [String],
  },
});
const AuthCode = mongoose.model("AuthCode", schema);

export default AuthCode;
