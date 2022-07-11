import React, {useEffect, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {Button, Grid} from "@mui/material";
import Fade from '@mui/material/Fade';
import Tasks from "../../../pages/task";
import PrivateRequest from "../../api/PrivateRequest";
import SubTaskList from "./SubTaskList";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  height: '90%',
  overflow: 'scroll',
  transform: 'translate(-50%, -50%)',
  width: 1050,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none'
};

const SubTask = ({id, task_name} : {id: any, task_name:string}) => {
  const [taskChildren, setTaskChildren] = useState<any>()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getTaskChildren = () => {
    PrivateRequest().get(`task/${id}/children`).then((res) => {
      setTaskChildren(res.data.tasks)
      console.log('setTaskChildren(res.data.tasks)', res.data.tasks)
    }).catch((err) => {
      console.log('err get child', err)
    })
  }

  useEffect(() => {
    getTaskChildren()
  }, [])
  return (
      <Grid className={'bg-white shadow-lg text-center p-5'} item lg={12}>
        <hr />
        {taskChildren && taskChildren.length <= 0 ? (
          <div>
            <div className='mt-5'>این فعالیت هیچ زیر کاری ندارد میتوانید هم اکنون اضافه کنید</div>
            <Button onClick={handleOpen} size='large' className='bg-black mt-5 text-center text-white'>
              افرودن زیر تسک جدید
            </Button>
          </div>
        ) : (
          <div>
            <SubTaskList tasklist={taskChildren} onChange={getTaskChildren} />
          </div>
        ) }

        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Tasks parent_id={id} parent_name={task_name} />
            </Box>
          </Fade>
        </Modal>
      </Grid>
  );
};

export default SubTask;
