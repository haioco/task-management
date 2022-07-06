import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import PrivateRequest from '../../api/PrivateRequest'

const Status = () => {
  const [status, setStatus] = useState<any>()
  const getStatus = () => {
    PrivateRequest()
      .get('/statuses/tasks')
      .then(res => {
        console.log('res.data', res.data)
        setStatus(res.data.tasks_statuses)
      })
      .catch(err => {
        console.log('err load status', err)
      })
  }
  useEffect(() => {
    getStatus()
  }, [])
  const DataStatus = [
    { id: 1, title: 'بک لاگ', rate: status ? status['bk-lag'].length : '' },
    { id: 2, title: 'برای انجام', rate: status ? status['bray-angam'].length : '' },
    { id: 3, title: '  در حال انجام ', rate: status ? status['drhal-angam'].length : '' },
    { id: 4, title: '  دیر شده', rate: status ? status['dr-antthar'].length : '' },
    { id: 5, title: ' کامل شده ', rate: status ? status['kaml-shd'].length : '' },
    { id: 6, title: ' معلق  ', rate: status ? status['knsl-shdh'].length : '' },
    { id: 7, title: 'بررسی  ', rate: status ? status['nyaz-bh-brrsy'].length : '' },
    { id: 8, title: 'ساعت کار', rate: status ? status['bsth-shd'].length : '' }
  ]

  return (
    <Card className={'bg-[#e4e8f3]'}>
      <CardContent>
        <Typography variant={'h5'} className={'ir-yekan-black primary-text-h'} gutterBottom>
          وضعیت فعلی
        </Typography>
        <Divider />
        <Box className={''}>
          <br />
          <Grid className={''} container spacing={2}>
            {status &&
              DataStatus?.map((item, index) => (
                <Grid key={index} item lg={3}>
                  <div
                    className={
                      'flex hover:shadow-md flex-col justify-center bg-white p-4 w-12/12 h-9/12 text-center rounded-2xl items-center'
                    }
                  >
                    <div>
                      <Typography className={'ir-yekan-black text-black'} variant={'h5'}>
                        {item.rate}
                      </Typography>
                    </div>
                    <div className={' text-center'} style={{ width: '90px' }}>
                      <span style={{ fontSize: 12 }}>{item.title}</span>
                    </div>
                  </div>
                </Grid>
              ))}
          </Grid>
          <br />
        </Box>
      </CardContent>
    </Card>
  )
}

export default Status
