const moongose = require("mongoose");

//crear esquema de mongodb para la coleccion notes
const noteSchema = new moongose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  important: {
    type: Boolean,
    required: true,
  },
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//crear modelo de mongodb para la coleccion notes
const Note = moongose.model("Note", noteSchema);

/*

// buscar todas las notas
const getAllNotes = async () => {
  const notes = await Note.find({});
  return notes;
};

getAllNotes()
  .then((notes) => {
    console.log(notes);
    mongoose.disconnect();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });



//crear una nueva nota
const note = new Note({
  content: "HTML is easy",
  important: true,
});

//guardar la nota en la base de datos
note
  .save()
  .then((result) => {
    console.log(result);
    moongose.disconnect();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });
*/

//exportar el modelo para usarlo en otros archivos
module.exports = Note;
