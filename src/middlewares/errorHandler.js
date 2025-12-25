import { logErrorToMongo } from "../utils/logErrorToMongo.js";

export const errorHandler = async (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const clientMessage =
    statusCode >= 500
      ? "Something went wrong. Please try again later."
      : err.message;

  try {
    await logErrorToMongo(err, req);
  } catch (logErr) {
    console.error('Error while logging to Mongo (er rorHandler):', logErr);
  }

  return res.status(statusCode).json({
    success: false,
    errorMessage: clientMessage
  });
};