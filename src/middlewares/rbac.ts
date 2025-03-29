import { NextFunction, Request, Response } from 'express';
import { IUser } from 'models/user.model';

type TAccessRoute = 'view' | 'detail' | 'create' | 'update' | 'delete';

const roleAccess = {
  admin: [
    {
      lecture: ['view', 'detail', 'create', 'update', 'delete'],
      user: ['view', 'detail', 'create', 'update', 'delete'],
    },
  ],
  user: [
    {
      lecture: ['view'],
      user: ['detail', 'update', 'create'],
    },
  ],
};

export const guard =
  (action: TAccessRoute) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as Omit<IUser, 'password'>;
    const role = user.role as 'user' | 'admin';

    const keys = Object.keys(roleAccess[role][0]);
    const matchAt = keys.findIndex((url: string) => req.baseUrl.includes(url));
    const routeAccess = roleAccess[role][0];

    if (
      roleAccess[role] &&
      routeAccess[keys[matchAt] as keyof typeof routeAccess].includes(action)
    ) {
      next();
      return;
    }

    res.status(401).json({ message: 'User dont have permission!' });
  };
