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
  const userInfo = useAppSelector(getUserInfo);
  const [type, setType] = useState('InTake');
  const [images, setImages] = useState<ImageType[]>();
  const [skuID, setSKUId] = useState<number>(0);
  useEffect(() => {
    setImages(
      Array.from(Array(10).keys()).map((id) => ({
        id,
        url: `https://picsum.photos/1000?random=${id}`
      }))
    );
  }, []);

  const handleChange = (e:any) => {
    setType(e.target.value);
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        p:4,
        backgroundColor: 'secondary.light'
      }}
    >
      <Grid container sx={{display: 'flex', flexDirection:'column'}} alignItems="center">
        <Grid item container sx={{alignItems: 'center', mx:'20px', width: 545}}  justifyContent="space-between">
          <Typography sx={{fontSize: 20, fontWeight:400, mb: '6px', mr:4, color:'#252733'}} >Item #{skuID}</Typography>
          <FormControl sx={{width: 175}} >
            <Select
              // native
              labelId="select-label"
              id="type-select"
              displayEmpty
              value={type}
              // label="Type"
              onChange={handleChange}
              sx={{
                position: 'relative',
                border: '1px solid #D0D5DD',
                fontSize: 16,
                width: 176,
                height: 44,
                borderRadius: '1px',
                padding: '12px 14px',
              }}
            >
              <MenuItem value={'InTake'}>InTake</MenuItem>
              <MenuItem value={'Whiter'}>Whiter</MenuItem>
              <MenuItem value={'Rynek'}>Rynek</MenuItem>
              <MenuItem value={'All'}>All</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <ImageCarousel images={images} />
        </Grid>
      </Grid>     
    </Box>
  )
}

export default Main