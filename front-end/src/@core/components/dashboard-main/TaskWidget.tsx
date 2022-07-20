import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material'
import { FiChevronLeft, FiPlus } from 'react-icons/fi'
import Link from 'next/link'
import PrivateRequest from '../../api/PrivateRequest'
import Skeleton from '@mui/material/Skeleton'
import useSwr from 'swr'

const TaskWidget = () => {
  const getProject = () =>
    PrivateRequest()
      .get('/projects')
      .then(res => {
        return res.data.data
      })
      .catch(err => {
        console.log('err tasks', err)
        return err
      })
  const {error, data} = useSwr('projects', getProject)
  return (
    <div>
      <Card className={'bg-[#eef2fb]'}>
        <Box className={'flex items-center justify-between m-5'}>
          <Box className={'bg-[#ffb800] p-1 rounded-lg'}>
            <Typography>پروژه ها</Typography>
          </Box>
          <Box>
            <Link href={'/project/list/'}>
              مشاهده همه
            </Link>
          </Box>
        </Box>
        <Divider />
        {data && !error ? (
          data.slice(0, 5).map((item: any, index: any) => (
            <>
            <Link href={`/project/show/${item.id}`} key={index}>
            <Box className={'m-4 cursor-pointer  flex justify-between items-center h-6/12'} >
                <div>
                  <Box>
                    <Typography className={'ir-yekan-black text-black'}>{item.title}</Typography>
                  </Box>
                  <Box className={'mt-1'}>
                    <span className={'font-light'}>{item.title}</span>
                  </Box>
                </div>
                <div style={{ borderRadius: '50%' }} className={'bg-blue-200 p-1'}>
                    <FiChevronLeft />
                </div>
              </Box>
            </Link>
              <Divider />
            </>
          ))
        ) : (
          <div className={'flex justify-center'}>
            <Skeleton variant='rectangular' width={210} height={118} />
          </div>
        )}
        <Box className={'mt-5 flex justify-center'}>
          <Link href={'/project/'} passHref>
            <Button style={{ height: 60 }} className={'blue-grad-btn w-10/12'} variant={'contained'}>
              <FiPlus className={'ml-5'} size={25} />
              افزودن پروژه جدید
            </Button>
          </Link>
        </Box>
        <br />
      </Card>
    </div>
  )
}

export default TaskWidget
