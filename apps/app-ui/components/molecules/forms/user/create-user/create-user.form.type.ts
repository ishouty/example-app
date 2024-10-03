import { CreateUserDto } from '@shared/common';

export type TCreateUserForm = {
  onSubmitHandlerCallBack?: (data: CreateUserDto) => void;
};
