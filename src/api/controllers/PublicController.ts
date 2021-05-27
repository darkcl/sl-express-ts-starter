import { Request, Response } from "express";

class PublicController {
  async index(req: Request, res: Response) {
    return res.send("Hello world!!!");
  }

  async yay(req: Request, res: Response) {
    return res.send("YAY");
  }
}

module.exports = PublicController;
