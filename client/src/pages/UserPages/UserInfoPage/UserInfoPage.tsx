import { useGetUserInfoQuery } from '@shared/api/userApi';

import UserInfo from '@widgets/User/UserInfo/UserInfo';

import styles from './UserInfoPage.module.css';

const UserInfoPage = () => {
  const { data: user } = useGetUserInfoQuery();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Info</h2>

      {user && <UserInfo {...user} />}
    </div>
  );
};

export default UserInfoPage;
