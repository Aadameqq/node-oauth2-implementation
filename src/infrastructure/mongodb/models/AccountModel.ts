import mongoose from "mongoose";

const schema = new mongoose.Schema({
  id: {
    type: String,
  },
  nickname: {
    type: String,
  },
  password: {
    type: String,
  },
  mail: {
    type: String,
  },
});
const Account = mongoose.model("Account", schema);

export default Account;
