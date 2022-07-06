import React, {useEffect, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {Stack} from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const top100Films = [
  { title: 'هادی سفرزاده  ', year: 1994 },
  { title: 'علی ذوقی ', year: 1972 },
  { title: 'حسین رضایی', year: 1974 },


];

const AddUserInput = (props:any) => {
  const users = props.userslist
  const [user, setUsers] = useState<any>()

  useEffect(() => {
    props.onChange(user)
  }, [user])
  
return (
    <div>
      <Autocomplete
        multiple
        onChange={(event, value) => setUsers(value)}
        id="checkboxes-tags-demo"
        options={users}
        disableCloseOnSelect
        getOptionLabel={(option:any) => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField variant="filled" {...params} label="انتخاب اعضای پروژه " placeholder="ناظرین  پروژه را انتخاب کنید" />
        )}
      />
    </div>
  );
};

export default AddUserInput;
