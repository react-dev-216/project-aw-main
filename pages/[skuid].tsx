import { useState, useEffect, useCallback } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useAppDispatch,
  useAppSelector,
} from '../redux/hooks';
import {
  getUserInfo
} from '../redux/reducers/user';
import { styled } from '@mui/material/styles';
import {
  Container, Box, Typography, Grid, TextField, Button,
  FormControl, InputLabel, Select, MenuItem, InputBase, Input
} from '@mui/material';
import ImageCarousel, { ImageType } from "../components/ImageCarousel";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 1,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '##FFFFFF' : '#2b2b2b',
    border: '1px solid #D0D5DD',
    fontSize: 16,
    width: 'auto',
    height: 24,
    padding: '10px 14px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),

  },
}));

const Main = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(router.asPath + '/all')
  }, [router]);

  return null;
}

export default Main