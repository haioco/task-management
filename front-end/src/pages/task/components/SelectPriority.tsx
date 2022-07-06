import React, {useEffect, useState} from 'react';
import PrivateRequest from "../../../@core/api/PrivateRequest";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SelectPriority = (props:any) => {
  const [priorityList, setPriorityList] = useState<any>()
  const [priority, setPriority] = useState<any>()

  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  useEffect(() => {
    PrivateRequest().get('/tasks/priority').then((res) => {
      console.log('res data', res.data)
      setPriorityList(res.data.tasks)
    }).catch((err) => console.log('err task', err))
  }, [])

  useEffect(() => {
    props.onChange(priority)
  }, [priority])

  return (
    <div>
      <FormControl variant="filled" className={'w-full'}>
        <InputLabel id="demo-simple-select-filled-label">  اولویت فعالیت </InputLabel>
        <Select
          labelId="demo-simpسle-select-filled-label"
          id="demo-simple-select-filled"
          value={priority}
          onChange={handleChange}
        >
          {priorityList && priorityList.map((item:any, index:number) => (
            <MenuItem key={index} value={item.id}>{item.priority_text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectPriority;
