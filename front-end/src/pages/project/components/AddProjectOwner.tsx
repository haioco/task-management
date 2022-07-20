import React, {useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const AddUserInput = (props:any) => {
  const [owner, setOwner] = React.useState<any>();

  const users = props.userslist
  const handleChange = (event: SelectChangeEvent) => {
    setOwner(event.target.value);
  };
  console.log('userslist', props.userslist)
  useEffect(() => {
    props.onChange(owner)
  }, [owner])
  console.log('props.defaultOwners', props.defaultOwners)
return (
    <div>
      <FormControl variant="filled" className={'w-full'}>
        {props.defaultOwners && props.defaultOwners.id}
        <InputLabel id="demo-simple-select-filled-label">سرپرست پروژه</InputLabel>
        <Select
          labelId="demo-simpسle-select-filled-label"
          id="demo-simple-select-filled"
          defaultValue={props.defaultOwners}
          onChange={handleChange}
        >
          {users?.map((item:any, index:number) => (
            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default AddUserInput;
