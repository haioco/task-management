import React, { useEffect } from 'react'
import PrivateRequest from '../../../@core/api/PrivateRequest'
import { Button, Grid, LinearProgress, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import { useRouter } from 'next/router'

const ShowTask = () => {
  const [task, setTask] = React.useState<any>()
  const [value, setValue] = React.useState<number>(2)
  const router = useRouter()
  const { id } = router.query
  const [progress, setProgress] = React.useState(25)

  const showTask = () => {
    setValue(2)
    setProgress(25)
    PrivateRequest()
      .get(`/task/${id}`)
      .then(res => {
        setTask(res.data.task)
      })
      .catch(err => {
        console.log('err users', err)
      })
  }

  useEffect(() => {
    showTask()
  }, [])

  return (
    <div>
      {task ? (
        <Grid container>
          <Grid className={'bg-white shadow-lg p-5'} item lg={12}>
            <div className={'flex items-center justify-between'}>
              <div className='flex flex-col justify-center items-center'>
                <div className='flex  items-start'>
                  <Avatar sx={{ width: 150, height: 150 }}>H</Avatar>
                  <div className='flex items-center mt-5 justify-center'>
                    <Typography className={'mr-5 mt-5 ir-yekan-black'} variant={'h4'}>
                      {task.title}{' '}
                    </Typography>
                    <p className='mr-5 mt-2 bg-yellow-400 p-2 rounded-2xl'>{task.status_text}</p>
                  </div>
                </div>
                <div className='flex mr-20 flex-col'>
                  <p>اهمیت اانجام فعالیت {task.priority_text}</p>
                  <p className='mt-1'> امتیاز فعالیت {task.score}</p>
                </div>
              </div>
              <div className='flex flex-col justify-around'>
                <p>شروع فعالیت : {task.start_at}</p>
                <p className='mt-4'>پایان فعالیت : {task.deadline}</p>
                <p className='mt-4'> زمان تخمینی فعالیت : {task.estimated_time} ساعت</p>
                <p className='mt-4'> پایان فعالیت : {task.end_at} </p>
              </div>
            </div>
          </Grid>
          <Grid className={'bg-white shadow-lg p-5'} item lg={12}>
            <div className='w-full'>
              <LinearProgress variant='determinate' value={progress} />
              <div className='mt-3'>{progress} %</div>
            </div>
          </Grid>
          <Grid className={'bg-white shadow-lg p-5'} item lg={12}>
            <div className={'flex items-center justify-between'}>
              <div className='flex flex-col'>
                <h4> جزئیات فعالیت</h4>
                <h6 className='mt-5'>{task.description}</h6>
              </div>
              <div>
                <h4> امتیاز فعالیت </h4>
                <Rating name='read-only' value={value} readOnly />
              </div>
            </div>
          </Grid>
          <Grid className={'bg-white shadow-lg text-center p-5'} item lg={12}>
            <hr />
            <div className='mt-5'>این فعالیت هیچ زیر کاری ندارد میتوانید هم اکنون اضافه کنید</div>
            <Button size='large' className='bg-black mt-5 text-center text-white'>
              افرودن زیر تسک جدید
            </Button>
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  )
}

// export const getServerSideProps = async (ctx: any) => {
//   console.log('ctx route', ctx.params.id)

//   if (!showTask) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       showTask
//     }
//   }
// }

export default ShowTask
