import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {toast} from "react-hot-toast";
import PrivateRequest from "../../../@core/api/PrivateRequest";

const ChangeTaskStatus = ({id,status_text,onChange}: {id:any,status_text:string, onChange:any}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [status, setstatus] = useState<any>()


  const getTaskstatusitem = () => {
    PrivateRequest()
      .get('/tasks/status')
      .then(res => {
        setstatus(res.data.tasks)
      })
      .catch(err => console.log('err task', err))
  }

  const handleUpdateTaskStatus = (id?: number, taskId?: number) => {
    setAnchorEl(null)
    toast.loading('در حال بروزرسانی وضعیت فعالیت')
    PrivateRequest()
      .put(`task/update`, {
        status_id: id,
        id: taskId
      })
      .then(res => {
        if (res.status === 200) {
          toast.remove()
          onChange('ok')

          // getTasks()
        }
        toast.success('بروزرسانی فعالعیت انجام شد')
      })
      .catch(err => {
        toast.remove()
        toast.error('بروزرسانی فعالعیت انجام نشد')
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
  useEffect(() => {
    getTaskstatusitem()
  }, [])

return (
    <div>
      <Button
        id='basic-button'
        key={id}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <p className={'text-info font-bold'}>{status_text}</p>
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
            <MenuItem key={index} onClick={() => handleUpdateTaskStatus(status_item.id, id)}>
              {status_item.status_text}
            </MenuItem>
          ))
          : 'loading'}
      </Menu>
    </div>
  );
};

export default ChangeTaskStatus;
