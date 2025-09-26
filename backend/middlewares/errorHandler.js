function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const status = typeof error.code === "number" ? error.code : 500;

  res.status(error.code || 500).json({
    message: error.message || "Une erreur inconnue est survenue !",
    details: error.details || null,
  });
}

export default errorHandler;
