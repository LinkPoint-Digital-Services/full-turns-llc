import {useQuery} from '@tanstack/react-query';
import {authClient} from '../services/authClient';

export function useMe() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authClient.me,
    staleTime: 5 * 60 * 1000
  });
}
