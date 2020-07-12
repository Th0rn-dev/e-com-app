module.exports = {
    getError(errors, prop) {
        try {
            errors.mapped()[prop].msg;
        } catch(err) {
            return ";"
        }
    }
};