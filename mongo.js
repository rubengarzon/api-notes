const moongose = require("mongoose");
const connectionString =
  "mongodb+srv://rujex:diObWNg9qXMUloyW@cluster0.dd9ksdx.mongodb.net/dev?retryWrites=true&w=majority";

//conexion a mongodb
moongose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error connecting to mongodb: ", error);
  })
  .finally(() => {
    console.log("finally");
  });
