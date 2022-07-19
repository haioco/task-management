import React, {useEffect, useState} from 'react';
import PrivateRequest from "../../../@core/api/PrivateRequest";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const TaskStatus = (props:any) => {
  const [tastStatusList, setTaskStatusList] = useState<any>()
  const [taskStatus, setTaskStatus] = useState<any>(props.status)

  const handleChange = (event: SelectChangeEvent) => {
    console.log('event.target.value', event.target.value)
    setTaskStatus(event.target.value);
  };

  useEffect(() => {
    PrivateRequest().get('/tasks/status').then((res) => {
      setTaskStatusList(res.data.tasks)
    }).catch((err) => {
      console.log('err', err)
    })
  }, [])

  useEffect(() => {
    props.onChange(taskStatus)
  }, [])

  return (
    <div>
      <FormControl variant="filled" className={'w-full'}>
        <InputLabel id="demo-simple-select-filled-label"> وضعیت فعالیت </InputLabel>
        <Select
          labelId="demo-simpسle-select-filled-label"
          id="demo-simple-select-filled"
          value={taskStatus}
          onChange={handleChange}
        >
          {tastStatusList && tastStatusList.map((item:any, index:number) => (
            <MenuItem key={index} value={item.id}>{item.status_text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default TaskStatus;
