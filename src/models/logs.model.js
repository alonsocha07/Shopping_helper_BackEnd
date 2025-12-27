import mongoose from "mongoose";

const logsSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
      enum: ["error", "warn", "info", "fatal"],
      default: "error"
    },

    name: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    stack: {
      type: String,
      required: true
    },

    method: {
      type: String
    },

    url: {
      type: String,
      required: true
    },

    statusCode: {
      type: Number
    },

    ip: {
      type: String
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    isGuest: {
      type: Boolean,
      default: true
    },

    service: {
      type: String,
      default: "api"
    },

    environment: {
      type: String,
      enum: ["development", "staging", "production"],
      default: "development"
    },

    metadata: {
      params: Object,
      query: Object,
      body: Object,
      headers: Object
    }
  },
  {
    timestamps: true
  }
);

// TTL Index (7 days)
logsSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 7 }
);

export default mongoose.model("logs", logsSchema);
