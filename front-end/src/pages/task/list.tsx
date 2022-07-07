import React, { useEffect, useState} from 'react'
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
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import ChangeTaskStatus from 'src/@core/components/tasks/ChangeTaskStatus'

const TaskList = () => {
  const [tasklist, setTasklist] = useState<any>()

  const getTasks = () => {
    PrivateRequest()
      .get('/tasks')
      .then(res => {
        setTasklist(res.data.tasks)
      })
      .catch(err => {
        console.log('err lis task', err)
      })
  }

  useEffect(() => {
    getTasks()
  }, [])

  /// handle transactios
  const DeleteTask = (id: number) => {
    PrivateRequest()
      .delete(`/task/delete/${id}`)
      .then(res => {
        toast.success('این فعالیت حذف شد')
        console.log('res del', res)
        getTasks()
      })
      .catch(err => {
        toast.error('این فعالیت حذف نشد')
        console.log('err', err)
      })
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
                <TableCell align='center'>ویرایش</TableCell>
                <TableCell align='center'>حذف</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasklist &&
                tasklist.map((row: any, index: number) => (
                  <TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {row.title} {row.id}
                    </TableCell>
                    <TableCell align='center'>{row.project_id}</TableCell>
                    <TableCell align='center'>
                      <LinearProgress value={50} />
                    </TableCell>
                    <TableCell align='center'>{row.priority_text}</TableCell>
                    <TableCell align='center'>
                      <ChangeTaskStatus onChange={() => getTasks()} key={row.id} status_text={row.status_text} id={row.id} />
                    </TableCell>
                    <TableCell align='center'>
                      <Link href={`/task/show/${row.id}`}>
                        <IconButton aria-label='VisibilityIcon'>
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      <Link href={`/task/edit/${row.id}`}>
                        <IconButton  aria-label='edit'>
                          <EditIcon />
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
