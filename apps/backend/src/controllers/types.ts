import express from 'express';

export interface IHomeController {
  getHome: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => Promise<void>;
}
