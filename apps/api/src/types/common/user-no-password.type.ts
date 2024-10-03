import { User } from '@prisma/client';

export type TUserWithoutPassword = Omit<User, 'password'>;
