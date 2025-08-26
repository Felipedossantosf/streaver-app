import useSWR from 'swr';
import { Post } from '@/types/post';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function usePosts(userId?: number) {
  const url = userId 
    ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    : 'https://jsonplaceholder.typicode.com/posts';

  const { data, error, isLoading, isValidating, mutate } = useSWR<Post[]>(
    url,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
      dedupingInterval: 10000, // 10 seconds
      errorRetryCount: 3,
      errorRetryInterval: 5000, // 5 seconds
      onError: (err) => {
        console.error('Error fetching posts:', err);
      },
    }
  );

  return {
    posts: data || [],
    isLoading,
    isError: error,
    isValidating,
    mutate,
  };
}
