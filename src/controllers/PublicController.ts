import { Request, Response } from "express";

class PublicController {
  async index(req: Request, res: Response) {
    return res.send("Hello world!!!");
  }
}

module.exports = PublicController;
