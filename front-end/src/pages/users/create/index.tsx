import React, {useState} from 'react';
import AppContainer from "../../../@core/components/app-container/AppContainer";
import {Button, Grid, TextField} from "@mui/material";
import PrivateRequest from "../../../@core/api/PrivateRequest";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";

const AddUser = () => {
  const [name, setName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [mobile, setMobile] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<string>('')

  const router = useRouter()

  const SubmitUser = () => {
    const data = {
      name,
      last_name:lastName,
      email,
      mobile,
      password,
      role
    }

    PrivateRequest().post('/user', data).then((res) => {
      if (res.status === 200) {
        toast.success('کاربر مورد نظر ایجاد شد')
        router.push('/users')
      }
    }).catch((err) => {
      console.log('err', err)
    })
  }
  return (
    <div>
      <AppContainer title={'افزودن کاربر جدید'}>
        <Grid container spacing={5}>
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
              name={'email'}
              type={'email'}
              id="filled-basic"
              label=" ایمیل "
              variant="filled"
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              onChange={(e) => setMobile(e.target.value)}
              name={'mobile'}
              id="filled-basic"
              label=" موبایل "
              variant="filled"
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              onChange={(e) => setRole(e.target.value)}
              name={'name'}
              id="filled-basic"
              label=" نقش "
              variant="filled"
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              name={'name'}
              id="filled-basic"
              label=" رمز عبور "
              variant="filled"
            />
          </Grid>
        </Grid>
        <div className={'flex justify-end m-2'}>
          <Button onClick={SubmitUser} className={'bg-black text-white'}>اضافه کردن کاربر</Button>
        </div>
      </AppContainer>
    </div>
  );
};

export default AddUser;
