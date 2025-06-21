import { useGetUserInfoQuery } from '@shared/api/userApi';

import UserInfo from '@widgets/User/UserInfo/UserInfo';

import styles from './UserInfoPage.module.css';

const UserInfoPage = () => {
  const { data: userInfo } = useGetUserInfoQuery();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User info</h2>

      {userInfo && <UserInfo {...userInfo} />}
    </div>
  );
};

export default UserInfoPage;
