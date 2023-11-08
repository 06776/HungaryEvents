const mongoose = require("mongoose");

const communityProgramsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Esemény neve"],
  },
  description: {
    type: String,
    required: [true, "Esemény leírása"],
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
      programId: {
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

module.exports = mongoose.model("CommunityPrograms", communityProgramsSchema);
