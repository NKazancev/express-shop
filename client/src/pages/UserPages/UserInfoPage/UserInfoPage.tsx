import { useGetUserInfoQuery } from '@shared/api/userApi';

import UserInfo from '@widgets/User/UserInfo/UserInfo';
import DeleteUser from '@processes/User/DeleteUser';

import styles from './UserInfoPage.module.css';

const UserInfoPage = () => {
  const { data: user } = useGetUserInfoQuery();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User info</h2>

      {user && (
        <UserInfo
          email={user.email}
          username={user.username}
          address={user.stringAddress}
        />
      )}

      <DeleteUser buttonStyle={styles.button} />
    </div>
  );
};

export default UserInfoPage;
