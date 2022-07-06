import React, { useEffect, useState } from 'react'
import AppContainer from '../../@core/components/app-container/AppContainer'
import PrivateRequest from '../../@core/api/PrivateRequest'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import LinearProgress from '@mui/material/LinearProgress'
import { Button } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

const TaskList = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [tasklist, setTasklist] = useState<any>()
  const [status, setstatus] = useState<any>()

  const getTasks = () => {
    PrivateRequest()
      .get('/tasks')
      .then(res => {
        setTasklist(res.data.tasks)
        console.log('res task', res.data.tasks)
      })
      .catch(err => {
        console.log('err lis task', err)
      })
  }

  const getTaskstatusitem = () => {
    PrivateRequest()
      .get('/tasks/status')
      .then(res => {
        console.log('res data', res.data)
        setstatus(res.data.tasks)
      })
      .catch(err => console.log('err task', err))
  }
  useEffect(() => {
    getTasks()
    getTaskstatusitem()
  }, [])

  /// handle transactios
  const DeleteTask = (id: number) => {
    PrivateRequest()
      .delete(`/task/${id}`)
      .then(res => {
        console.log('res del', res)
        getTasks()
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  const handleUpdateTaskStatus = (id?: number, taskId?: number) => {
    setAnchorEl(null)
    toast.loading('در حال بروزرسانی وضعیت فعالیت')
    PrivateRequest()
      .put(`task/${id}`, {
        status_id: id,
        id: taskId
      })
      .then(res => {
        if (res.status === 200) {
          toast.remove()
          getTasks()
        }
        toast.success('بروزرسانی فعالعیت انجام شد')
      })
      .catch(err => {
        toast.remove()
        toast.error('بروزرسانی فعالعیت انجام نشد')
        console.log('err', err)
      })
  }

  /// end

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <AppContainer title={'لیست  فعالیت ها'}>
        <TableContainer className={'border-solid border-2 border-gray-300'} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className={'bg-gray-200 '}>
              <TableRow>
                <TableCell>عنوان پروژه</TableCell>
                <TableCell align='center'>پروژه </TableCell>
                <TableCell align='center'>درصد انجام</TableCell>
                <TableCell align='center'>اولویت </TableCell>
                <TableCell align='center'>وضعیت</TableCell>
                <TableCell align='center'>مشاهده</TableCell>
                <TableCell align='center'>حذف</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasklist &&
                tasklist.map((row: any, index: number) => (
                  <TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {row.title}
                    </TableCell>
                    <TableCell align='center'>{row.project_id}</TableCell>
                    <TableCell align='center'>
                      <LinearProgress value={50} />
                    </TableCell>
                    <TableCell align='center'>{row.priority_text}</TableCell>
                    <TableCell align='center'>
                      <Button
                        id='basic-button'
                        key={row.id}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <p className={'text-yellow-500 font-bold'}>{row.status_text}</p>
                      </Button>
                      <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button'
                        }}
                      >
                        {status
                          ? status.map((status_item: any, index: number) => (
                              <MenuItem key={index} onClick={() => handleUpdateTaskStatus(status_item.id, row.id)}>
                                {status_item.status_text}
                              </MenuItem>
                            ))
                          : 'loading'}
                      </Menu>
                    </TableCell>
                    <TableCell align='center'>
                      <Link href={`/task/show/${row.id}`}>
                        <IconButton aria-label='VisibilityIcon'>
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => DeleteTask(row.id)} aria-label='delete'>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AppContainer>
    </div>
  )
}

// export const getServerSideProps = async (ctx:any) => {
//
//   const tasks = await PrivateRequest(ctx).get('/tasks').then((res) => { return res.data}).catch((err) => {console.log('err users', err)})
//
//
//   if (!tasks) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }
//
//   return {
//     props: {
//       tasks,
//     }
//   }
// }

export default TaskList
