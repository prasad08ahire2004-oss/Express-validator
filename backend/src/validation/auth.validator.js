import { body , validationResult} from "express-validator"

const validate = (req , res , next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()) {
        return next()
    }

    res.status(400).json({
        errors: errors.array()
    })

}


export const registerValidation = [
    body("username").isString().withMessage("username should be string"),
    //agar username ek string nahi hogi tho ye message jayega

    body("email").isEmail().withMessage("email should be valid email address"),

    body("password").custom((value) => {

        if(value.length < 6) {
            throw new Error("password should be minimum 6 characters")
        }

        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        if(!regex.test(value)) {
            throw new Error("password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character")
        }
        return true

    }).withMessage("password should be valid password"),

    validate
]