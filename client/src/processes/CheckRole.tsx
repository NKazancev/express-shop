import { FC, ReactNode, useEffect } from 'react';
import { Path, useNavigate } from 'react-router';

import UserRole from '@config/userRoles';
import { useAppSelector } from '@shared/hooks/reduxHooks';

type TCheckRole = {
  allowedRole: UserRole;
  children: ReactNode;
  redirect: string | Partial<Path>;
};

const CheckRole: FC<TCheckRole> = ({ allowedRole, children, redirect }) => {
  const { isLogged, role } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged || role !== allowedRole) {
      navigate(redirect, { replace: true });
    }
  }, [isLogged, role, allowedRole, redirect, navigate]);

  return isLogged && role === allowedRole && children;
};

export default CheckRole;
