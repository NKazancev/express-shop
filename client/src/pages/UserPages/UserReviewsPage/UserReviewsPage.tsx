import { useParams } from 'react-router';

import { REVIEWS_PER_PAGE } from '@config/consts';

import { useGetAllUserReviewsQuery } from '@shared/api/reviewApi';
import Pagination from '@shared/ui/Pagination/Pagination';

import UserReviewsList from '@widgets/User/UserReviews/UserReviewsList/UserReviewsList';

import styles from './UserReviewPage.module.css';

const UserReviewsPage = () => {
  const { page } = useParams();
  const currentPage = Number(page ?? 1);

  const skip = REVIEWS_PER_PAGE * (currentPage - 1);

  const { data: reviews, isSuccess } = useGetAllUserReviewsQuery({
    skip,
    take: REVIEWS_PER_PAGE,
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
            itemsPerPage={REVIEWS_PER_PAGE}
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
