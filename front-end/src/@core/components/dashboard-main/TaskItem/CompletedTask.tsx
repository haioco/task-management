import React, { useEffect, useState } from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import SquareIcon from '@mui/icons-material/Square'
import PrivateRequest from '../../../api/PrivateRequest'
import Link from 'next/link'

const CompletedTask = () => {
  const [completedTask, setCompletedTask] = useState<any>()

  const getCompletedTask = () => {
    PrivateRequest()
      .get('/statuses/tasks')
      .then(res => {
        setCompletedTask(res.data.tasks_statuses['kaml-shd'])
      })
      .catch(err => {
        console.log('err load status', err)
      })
  }
  useEffect(() => {
    getCompletedTask()
  }, [])

  return (
    <div>
      <div className={'flex justify-between mb-5'}>
        <div>
          <Typography variant={'h5'} className={'ir-yekan-black primary-text-h'} gutterBottom>
            وظیفه ها
          </Typography>
        </div>
        <div>
          <Button variant={'text'}>مشاهده همه</Button>
        </div>
      </div>
      <div className={'bg-[#00bc8b] p-1 rounded-t-lg w-24 text-center'}>
        <span className={'text-white '}>نکمیل شده</span>
      </div>
      <TableContainer className={'shadow-md'} component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead className={'bg-[#e6edfc]'}>
            <TableRow>
              <TableCell> وظیفه</TableCell>
              <TableCell align='center'>پروژه</TableCell>
              <TableCell align='center'>اولویت</TableCell>
              <TableCell align='center'>تاریخ انجام</TableCell>
              <TableCell align='center'> شناسه</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedTask
              ? completedTask.map((row: any, index: number) => (
                  <Link key={index} href={`task/show/${row.id}`}>
                    <TableRow className='cursor-pointer' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        <div className={'flex items-center'}>
                          <SquareIcon style={{ color: '#00bc8b' }} className={'w-4 ml-2 h-4'} />
                          {row.title}
                        </div>
                      </TableCell>
                      <TableCell align='center'>{row.calories}</TableCell>
                      <TableCell align='center'>{row.priority_text}</TableCell>
                      <TableCell align='center'>{row.deadline}</TableCell>
                      <TableCell align='center'>{row.id}</TableCell>
                    </TableRow>
                  </Link>
                ))
              : 'در حال بارگیری'}
          </TableBody>
        </Table>
      </TableContainer>
      {completedTask && completedTask.length <= 0 && (
        <div className='mt-5 text-center'>:| فعالیت در حال انجامی وجود ندارد</div>
      )}
    </div>
  )
}

export default CompletedTask
