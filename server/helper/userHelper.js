import validator from "validator";

export function validatorUserLogin(email, password, res) {
    const error = []
    if (!email) {
        error.push('Please provide your email')
    }
    if (!password) {
        error.push('Please provide your password')
    }
    if (email && !validator.isEmail(email)) {
        error.push('Please provide your valid email');
    }
    if (error.length > 0) {
        res.status(400).json({
            error: {
                errorMessage: error
            }
        });
    }
}

export function validatorUserRegistration(fields, files, res) {
    const { userName, email, password, confirmPassword } = fields;
    const error = [];
    if (!userName) {
        error.push("please provide your user name");
    }
    if (!email) {
        error.push("please provide your email");
    }
    if (email && !validator.isEmail(email)) {
        error.push("please provide your valid email");
    }
    if (!password) {
        error.push("please provide your password");
    }
    if (!confirmPassword) {
        error.push("please provide user confirm password");
    }
    if (password && confirmPassword && password !== confirmPassword) {
        error.push("your password and confirm password not same");
    }
    if (password && password.length < 6) {
        error.push("please provide password must be 6 charecter");
    }
    if (Object.keys(files).length === 0) {
        error.push("please provide user image");
    }
    if (error.length > 0) {
        res.status(400).json({
            error: {
                errorMessage: error,
            },
        });
    }
}