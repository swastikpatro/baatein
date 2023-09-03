import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jsonServer, paginateLimit } from '../../contants';

export const useGetAllPostsQuery = (page: number) =>
  useQuery({
    queryKey: ['all-posts', page],
    queryFn: async () => {
      const response = await axios.get(
        `${jsonServer}posts?_expand=user&_page=${page}&_limit=${paginateLimit}`
      );

      if (response.status === 200) {
        return response.data;
      }
    },
    keepPreviousData: true,
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error.response?.data.message);
    },
  });

export const useGetUsersPostsQuery = (page: number, userId: number) =>
  useQuery({
    queryKey: ['user-posts', page],
    queryFn: async () => {
      const response = await axios.get(
        `${jsonServer}posts?userId=${userId}&_expand=user&_page=${page}&_limit=${paginateLimit}`
      );

      if (response.status === 200) {
        return response.data;
      }
    },
    keepPreviousData: true,
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error.response?.data.message);
    },
  });

export const useGetPostsSearchQuery = (queryText: string, page: number) =>
  useQuery({
    queryKey: ['full-search', queryText, page],
    queryFn: async () => {
      const response = await axios.get(
        `${jsonServer}posts?q=${queryText}&_expand=user&_page=${page}&_limit=${paginateLimit}`
      );

      if (response.status === 200) {
        return response.data;
      }
    },
    keepPreviousData: true,
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error.response?.data.message);
    },
  });

export const useLikePostMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['likePost', postId],

    mutationFn: async (updatedData: {
      likeCount: number;
      likedBy: number[];
    }) => {
      const res = await axios.patch(`${jsonServer}posts/${postId}`, {
        likes: updatedData,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user-posts']);
      queryClient.refetchQueries(['all-posts']);
      queryClient.refetchQueries(['full-search']);
    },
    onError: () => {
      console.error('Error');
    },
  });
};

export const useDislikePostMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['dislikePost', postId],
    mutationFn: async (updatedData: {
      likeCount: number;
      likedBy: number[];
    }) => {
      const res = await axios.patch(`${jsonServer}posts/${postId}`, {
        likes: updatedData,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user-posts']);
      queryClient.refetchQueries(['all-posts']);
      queryClient.refetchQueries(['full-search']);
    },
    onError: () => {
      console.error('Error');
    },
  });
};

export const useDeletePostMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deletePost', postId],
    mutationFn: async () => {
      const res = await axios.delete(`${jsonServer}posts/${postId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user-posts']);
      queryClient.refetchQueries(['all-posts']);
      queryClient.refetchQueries(['full-search']);
    },
    onError: () => {
      console.error('Error');
    },
  });
};
export const useEditPostMutation = (postId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editPost', postId],
    mutationFn: async (body) => {
      const res = await axios.patch(`${jsonServer}posts/${postId}`, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user-posts']);
      queryClient.refetchQueries(['all-posts']);
      queryClient.refetchQueries(['full-search']);
    },
    onError: () => {
      console.error('Error');
    },
  });
};

export const useAddPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addPost'],
    mutationFn: async (body) => {
      const res = await axios.post(`${jsonServer}posts/`, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user-posts']);
      queryClient.refetchQueries(['all-posts']);
      queryClient.refetchQueries(['full-search']);
    },
    onError: () => {
      console.error('Error');
    },
  });
};
