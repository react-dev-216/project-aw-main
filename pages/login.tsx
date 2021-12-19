import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from '../components/Login'

const LoginPage: NextPage = () => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
      <Login />
    </div>
  )
}

export default LoginPage
