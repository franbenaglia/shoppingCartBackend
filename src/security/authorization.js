const jwt = require('jsonwebtoken');

exports.authorization = async (req, res, func, role) => {
    try {

        const header = req.header('Authorization');
        const token = header.split(" ")[1];
        const payload = jwt.decode(token);

        let user;

        if (payload.email) {
            user = payload
        } else {
            user = payload.user;
        }

        if (user.role === role) {
            await func(req, res);
        } else {
            res.status(403).send({ message: "Forbidden resource, invalid role" });
        }

    } catch (error) {
        console.log(error);
        //next(error);
    }
}