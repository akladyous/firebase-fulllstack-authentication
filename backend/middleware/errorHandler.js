export const errorHandler = (error, req, res, next) => {
    console.log("\x1b[31m%s\x1b[0m", `Error Message -> ${error.message}`);
    res.status(error.status || 500).json({error: error.message})
};
