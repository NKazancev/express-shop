import { useGetUserInfoQuery } from '@shared/api/userApi';

import styles from './UserInfoPage.module.css';

const UserInfoPage = () => {
  const { data: info } = useGetUserInfoQuery();

  console.log(info);

  return <h2 className={styles.title}>User info page</h2>;
};

export default UserInfoPage;
