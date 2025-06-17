import { useGetAllUserReviewsQuery } from '@shared/api/reviewApi';

import UserReviewsList from '@widgets/User/UserReviews/UserReviewsList/UserReviewsList';

import styles from './UserReviewPage.module.css';

const UserReviewsPage = () => {
  const { data: reviews } = useGetAllUserReviewsQuery();

  return (
    <div>
      <h2 className={styles.title}>Reviews</h2>
      {reviews && <UserReviewsList reviews={reviews} />}
    </div>
  );
};

export default UserReviewsPage;
