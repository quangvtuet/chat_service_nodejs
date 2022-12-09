import { mongoose } from "mongoose";

mongoose.set("strictQuery", false);

const databaseConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb database connect....");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default databaseConnect;