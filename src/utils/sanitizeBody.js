export const sanitizeBody = (body) => {
  if (!body) return null;

  const clone = { ...body };
  const forbiddenFields = ["password", "token", "authorization"];

  forbiddenFields.forEach(field => {
    if (clone[field]) clone[field] = "***";
  });

  return clone;
};