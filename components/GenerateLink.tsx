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

const SideMenu = () => {
  const router = useRouter();
  const userInfo = useAppSelector(getUserInfo);
  const [type, setType] = useState('InTake');
  const handleChange = (e:any) => {
    setType(e.target.value);
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100vh',
        p:4,
        backgroundColor: 'secondary.light'
      }}
    >
      <Grid container>
        <Grid item container sx={{mb: '58px', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography sx={{fontSize: 24, fontWeight:700, color:'#252733'}} >Generate Links</Typography>
          <Typography sx={{fontSize: 14, fontWeight: 600, color:'#252733'}} >{userInfo.user.email}</Typography>
        </Grid>      
        <Typography sx={{fontSize: 14, fontWeight:500, mb: '6px', color:'#252733'}} >SKU</Typography>
        <Grid item container sx={{alignItems: 'center'}}>
          <FormControl variant="outlined" sx={{mr:4}} >
            <BootstrapInput placeholder="Enter your SKU # here" />
          </FormControl>
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
          <Button sx={{ 
            mx:5,
            height: 24,
            fontSize: 12, 
            fontWeight:600,
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #3E66FB',
            borderRadius: 0.5,
            textTransform: 'none'
            }} 
            variant="outlined" 
            color="primary"
            >
            Generate Link</Button>
        </Grid> 
      </Grid>     
    </Box>
  )
}

export default SideMenu