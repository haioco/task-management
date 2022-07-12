import React, {useState} from 'react';
import AppContainer from "../../../@core/components/app-container/AppContainer";
import {Grid, TextField} from "@mui/material";

const AddUser = () => {
  const [name, setName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [mobile, setMobile] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<string>('')
  return (
    <div>
      <AppContainer title={'افزودن کاربر جدید'}>
        <Grid container>
          <Grid item lg={3}>
            <TextField
              fullWidth
              onChange={(e) => setName(e.target.value)}
              name={'name'}
              id="filled-basic"
              label=" نام "
              variant="filled"
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
              name={'name'}
              id="filled-basic"
              label=" نام خانوادگی"
              variant="filled"
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              name={'name'}
              id="filled-basic"
              label=" ایمیل "
              variant="filled"
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              onChange={(e) => setMobile(e.target.value)}
              name={'name'}
              id="filled-basic"
              label=" موبایل "
              variant="filled"
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              onChange={(e) => setMobile(e.target.value)}
              name={'name'}
              id="filled-basic"
              label=" نقش "
              variant="filled"
            />
          </Grid>
        </Grid>
      </AppContainer>
    </div>
  );
};

export default AddUser;
