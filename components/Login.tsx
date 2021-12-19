import { useState, useEffect, useCallback } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  useAppDispatch,
  useAppSelector,
} from '../redux/hooks';
import {
  setUserInfo,
  getUserInfo,
  UserInfo
} from '../redux/reducers/user';
import styles from '../styles/Home.module.css'
import Logo from '../assets/svg/logo.svg';
import {
  Container, Box, Button, TextField, 
  IconButton, Typography, InputAdornment, 
  InputLabel, FormControl, OutlinedInput, 
  Grid 
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
  errors: {
    email: boolean,
    password: boolean,
  };
}

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
    errors: {
      email: false,
      password: false,
    }
  });  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(values.password === '' || values.email === '') {
      values.errors['email'] = values.email === '' ? true : false;
      values.errors['password'] = values.password === '' ? true : false;
      setValues({...values});
      return;
    }
    dispatch(setUserInfo({name: '', email: values.email, password: values.password}))
    router.push('/admin');
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     /* Form data */
    //   }),
    // }).then((res) => {
    //   // Do a fast client-side transition to the already prefetched dashboard page
    //   if (res.ok) router.push('/admin')
    // })
  }

  useEffect(() => {
    router.prefetch('/admin')
  }, [])
  const handleChange = (name: string) => (e:any) => {
    (values as any)[name] = e.target.value;
    (values.errors as any)[name] = false;
    setValues({...values});
  }
  const handleClickShowPassword = (e: any) => {
    values.showPassword = !values.showPassword;
    setValues({...values})
  }
  return (
    <form
      // component="form"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <Container sx={{display: 'flex',flexDirection: 'column', alignItems: 'center', my:3}}>
        <Image src={Logo} alt='logo'  width={48} height={48} />
        <Typography variant="body1" sx={{my:3, fontSize:19, fontWeight:700, color:'#A4A6B3'}}>Best Company, Inc.</Typography>
        <Typography variant="h6" sx={{my:2, fontSize:24, fontWeight:700}}>Admin Dashboard</Typography>
      </Container>
      <Grid container >
        <Grid item xs={6}>
          <InputLabel sx={{fontSize: 12, fontWeight: 700}}>EMAIL</InputLabel>
        </Grid>
      </Grid>
      <FormControl fullWidth sx={{ my: 1 }} variant="outlined" >
        <InputLabel required htmlFor="outlined-adornment-email" >Email</InputLabel>
        <OutlinedInput
          fullWidth
          id="outlined-adornment-email"
          type={'text'}
          value={values.email}
          onChange={handleChange('email')}
          label="Email"
          error={values.errors.email}
          // helperText="Incorrect entry."
        />
      </FormControl>
      <Grid container justifyContent="space-between" >
        <Grid item xs={6}>
          <InputLabel sx={{fontSize: 12, fontWeight: 700}}>PASSWORD</InputLabel>
        </Grid>
          <InputLabel sx={{fontSize: 10}}>Forget password?</InputLabel>
        <Grid item xs={6}>
      </Grid>
      </Grid>
      <FormControl fullWidth sx={{ my: 1 }} variant="outlined">
        <InputLabel required htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {!values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          error={values.errors.password}
        />
      </FormControl>        
      <Button fullWidth sx={{ my: 2, height: 48 }} variant="contained" type="submit" color="primary">Login</Button>
      <Grid container justifyContent="space-around" sx={{mt:1, fontSize: 14}} >
          <InputLabel sx={{fontSize: 14}} >{`Don't have an account?`} </InputLabel>
          <InputLabel  ><Typography sx={{fontSize: 14}} variant="body1" color="primary">Contact us</Typography></InputLabel>          
      </Grid>
    </form>
  )
}

export default Login