export const errorResponse = (
    message = "Something went wrong",
    error = {},
    data = {}
  ) => {
    return {
      success: false,
      message,
      data,
      error,
    };
  };
  