import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material'
import { FiChevronLeft, FiPlus } from 'react-icons/fi'
import Link from 'next/link'
import PrivateRequest from '../../api/PrivateRequest'
import Skeleton from '@mui/material/Skeleton'

const TaskWidget = () => {
  const [tasklist, setTasklist] = useState<any>()

  useEffect(() => {
    PrivateRequest()
      .get('/tasks')
      .then(res => {
        setTasklist(res.data.tasks)
      })
      .catch(err => {
        console.log('err tasks', err)
      })
  }, [])

  return (
    <div>
      <Card className={'bg-[#eef2fb]'}>
        <Box className={'flex items-center justify-between m-5'}>
          <Box className={'bg-[#ffb800] p-1 rounded-lg'}>
            <Typography>فعالیت های من</Typography>
          </Box>
          <Box>مشاهده همه</Box>
        </Box>
        <Divider />
        {tasklist ? (
          tasklist.slice(0, 5).map((item: any, index: any) => (
            <>
              <Box className={'m-4 cursor-pointer  flex justify-between items-center h-6/12'} key={index}>
                <div>
                  <Box>
                    <Typography className={'ir-yekan-black text-black'}>{item.title}</Typography>
                  </Box>
                  <Box className={'mt-1'}>
                    <span className={'font-light'}>{item.title}</span>
                  </Box>
                </div>
                <div style={{ borderRadius: '50%' }} className={'bg-blue-200 p-1'}>
                  <Link href={`/task/show/${item.id}`}>
                    <FiChevronLeft />
                  </Link>
                </div>
              </Box>
              <Divider />
            </>
          ))
        ) : (
          <div className={'flex justify-center'}>
            <Skeleton variant='rectangular' width={210} height={118} />
          </div>
        )}
        <Box className={'mt-5 flex justify-center'}>
          <Link href={'/task'} passHref>
            <Button style={{ height: 60 }} className={'blue-grad-btn w-10/12'} variant={'contained'}>
              <FiPlus className={'ml-5'} size={25} />
              افزودن فعالیت جدید
            </Button>
          </Link>
        </Box>
        <br />
      </Card>
    </div>
  )
}

export default TaskWidget
