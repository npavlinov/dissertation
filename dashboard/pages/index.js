import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout style={{ minHeight: '100vh' }}>

      <Navbar />


    </Layout>

  </div>
)

export default Home
