import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppContainer from 'src/@core/components/app-container/AppContainer'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import PrivateRequest from 'src/@core/api/PrivateRequest'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Link from 'next/link'
import {toast} from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState<any>()

  const deletUser = (id:number | string) => {
    PrivateRequest().delete(`/user/${id}`).then((res) => {
      console.log('res delete', res)
      getUsers()
      if (res.status === 200) toast.success('کاربر مورد نظر حذف شد')
    }).catch((err) => {
      toast.error('کاربر حذف نشد')
      console.log('err', err)
    })
  }
  const getUsers = () => {
    PrivateRequest().get('/users')
      .then(res => {
        setUsers(res.data.users)
        console.log('re user', res.data.users)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  useEffect(() => {
    getUsers()

  }, [])

  return (
    <AppContainer title='لیست کاربران'>
      <TableContainer className={'border-solid border-2 border-gray-300'} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead className={'bg-gray-200 '}>
            <TableRow>
              <TableCell> کاربر</TableCell>
              <TableCell align='center'>تعداد فعالیت ها </TableCell>
              <TableCell align='center'> وضعیت </TableCell>
              <TableCell align='center'>پروفایل</TableCell>
              <TableCell align='center'>حذف</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.data.map((row: any, index: number) => (
                <TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='center'>not exist</TableCell>
                  <TableCell align='center'>
                    <CheckCircleIcon className='text-teal-500' />
                  </TableCell>
                  <TableCell align='center'>
                    <Link href={`/users/profile/${row.id}`}>
                      <IconButton aria-label='VisibilityIcon'>
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton onClick={() => deletUser(row.id)} aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AppContainer>
  )
}

// Users.getInitialProps = async () => {
//   const statrs = PrivateRequest()
//     .get('/users')
//     .then(res => {
//       console.log('re user', res.data.users)
//     })
//     .catch(err => {
//       console.log('err', err)
//     })
//   return { stars: statrs }
// }

export default Users
