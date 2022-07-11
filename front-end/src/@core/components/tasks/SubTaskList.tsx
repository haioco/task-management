import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import LinearProgress from "@mui/material/LinearProgress";
import ChangeTaskStatus from "./ChangeTaskStatus";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "react-loading-skeleton";
import PrivateRequest from "../../api/PrivateRequest";
import {toast} from "react-hot-toast";
import {Typography} from "@mui/material";



const SubTaskList = ({ tasklist, onChange } : {tasklist: [{}] , onChange:any}) => {

  const reloadTask = () => {
    onChange()
  }
  const DeleteTask = (id: number) => {
    PrivateRequest()
      .delete(`/task/delete/${id}`)
      .then(res => {
        toast.success('این فعالیت حذف شد')
        console.log('res del', res)
      })
      .catch(err => {
        toast.error('این فعالیت حذف نشد')
        console.log('err', err)
      })
  }
  return (
    <div>
      <Typography className={'m-5'} component={'h3'}>
        لیست فعالیت های زیر شاخه
      </Typography>
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
                  <ChangeTaskStatus onChange={() => reloadTask()} key={row.id} status_text={row.status_text} id={row.id} />
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
            )) }
          </TableBody>
        </Table>
      </TableContainer>
      {!tasklist && <Skeleton className={'w-full'} height={120} />}
    </div>
  );
};

export default SubTaskList;
