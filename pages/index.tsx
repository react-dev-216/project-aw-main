import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  useAppDispatch,
  useAppSelector,
} from '../redux/hooks';
import {
  setUserInfo,
  getUserInfo,
  UserInfo
} from '../redux/reducers/user';
import { Box} from '@mui/material';

// const useUser = () => ({ user: null, loading: false });

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(getUserInfo);
  const router = useRouter();

  useEffect(() => {
    if(!userInfo)
      return;
    if (!(userInfo.user.name || userInfo.user.email || userInfo.loading)) {
      router.push('/login')
    }
  }, [userInfo]);
  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Home page
    </Box>
  )
}

export default Home
