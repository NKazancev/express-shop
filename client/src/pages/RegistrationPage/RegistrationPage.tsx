import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { useAppSelector } from '@shared/hooks/reduxHooks';
import CreateUser from '@processes/CreateUser';

import regImage from '@shared/assets/registration-image.jpg';
import styles from './RegistrationPage.module.css';

function RegistrationPage() {
  const { isLogged } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate('/');
  }, [navigate, isLogged]);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={regImage} alt="image" />
      </div>

      <div className={styles.content}>
        <NavLink to="/" className={styles.link}>
          &#8592; back to the home page
        </NavLink>

        <h3 className={styles.title}>Sign up</h3>

        <div className={styles.form}>
          <CreateUser />
        </div>

        <p className={styles.text}>
          By creating an account you agree with <span>Terms of Service</span>.
        </p>
      </div>
    </div>
  );
}

export default RegistrationPage;
