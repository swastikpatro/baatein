import { useGetAllPostsQuery } from '@/queries/postQueries';
import Post from '../Post/index.';
import Loader from '../UI/Loader';
import Button from '../UI/Button';
import usePaginate from '../hooks/usePaginate';
import { isLengthEqualToLimit } from '@/utils/utils';
import useIsEditingPost from '../hooks/useIsEditingPost';
import PostForm from '../Post/PostForm';
import { PostType } from '@/types';

const ExplorePosts = () => {
  const { pageIndex, goToNextPage, goToPreviousPage } = usePaginate();
  const { data: posts, isLoading, isError } = useGetAllPostsQuery(pageIndex);
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
      <h2 className='text-2xl text-center font-bold mb-4'>Explore</h2>

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

export default ExplorePosts;
