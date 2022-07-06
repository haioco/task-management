import React from 'react'
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { FiCheckCircle } from 'react-icons/fi'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AssessmentIcon from '@mui/icons-material/Assessment'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Link from 'next/link'

const FastAccess = () => {
  return (
    <Card className={'bg-[#ffb800]'}>
      <CardContent>
        <Typography variant={'h5'} className={'ir-yekan-black primary-text-h'} gutterBottom>
          دسترسی سریع
        </Typography>
        <Typography className={'font-weight-bold'}>
          <span className={'text-light'}>خیلی سریع کاری که میخوای رو انجام بده</span>
        </Typography>
        <Divider />
        <Grid container spacing={5} className={'mt-1 mb-4'}>
          <Grid className={'hoverable'} item lg={3}>
            <Box className={'flex cursor-pointer justify-center items-center flex-col'}>
              <Link href={'/task'}>
                <Box className={'bg-white p-4 flex flex-col items-center rounded-lg'}>
                  <AssignmentIcon />
                  <span className={'text-sm mt-2'}>وظیفه</span>
                </Box>
              </Link>
            </Box>
          </Grid>
          <Grid className={'hoverable'} item lg={3}>
            <Box className={'flex justify-center items-center flex-col'}>
              <Box className={'bg-white p-4 flex flex-col items-center rounded-lg'}>
                <FiCheckCircle size={25} />
                <span className={'text-sm mt-2'}>رویداد</span>
              </Box>
            </Box>
          </Grid>
          <Grid className={'hoverable '} item lg={3}>
            <Box className={'flex justify-center items-center flex-col'}>
              <Box className={'bg-white p-4 flex flex-col items-center rounded-lg'}>
                <AssessmentIcon />
                <span className={'text-sm mt-2'}>کارنامه</span>
              </Box>
            </Box>
          </Grid>
          <Grid className={'hoverable w-10 h-10'} item lg={3}>
            <Box className={'flex cursor-pointer justify-center items-center flex-col'}>
              <Link href={'/project'}>
                <Box className={'bg-white p-4 flex flex-col items-center rounded-lg'}>
                  <ListAltIcon />
                  <span className={'text-sm mt-2'}>پــروژه </span>
                </Box>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default FastAccess
