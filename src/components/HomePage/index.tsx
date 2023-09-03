import Button from '../UI/Button';
import Post from '../Post/index.';
import Loader from '../UI/Loader';
import { useAuthStore } from '@/store/auth';
import { useGetUsersPostsQuery } from '@/queries/postQueries';
import usePaginate from '../hooks/usePaginate';
import { isLengthEqualToLimit } from '@/utils/utils';
import PostForm from '../Post/PostForm';
import useIsEditingPost from '../hooks/useIsEditingPost';
import { PostType } from '@/types';

const HomePage = () => {
  const mainUserId = useAuthStore((state) => state.mainUserId);
  const { pageIndex, goToNextPage, goToPreviousPage } = usePaginate();
  const {
    data: posts,
    isLoading,
    isError,
  } = useGetUsersPostsQuery(pageIndex, mainUserId || 1);
  const { isEdittingId, updateEditingId, clearEditingId } = useIsEditingPost();

  if (isError) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!posts.length) {
    return (
      <main>
        <section>
          <p className='text-center my-4'>You reached the Dead End 💀</p>
          <Button onClick={goToPreviousPage}>Go back</Button>;
        </section>
      </main>
    );
  }

  return (
    <main>
      <h2 className='text-2xl text-center font-bold mb-4'>Home</h2>

      <PostForm isAddingAndId={mainUserId} />

      <section>
        {posts.map((single: PostType) =>
          single.id === isEdittingId ? (
            <PostForm
              key={single.id}
              editingData={{ ...single, clearEditingId }}
            />
          ) : (
            <Post
              key={single.id}
              postData={single}
              updateEditingId={updateEditingId}
            />
          )
        )}
      </section>

      <div className='flex mt-2'>
        {pageIndex > 1 && <Button onClick={goToPreviousPage}>Previous</Button>}

        {isLengthEqualToLimit(posts.length) && (
          <Button onClick={goToNextPage}>Next</Button>
        )}
      </div>
    </main>
  );
};

export default HomePage;
