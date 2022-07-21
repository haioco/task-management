import React, { useEffect, useState } from 'react'
import PrivateRequest from '../../../@core/api/PrivateRequest'
import { Button, Divider, Grid, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import WorkIcon from '@mui/icons-material/Work'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import LinearProgress from '@mui/material/LinearProgress'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useRouter } from 'next/router'
import ChangeTaskStatus from "../../../@core/components/tasks/ChangeTaskStatus";
const parse = require('html-react-parser');

const ShowProject = () => {
  const router = useRouter()
  const { id } = router.query
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [project, setProject] = useState<any>()
  const [tastlist, setTasklist] = useState<any>()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}
  const getProject = () => {
    PrivateRequest()
      .get(`/project/${id}`)
      .then(res => {
        console.log('res.data.data', res.data.data)
        setProject(res.data.data)
      })
      .catch(err => {
        console.log('err users', err)
      })
  }
  const getTasks = () => {
    PrivateRequest()
      .get(`/project/tasks/${id}`)
      .then(res => {
        setTasklist(res.data.data)
        console.log('res task', res.data.data)
      })
      .catch(err => {
        console.log('err lis task', err)
      })
  }
  useEffect(() => {
    getProject()
    getTasks()
  }, [])
  return (
    <div>
      {project ? (
        <Grid container>
          <Grid className={'bg-white shadow-lg p-5'} item lg={12}>
            <div className={'flex items-center justify-between'}>
              <div className={'flex items-center'}>
                <Avatar sx={{ width: 150, height: 150 }}>
                  <h1>{project.title.split('')[0]}</h1>
                </Avatar>
                <div className={'flex flex-col'}>
                  <div>
                    <Typography className={'mr-5 ir-yekan-black'} variant={'h4'}>
                      {project.title}{' '}
                    </Typography>
                  </div>
                  <div className={'mr-5 mt-2'}>
                    سرپرست :{project.supervisor.name + ' ' + project.supervisor.last_name}
                  </div>
                </div>
              </div>
              <div className={'flex flex-col'}>
                <div>مشارکت :{project.participation.user_percentage / 10}</div>
                <div className={'mt-1'}>تعداد فعالیت ها :{project.tasks}</div>
                <div className={'mt-1'}>فعالیت های انجام شده :{project.tasks}</div>
                <div className={'mt-1'}>فعالیت های انجام شده :{project.progress.completed_tasks}</div>
              </div>
            </div>
            <Divider className={'mt-5'} />
            <br />
            <br />
            <div>
              توضیحات:
              <p className={'mt-2'}> {parse(project.description)}</p>
            </div>
            <Grid className={'mt-5'} container>
              <Grid item lg={6}>
                <div className={'ir-yekan-bold'}>ناظرین پروژه</div>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {project.observers.map((item: any, index: number) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name + ' ' + item.last_name} secondary={item.email} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item lg={6}>
                <div className={'ir-yekan-bold'}>اعضای پروژه</div>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {project.members.map((item: any, index: number) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name + ' ' + item.last_name} secondary={item.email} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <br />
              <br />
              <div className={'w-full'}>
                <Divider>
                  <div className={'flex items-center'}>
                    <AccessTimeIcon className={'m-2'} />
                    وضعیت فعالیت های پروژه در یک نگاه
                  </div>
                </Divider>
              </div>

              <TableContainer className={'border-solid border-2 mt-5 border-gray-300'} component={Paper}>
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
                    {tastlist &&
                      tastlist.map((row: any) => (
                        <TableRow hover key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component='th' scope='row'>
                            {row.title}
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
                            <IconButton aria-label='delete'>
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
        </Grid>
      ) : (
        ''
      )}
    </div>
  )
}

// export const getServerSideProps = async (ctx:any) => {
//   const id = ctx.params.id
//   const project = await PrivateRequest(ctx).get(`/project/${id}`).then((res) => { return res.data.data}).catch((err) => {console.log('err users', err)})
//   const getTasks = await PrivateRequest(ctx).get(`/tasks/`).then((res) => { return res.data.tasks.data}).catch((err) => {console.log('err users', err)})
//
//   return {
//     props: {
//       project,
//       getTasks
//     }
//     }
// }

export default ShowProject
