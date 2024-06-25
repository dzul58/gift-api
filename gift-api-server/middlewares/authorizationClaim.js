const { Gift } = require("../models");
const authorizationClaim = async (req, res, next) => {
  try {
    const { id } = req.userAccount;
    const giftsId = req.params.id
    

    const validate= await Gift.findOne({ where: { id: giftsId } });

    if (validate.receiverId !== id) {
        throw { name: "Forbidden" }; 
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizationClaim;
