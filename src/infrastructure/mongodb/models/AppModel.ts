import mongoose from "mongoose";

const schema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  ownerId: {
    type: String,
  },
  permissions: {
    type: [String],
  },
  redirectUri: {
    type: String,
  },
  secret: {
    type: String,
  },
});
const App = mongoose.model("App", schema);

export default App;
