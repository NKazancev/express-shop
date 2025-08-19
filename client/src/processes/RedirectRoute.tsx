import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';

type TRedirectRoute = {
  redirect?: string;
};

const RedirectRoute: FC<TRedirectRoute> = ({ redirect }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(`/${redirect}`);
    } else {
      navigate('/');
    }
  }, []);

  return null;
};

export default RedirectRoute;
