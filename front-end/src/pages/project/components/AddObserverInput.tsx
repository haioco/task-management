import React, {useEffect, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



const AddObserverInput = (props:any)  => {
  const users = props.userslist
  const [observer, setObserver] = useState<any>()

  useEffect(() => {
    props.onChange(observer)
  },[observer])

  return (
    <div>
      <Autocomplete
        multiple
        onChange={(event, value:any) => setObserver(value)}
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
          <TextField variant="filled" {...params} label="انتخاب ناظرین پروژه " placeholder="اعضای  پروژه را انتخاب کنید" />
        )}
      />
    </div>
  );
};

export default AddObserverInput;
