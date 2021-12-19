import {useEffect} from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useAppSelector } from '../redux/hooks';
import { getUserInfo } from '../redux/reducers/user';
import SideMenu from '../components/SideMenu';
import GenerateLink from '../components/GenerateLink';
import {
  Container, Box, Button, TextField, 
  IconButton, Typography, InputAdornment, 
  InputLabel, FormControl, OutlinedInput, 
  Grid 
} from '@mui/material';

const AdminPage: NextPage = () => {
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
    <Box sx={{display: 'flex'}}>
      <SideMenu />
      <GenerateLink />
    </Box>
  )
}

export default AdminPage