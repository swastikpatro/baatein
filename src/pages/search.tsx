import Post from '@/components/Post/index.';
import Button from '@/components/UI/Button';
import Loader from '@/components/UI/Loader';
import usePaginate from '@/components/hooks/usePaginate';
import { useGetPostsSearchQuery } from '@/queries/postQueries';
import { useRouter } from 'next/router';
import React from 'react';
import { isLengthEqualToLimit } from '@/utils/utils';
import useIsEditingPost from '@/components/hooks/useIsEditingPost';
import PostForm from '@/components/Post/PostForm';
import { PostType } from '@/types';

const Search = () => {
  const {
    query: { q },
  } = useRouter();
  const { pageIndex, goToNextPage, goToPreviousPage } = usePaginate();

  const {
    data: posts,
    isLoading,
    isError,
  } = useGetPostsSearchQuery(q, pageIndex);
  const { isEdittingId, updateEditingId, clearEditingId } = useIsEditingPost();

  if (!q) {
    return <p className='mt-2 text-center'>Please Enter some search text</p>;
  }

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
          <p className='text-center my-4'>No Post Found for your query "{q}"</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <h3 className='text-center my-4'>Search Results for '{q}'</h3>
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

export default Search;
