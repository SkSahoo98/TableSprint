const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    videoName: {
      type: String,
      required: true,
      trim: true,
    },
    couseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    videoUrl: {
      480: {
        type: String,
        required: true,
      },
      720: {
        type: String,
        required: true,
      },
      1080: {
        type: String,
        required: true,
      },
    },
    videoDescription: {
      type: String,
      required: true,
      trim: true,
    },
    videoStatus: {
      type: String,
    },
    videoDuration: {
      type: String,
    },
  },
  { timestamps: true }
);

const Video = new mongoose.model("Video", videoSchema);

module.exports = Video;
