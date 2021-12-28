import { useState, useEffect, useCallback } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useAppDispatch,
  useAppSelector,
} from '../redux/hooks';
import { getUserInfo } from '../redux/reducers/user';
import { setMessage } from '../redux/reducers/album';
import { styled } from '@mui/material/styles';
import {
  Container, Box, Typography, Grid, TextField, Button,
  FormControl, InputLabel, Select, MenuItem, InputBase, Input
} from '@mui/material';
import ImageCarousel, { ImageType } from "../components/ImageCarousel";
import { BASE_URL } from '../pages/api/constants';

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
  const dispatch = useAppDispatch();
  const slug = router.query.slug || []
  const userInfo = useAppSelector(getUserInfo);
  const [type, setType] = useState(slug[1] || 'all');
  const [images, setImages] = useState<any[]>();
  const [imageUrls, setImageUrls] = useState<ImageType[]>();
  const [skuID, setSKUId] = useState<string>(slug[0] || '1');
  useEffect(() => {
    if (!slug[1] || !slug[0] ) return;
    setType(slug[1] || 'all');
    setSKUId(slug[0] || '1');
    fetch(BASE_URL + '/photos' + router.asPath, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res: any) => res.json())
    .then((res_json: any) => {
      // console.log(res_json, res_json.photoUrls)
      if (res_json.errors && res_json.errors.length > 0) {
        const error = res_json.errors[0]; 
        dispatch(setMessage({type: 'error', text: error.message})); 
      } else if (res_json.photoUrls) {
        setImages(res_json.photoUrls);          
      }
    })
    .catch((err:any) => console.log('err=>', err))
  }, [router]);

  useEffect(() => {
    if (images) {
      const keys = Object.keys(images);
      if(keys.length > 0) {
        let tempList: ImageType[] = [];
        if (type === 'all') {
          for(let key of keys) {
            tempList = [...tempList, ...(images as any)[key]];
          }
        } else {
          if (keys.filter((key) => key === type).length > 0) {
            tempList = [...tempList, ...(images as any)[type]];
          }
        }
        setImageUrls(tempList);
      }
    }
  },[images, type])

  const handleChange = (e:any) => {
    // setType(e.target.value);
    router.push(`/${skuID}/${e.target.value}`)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        p:4,
        backgroundColor: 'white'
      }}
    >
      {imageUrls && imageUrls.length > 0 &&
      <Grid container sx={{display: 'flex', flexDirection:'column'}} alignItems="center">
        <Grid item container sx={{alignItems: 'center', mx:'20px', width: 545}}  justifyContent="space-between">
          <Typography sx={{fontSize: 15, fontWeight:400, mr:4, color:'#252733'}} >Item # {skuID.split('_')[0]}</Typography>
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
              <MenuItem value={'intake'}>InTake</MenuItem>
              <MenuItem value={'whiter'}>Whiter</MenuItem>
              <MenuItem value={'rynek'}>Rynek</MenuItem>
              <MenuItem value={'all'}>All</MenuItem>
            </Select>
          </FormControl>
        </Grid>        
        <Grid item>
          <ImageCarousel images={imageUrls} />
        </Grid>
      </Grid>     
      }
    </Box>
  )
}

export default Main