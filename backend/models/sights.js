const mongoose = require("mongoose");

const sightsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Látványosság neve"],
  },
  description: {
    type: String,
    required: [true, "Látványosság leírása"],
  },
  category: {
    type: String,
    required: [true, "Kategória"],
  },
  tags: {
    type: String,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      sightId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  adminId: {
    type: String,
    required: true,
  },
  admin: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Sights", sightsSchema);
