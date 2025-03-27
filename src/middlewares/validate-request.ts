import { Request, Response, NextFunction } from 'express';
import { ContextRunner } from 'express-validator';

const validatePayload = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await Promise.all(
      validations.map((validation) => validation.run(req))
    );
    if (result.some((r) => !r.isEmpty())) {
      res.status(400).json({ errors: result.flatMap((r) => r.array()) });
      return;
    }

    next();
  };
};

export { validatePayload };
