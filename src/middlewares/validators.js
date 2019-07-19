import { check, validationResult } from 'express-validator'; 

// SIGNUP
export const signupValidator = [
    check('email', 'Your email is not valid').not().isEmpty().isEmail(),
    check('password', 'Your password is not valid, min of 6 characters').not().isEmpty().isLength({ min: 6 }).custom(value => !/\s/.test(value)),
    check('first_name', 'Your first name is not valid').not().isEmpty().custom(value => !/\s/.test(value)),
    check('last_name', 'Your last name is not valid').not().isEmpty().custom(value => !/\s/.test(value)),
    check('phone', 'Phone is not valid').not().isEmpty().custom(value => !/\s/.test(value)),
    check('address', 'Address is not valid').not().isEmpty(),
    check('city', 'City is not valid').not().isEmpty().custom(value => !/\s/.test(value)),
    check('state', 'State is not valid').not().isEmpty().custom(value => !/\s/.test(value)),
    check('country', 'Country is not valid').not().isEmpty().custom(value => !/\s/.test(value)),
    check('postal_code', 'Postal Code is not valid').not().isEmpty().custom(value => !/\s/.test(value)),
]

export function validatorFn(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({status:'error', error: errors.array()[0].msg});
    } else {
    next();
    }
}