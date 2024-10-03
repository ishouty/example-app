import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/store';
import { verifyUserToken } from 'services';
import { updateAuthenicated } from 'redux/reducers/global.slice';
import { updateUser } from '../../redux/reducers/user.slice';
// Basic auth provider - can be much improved but demonstrate principles
export const AuthProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  // can provide custom hooks todo this and place this into auth.hook.ts
  const {
    isError,
    isLoading,
    data: responseData,
  } = useQuery({
    queryKey: ['verify-token'],
    queryFn: verifyUserToken,
  });
  // verify token
  const globalState = useAppSelector((state) => state.global);
  const navigationState = useAppSelector((state) => state.navigation);
  const [requiresAuthenication, setRequiresAuthenication] = useState<
    'required' | 'not-required' | 'not-set'
  >('not-set');
  const url = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (responseData) {
      dispatch(updateUser(responseData.data));
    }
  }, [responseData]);

  useEffect(() => {
    navigationState.find((navigation) => {
      if (navigation.link === url) {
        if (navigation.requiredAuth) {
          setRequiresAuthenication('required');
        }
      }
    });
  }, [navigationState]);

  useEffect(() => {
    if (!responseData || isError || requiresAuthenication) {
      setRequiresAuthenication('not-required');
      router.push('/login');
    }
  }, [responseData, isError, requiresAuthenication]);

  // if not update redux to not allow
  if (requiresAuthenication === 'not-required') {
    return children;
  }

  if (requiresAuthenication === 'required' && globalState.authenticated) {
    return children;
  }
};

export default AuthProvider;
