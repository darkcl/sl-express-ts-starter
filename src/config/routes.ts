module.exports = {
  preMiddlewares: ["* requestLog requestParseURLEncoded requestParseBody"],

  routes: ["GET / PublicController.index", "GET /yay PublicController.yay"],

  postMiddlewares: [],
};
