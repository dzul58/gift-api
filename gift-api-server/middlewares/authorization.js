const { Gift } = require("../models");
const authorization = async (req, res, next) => {
  try {
    const { id } = req.userAccount;
    const giftsId = req.params.id
    

    const validate= await Gift.findOne({ where: { id: giftsId } });

    if (!validate) {
      throw { name: "NotFound" };
    }

    if (validate.senderId !== id) {
        throw { name: "Forbidden" }; 
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
