exports.successResponse = (
  res,
  message,
  data = null,
  status = 200
) => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(status).json(response);
};

exports.errorResponse = (
  res,
  message,
  status = 400
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};