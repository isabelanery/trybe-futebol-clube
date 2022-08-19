import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

const errorMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: details ? details[0].message : message });
      break;
    case 'Unauthorized':
      res.status(401).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'UnprocessableEntity':
      res.status(422).json({ message });
      break;
    default:
      res.sendStatus(500).json({ message: err });
  }

  next(err);
};

export default errorMiddleware;
