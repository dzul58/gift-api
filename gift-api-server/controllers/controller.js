const { compareTextWithHash, createHash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Gift, Voucher } = require("../models");
class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EmailError" };
      }

      if (!password) {
        throw { name: "PasswordError" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "LoginError" };
      }

      const isValidPassword = compareTextWithHash(password, user.password);

      if (!isValidPassword) {
        throw { name: "LoginError" };
      }

      const accessToken = signToken({ id: user.id, email: user.email });

      res.json({ access_token: accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, phoneNumber, password } = req.body;
      const newUser = { email, phoneNumber, password };

      const respone = await User.create(newUser);

      res.status(201).json({ id: respone.id, email: respone.email  });
    } catch (error) {
      next(error);
    }
  } 






  // Voucher
  static async readVouchers(req, res, next) {
    try {
      const respone = await Voucher.findAll();
      res.status(200).json(respone);
    } catch (error) {
      next(error);
    }
  }



  //gift
  static async sendGift(req, res, next) {
    try {
      const { voucherId } = req.params;
      const { id } = req.userAccount;
      const { message, amount, receiverId } = req.body;

      const isValidReceiver = await User.findByPk(receiverId);
      if (!isValidReceiver) {
      throw { name: "ReceiverNotFound"};
      }

      const sendingGift = {
        message,
        senderId: id,
        amount,
        voucherId: voucherId,
        receiverId,
        status: "unclaimed",
      };

      const respone = await Gift.create(sendingGift);
      
      if (!respone) {
        throw { name: "NotFound" };
      }

      const result = respone

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }


  static async giftsUser(req, res, next) {
    try {
      const { id } = req.userAccount;

      const respone = await Gift.findAll({ where: { receiverId: id } });
  
      if (!respone) {
        throw { name: "NotFound" };
      }
  
      res.status(200).json(respone);
    } catch (error) {
      next(error);
    }
  }


  static async updateGift(req, res, next) {
    try {
      const { id } = req.params;

      const giftUpdate = await Gift.findByPk(id);
      
      if (!giftUpdate) {
        throw { name: "NotFound" };
      }
      const { message, amount, receiverId } = req.body;

      const respone = await Gift.update(
        { message, amount, receiverId },
        { where: { id } }
      );

      const Response  = await Gift.findByPk(id);

      res.status(200).json( Response );
    } catch (error) {
      next(error);
    }
  }

  static async deleteGift(req, res, next) {
    try {
      const { id } = req.params;
      const gift = await Gift.findByPk(id);
      if (!gift) {
        throw { name: "NotFound" };
      }

      await Gift.destroy({ where: { id } });

      res.status(200).json({ message: `Gift has been deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async claimGift(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Gift.update({ status: "claimed" }, { where: { id } });

      if (!response) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ message: `Gift has been claimed` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
