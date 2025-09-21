const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
      .catch((err) => next(err));
  }
}


export {asyncHandler};


// const aysncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     console.error("Error in async handler:", error);
//     res.status(err.code || 500).json({
//       message: err.message || "Internal Server Error",
//       success: false
//     });
//   }
// }