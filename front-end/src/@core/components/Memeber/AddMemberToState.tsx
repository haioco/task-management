import React, {useEffect, useState} from 'react';
import PrivateRequest from "../../../@core/api/PrivateRequest";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Skeleton from '@mui/material/Skeleton';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AddMemberToState = (props:any) => {
  const [memmberList, setMemberList] = useState<any>()
  const [memmber, setMember] = useState<any>()
  const [defaultMembers,setDfaultMembers] = useState<any>(props.users)

  useEffect(() => {
    PrivateRequest().get('/users').then((res) => {
      setMemberList(res.data.users.data)
    }).catch((err) => console.log('err', err))
  }, [])

  useEffect(() => {
    console.log('members', memmber)
    props.onChange(memmber)
  }, [memmber])

// @ts-ignore
  return (
    <div>
      {memmberList ? (
        <Autocomplete
          multiple
          onChange={(event, value:any) => setMember(value)}
          id="checkboxes-tags-demo"
          options={memmberList}
          defaultValue={defaultMembers}
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
            <TextField variant="filled" {...params} label{...props.label ? props.label : 'انتخاب اعضا'} placeholder={...props.placeholder ? props.placeholder : 'انتخاب اعضا'} />
          )}
        />
      ): (
        <Skeleton height={60}  />
      )}
    </div>
  );
};

export default AddMemberToState;
