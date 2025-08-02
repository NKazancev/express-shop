import { useParams } from 'react-router';

import { useGetAllUserReviewsQuery } from '@shared/api/reviewApi';

import UserReviewsList from '@widgets/User/UserReviews/UserReviewsList/UserReviewsList';
import Pagination from '@widgets/Pagination/Pagination';

import styles from './UserReviewPage.module.css';

const UserReviewsPage = () => {
  const { page } = useParams();
  const currentPage = Number(page ?? 1);

  const itemsPerPage = 3;
  const skip = itemsPerPage * (currentPage - 1);

  const { data: reviews, isSuccess } = useGetAllUserReviewsQuery({
    skip,
    take: itemsPerPage,
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>

      {!!reviews?.quantity && isSuccess && (
        <>
          <UserReviewsList reviews={reviews.data} />
          <Pagination
            currentPage={currentPage}
            currentLocation="/user/reviews"
            itemsPerPage={itemsPerPage}
            productsQuantity={reviews.quantity}
          />
        </>
      )}

      {!reviews?.quantity && isSuccess && (
        <p className={styles.notification}>You don't have any reviews</p>
      )}
    </div>
  );
};

export default UserReviewsPage;
