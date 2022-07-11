import React, {useEffect, useState} from 'react';
import {Button, Typography} from "@mui/material";
import AppContainer from "../../../@core/components/app-container/AppContainer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from "next/link";
import PrivateRequest from "../../../@core/api/PrivateRequest";
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'




const ProjectList = () => {
  const [projectList, setProkectList] = useState<any>()
  const getProjects = () => {
    PrivateRequest().get('/projects').then((res) => {
      setProkectList(res.data)
    }).catch((err) => {
      console.log('err get list project', err)
    })
  }


  const DeleteProject = (id:number) => {
    PrivateRequest().delete(`project/${id}`).then((res) => {
      console.log('res dele', res)
      getProjects()
    }).catch((err) => {
      console.log('err del project', err)
    } )
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div>
      <AppContainer title={'لیست  پروژه ها'}>
        <div className={'flex justify-between'}>
          <div>
            <Typography className={'mb-5'} variant={'h5'}>  لیست پروژه ها</Typography>
          </div>
          <div>
            <Link href={'/project'} passHref>
              <Button variant={'text'}>افزودن پروژه جدید</Button>
            </Link>
          </div>

        </div>
        <br />
        <TableContainer className={'border-solid border-2 border-gray-300'} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className={'bg-gray-200 '}>
              <TableRow  >
                <TableCell>عنوان پروژه</TableCell>
                <TableCell align="center">سرپرست </TableCell>
                <TableCell align="center">تعداد فعالیت ها</TableCell>
                <TableCell align="center">کاربران</TableCell>
                <TableCell align="center">جزئیات</TableCell>
                <TableCell align="center">حذف</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectList ? projectList.data.map((row:any) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.members.map((item:any, index:number) => (
                    <Avatar key={index}>{item.name.split('')[0]}</Avatar>
                  ))}</TableCell>
                  <TableCell align="center">
                    <Link href={`/project/show/${row.id}`}>
                      <IconButton aria-label="Visibility">
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => DeleteProject(row.id)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )): (
                <Box style={{  display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <CircularProgress />
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </AppContainer>
    </div>
  );
};

// export const getServerSideProps = async (ctx:any) => {
//   const project_list =  PrivateRequest(ctx).get('/projects').then((res) => { return res.data}).catch((err) => {console.log('err taskstatus', err)})
//
//   if (!project_list) {
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
//       projects: project_list
//     }
//   }
//
// }

export default ProjectList;
