
export async function registerUser(req , res , next) {

    try {
        throw new Error("encounter an error while registering new user")
    } catch (error) {
        error.status = 400
        next(error)
    }

}