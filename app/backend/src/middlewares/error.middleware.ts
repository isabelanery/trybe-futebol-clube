import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

const errorMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;

  // console.log(err, 'err');

  switch (name) {
    case 'ValidationError':
      return res.status(400).json({ message: details ? details[0].message : message });
      break;
    case 'Unauthorized':
      return res.status(401).json({ message });
      break;
    case 'NotFoundError':
      return res.status(404).json({ message });
      break;
    // case 'UnprocessableEntity':
    //   return res.status(422).json({ message });
    //   break;
    default:
      return res.sendStatus(500).json({ message });
  }

  next();
};

export default errorMiddleware;
