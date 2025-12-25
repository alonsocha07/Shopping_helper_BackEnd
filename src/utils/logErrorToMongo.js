import logs from "../models/logs.model.js";
import { sanitizeBody } from "../utils/sanitizeBody.js";

/**
 * Log an error document to MongoDB. This function is intentionally resilient:
 * - It never throws (caller should guard if it needs to).
 * - It does not send any HTTP response. The error handler middleware is
 *   responsible for sending the response to the client.
 *
 * @param {Error} err
 * @param {import('express').Request} req
 */
export const logErrorToMongo = async (err, req) => {
  try {
    // Best-effort: sanitize request body before saving
    await logs.create({
      level: "error",
      name: err?.name,
      message: err?.message,
      stack: err?.stack,

      method: req?.method,
      url: req?.originalUrl,
      statusCode: err?.statusCode || 500,
      ip: req?.ip,

      userId: req?.user?.id || null,
      isGuest: !req?.user,

      service: "api",
      environment: process.env.NODE_ENV,

      metadata: {
        params: req?.params,
        query: req?.query,
        body: sanitizeBody(req?.body),
        headers: {
          userAgent: req?.headers?.["user-agent"]
        }
      }
    });
  } catch (logError) {

    try {
      console.error("Failed to save error log:", logError);
    } catch (consoleErr) {
      // Console may fail in extremely rare environments; ignore to be safe.
    }
  }
};