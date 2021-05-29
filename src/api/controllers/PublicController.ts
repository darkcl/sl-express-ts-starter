import { Request, Response } from "express";
import { Controller, Get } from "../../decorators";

@Controller("")
class PublicController {
  @Get("/")
  async index(req: Request, res: Response) {
    return res.send("Hello world!!!");
  }

  @Get("/yay")
  async yay(req: Request, res: Response) {
    return res.send("YAY");
  }
}

module.exports = PublicController;
