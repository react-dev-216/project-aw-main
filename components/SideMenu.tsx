import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from '../assets/svg/logo.svg';
import LinkSvg from '../assets/svg/link.svg';
import {
  Container, Box, Typography, Grid 
} from '@mui/material';

const SideMenu = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: 255,
        height: '100%'        
      }}
    >
      <Container sx={{display: 'flex', alignItems: 'center', py:4, px:4}}>
        <Image src={Logo} alt='logo'  width={48} height={48} />
        <Typography variant="body1" sx={{mx:1.5, fontSize:19, fontWeight:700, color:'#A4A6B3'}}>Best Company</Typography>
      </Container>
      <Grid container sx={{background: '#9fa2b414', py:2.2, px:4,borderLeft:3,borderLeftColor:'secondary.main' }}>
        <Image src={LinkSvg} alt='link'  width={16} height={11} />
        <Typography sx={{fontSize: 16, fontWeight: 400, mx:3}} color="secondary">Generate Links</Typography>
      </Grid>
      
    </Box>
  )
}

export default SideMenu