//async
 const asyncHandler = (fn)=> async(req, res, next) =>{
    try {
        await fn(req, res, next)
    } catch (error) {
        next(error)
    }
}


// promise method
// const asyncHandler = fn => (req, res, next) =>{
//     Promise
//     .resolve(fn(req, res))
//     .catch(next)
// }
module.exports = asyncHandler;