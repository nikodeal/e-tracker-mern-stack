const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const excersizeSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Excersize = mongoose.model("Excersize", excersizeSchema);
module.exports = Excersize;
