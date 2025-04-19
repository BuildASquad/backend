import express from 'express';

export interface IHomeController {
  getHome: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => Promise<void>;
}

export interface IAuthController {
  loginUser: (
    req: express.Request,
    res: express.Response
  ) => Promise<express.Response>;
  signupUser: (
    req: express.Request,
    res: express.Response
  ) => Promise<express.Response>;
}
