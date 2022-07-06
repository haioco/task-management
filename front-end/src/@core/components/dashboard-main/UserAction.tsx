import React from 'react'
import { Grid, Typography } from '@mui/material'
import FadeIn from 'react-fade-in'
import Memos from './Memos'
import Status from './Status'
import FastAccess from './FastAccess'
import Tasks from './Tasks'
import TaskWidget from './TaskWidget'

const UserAction = () => {
  return (
    <FadeIn>
      <Typography className={'font-black flex items-center text-gray-400'} variant={'h4'}>
        امروز قصد انجام چه کاری رو داری
        <p className={'m-3 primary-text-h font-bold'}>هادی</p>
        عزیز؟
      </Typography>
      <br />
      <Grid container className={'mb-5'} spacing={5}>
        <Grid item lg={4}>
          <TaskWidget />
        </Grid>
        <Grid item lg={4}>
          <FastAccess />
        </Grid>
        <Grid item lg={4}>
          <Status />
        </Grid>
      </Grid>
      <Tasks />
      <br />
      <Memos />
      <br />
    </FadeIn>
  )
}

export default UserAction
