import React, {useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PrivateRequest from "../../../@core/api/PrivateRequest";


const AddProject = (props:any) => {
  const [project, setProjects] = React.useState<any>();
  const [proojectlist, setProojectlist] = React.useState<any>();


  const handleChange = (event: SelectChangeEvent) => {
    setProjects(event.target.value);
  };


  useEffect(() => {
    PrivateRequest().get('/projects').then((res) => {setProojectlist(res.data.data)}).catch((err) => {console.log('err', err)})
  }, [])


  useEffect(() => {
    props.onChange(project)
  }, [project])

  return (
    <div>
      <FormControl variant="filled" className={'w-full'}>
        <InputLabel id="demo-simple-select-filled-label">انتخاب پروژه </InputLabel>
        <Select
          labelId="demo-simpسle-select-filled-label"
          id="demo-simple-select-filled"
          value={project}
          onChange={handleChange}
        >
          {proojectlist && proojectlist.map((item:any, index:number) => (
            <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default AddProject;
