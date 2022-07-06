import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper'
import SquareIcon from '@mui/icons-material/Square'
import PrivateRequest from 'src/@core/api/PrivateRequest'
import Link from 'next/link'

const InProgressTask = () => {
  const [inProgressTask, setInProgressTask] = useState<any>()

  const getInprogressTask = () => {
    PrivateRequest()
      .get('/statuses/tasks')
      .then(res => {
        setInProgressTask(res.data.tasks_statuses['drhal-angam'])
      })
      .catch(err => {
        console.log('err load status', err)
      })
  }

  useEffect(() => {
    getInprogressTask()
  }, [])

  return (
    <div>
      <div className={'flex items-center'}>
        <div className={'bg-[#0f5ef7] p-1 rounded-t-lg w-28 text-center'}>
          <span className={'text-white '}>در حال انجام </span>
        </div>
        <div className={'mr-2'}>
          <p className={'text-sm text-gray'}>{InProgressTask && InProgressTask.length} وظیفه</p>
        </div>
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
            {inProgressTask ? (
              inProgressTask.map((row: any, index: number) => (
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
            ) : (
              <div className='flex justify-center p-5'>
                <p>در حال بارگیری</p>
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {inProgressTask && inProgressTask.length <= 0 && (
        <div className='mt-5 text-center'>:| فعالیت در حال انجامی وجود ندارد</div>
      )}
    </div>
  )
}

export default InProgressTask
