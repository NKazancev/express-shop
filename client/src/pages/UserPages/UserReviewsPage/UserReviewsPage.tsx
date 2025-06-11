import { useGetAllUserReviewsQuery } from '@shared/api/reviewApi';

import styles from './UserReviewPage.module.css';

const UserReviewsPage = () => {
  const { data: reviews } = useGetAllUserReviewsQuery();

  console.log(reviews);

  return <h2 className={styles.title}>User reviews page</h2>;
};

export default UserReviewsPage;
