import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import PrivateRequest from "../../../@core/api/PrivateRequest";
import {Button, Grid, LinearProgress, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import {toast} from "react-hot-toast";
import ChangeTaskStatus from "../../../@core/components/tasks/ChangeTaskStatus";

const UserProfile = () => {
  const router = useRouter()
  const [user, setuser] = useState<any>()
  const { id } = router.query
  const [value, setValue] = React.useState<number>(2)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [status, setstatus] = useState<any>()

  const userWithTask = () => {
    setValue(2)
    PrivateRequest().get(`/user/${id}`).then((res) => {
      setuser(res.data)
      console.log('res user show ', res.data)
    }).catch((err) => {
      console.log('err', err)
    })
  }
  const getTaskstatusitem = () => {
    PrivateRequest()
      .get('/tasks/status')
      .then(res => {
        setstatus(res.data.tasks)
      })
      .catch(err => console.log('err task', err))
  }

  const DeleteTask = (id: number) => {
    console.log('task id de', id)
    PrivateRequest()
      .delete(`/task/delete/${id}`)
      .then(() => {
        userWithTask()
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleUpdateTaskStatus = (id?: number, taskId?: number) => {
    setAnchorEl(null)
    toast.loading('???? ?????? ?????????????????? ?????????? ????????????')
    PrivateRequest()
      .put(`task/update/`, {
        status_id: id,
        id: taskId
      })
      .then(res => {
        if (res.status === 200) {
          toast.remove()
          userWithTask()
        }
        toast.success('?????????????????? ?????????????? ?????????? ????')
      })
      .catch(err => {
        toast.remove()
        toast.error('?????????????????? ?????????????? ?????????? ??????')
        console.log('err', err)
      })
  }

  useEffect(() => {
    userWithTask()
    getTaskstatusitem()
  }, [])



  return (
    <div>
      {user ? (
        <Grid container>
          <Grid className={'bg-white shadow-lg p-5'} item lg={12}>
            <div className={'flex items-center justify-between'}>
              <div className='flex flex-col justify-center items-center'>
                <div className='flex  items-start'>
                  <Avatar sx={{ width: 150, height: 150 }}>{user.user.name.split('')[0]}</Avatar>
                  <div className='flex flex-col items-start mt-5 justify-end'>
                    <div className='flex items-center justify-center'>
                      <Typography className={'mr-5 mt-5 ir-yekan-black'} variant={'h4'}>
                        {user.user.name}{' '}
                      </Typography>
                      <p className='mr-5 mt-5 bg-yellow-400 px-3 py-1 rounded-2xl'>{user.user.role}</p>
                    </div>
                    <div>
                      <p className='mr-5 mt-2'>???????? ?????????? : {user.user.email}</p>
                    </div>
                  </div>
                </div>
                <div className='flex mr-20 flex-col'>
                </div>
              </div>
              <div className='flex flex-col justify-around'>
                <p className='mt-4'>?????????????? ??????????</p>
              </div>
            </div>
          </Grid>
          <Grid className={'bg-white shadow-lg p-5'} item lg={12}>
            {/*<div className='w-full'>*/}
            {/*  <LinearProgress variant='determinate' value={progress} />*/}
            {/*  <div className='mt-3'>{progress} %</div>*/}
            {/*</div>*/}
          </Grid>
          <Grid className={'bg-white shadow-lg p-5'} item lg={12}>
            <div className={'flex items-center justify-between'}>
              <div className='flex flex-col'>
                <h4> ???????????? ????????????</h4>
                {/*<h6 className='mt-5'>{task.description}</h6>*/}
              </div>
              <div>
                <h4> ????????????  </h4>
                <Rating name='read-only' value={value} readOnly />
              </div>
            </div>
          </Grid>
          <Grid className={'bg-white shadow-lg text-center p-5'} item lg={12}>
            <hr />
            <TableContainer className={'border-solid border-2 border-gray-300'} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead className={'bg-gray-200 '}>
                  <TableRow>
                    <TableCell>?????????? ??????????</TableCell>
                    <TableCell align='center'>?????????? </TableCell>
                    <TableCell align='center'>???????? ??????????</TableCell>
                    <TableCell align='center'>???????????? </TableCell>
                    <TableCell align='center'>??????????</TableCell>
                    <TableCell align='center'>????????????</TableCell>
                    <TableCell align='center'>??????</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.user.tasks &&
                  user.user.tasks.map((row: any, index: number) => (
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
                        <ChangeTaskStatus onChange={() => userWithTask()} key={row.id} status_text={row.status_text} id={row.id} />
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

          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default UserProfile
