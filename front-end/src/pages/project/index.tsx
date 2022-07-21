import React, {useState} from 'react';
import {Box, Button, Card, Divider, TextField, Typography} from "@mui/material";
import AppContainer from "../../@core/components/app-container/AppContainer";
import Grid from '@mui/material/Grid';
import {FiChevronLeft, FiPlus} from "react-icons/fi";
import TextEditorBox from "./components/Editor";
import FeatureEditorBox from "./components/Futures";
import AddUserInput from "./components/AddUserInput";
import FileUploadProject from "./components/FileUploadProject";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select'
import AddObserverInput from "./components/AddObserverInput";
import AddProjectOwner from "./components/AddProjectOwner";
import Link from "next/link";
import PrivateRequest from "../../@core/api/PrivateRequest";
import toast from 'react-hot-toast'



const Project = (props:any) => {

  const [importance, setimportance] = React.useState('1');
  const [observers, setObservers] = useState<any>()
  const [members, setMembers] = useState<any>()
  const [description, setDescription] = useState<any>()
  const [features, setfeatures] = useState<any>()
  const [owner, setOwner] = useState<any>()
  const [title, setTitle] = useState<any>()
  const [Loading, setLoading] = useState<boolean>(false)

  const {Users, taskpriofities} = props
  const usres = Users.users.data
  const tasks =  taskpriofities

  const handleChangeDescription = (event:any) => {
    setDescription(event)
  };
  const handleChangeFeatures = (event:any) => { setfeatures(event)};

  const handleSubmit = () => {
    const converTOarrObservers: any = []
    const converTOarrMembers: any = []

    observers && observers.length > 0 && observers.map((item:any) => {
      converTOarrObservers.push(item.id)
    })
    members && members.length > 0 && members.map((item:any) => {
      converTOarrMembers.push(item.id)
    })

    const data =  {
      title: title,
      supervisor_id: owner,
      priority_id: importance,
      members: converTOarrMembers,
      observers: converTOarrObservers,
      description: description,
      advantages: [features],
      department_id: '1'
    }
    setLoading(true)
    PrivateRequest().post('/project', data).then(() => {
      setLoading(false)
      toast.success('پروژه جدید اضاقه شد ')
    }).catch((err) => {
      setLoading(false)
      toast.error(err.response.data.message)
      console.log('err create', err.response.data.message)
    })
  }


  // @ts-ignore
  return (
    <Grid container spacing={5}>
      <Grid lg={3} sm={12} md={12} item>
        <Card className={'bg-[#eef2fb]'}>
          <Box className={'flex items-center justify-between m-5'}>
            <Box className={'bg-[#ffb800] p-1 rounded-lg'}>
              <Typography>
                لیست پروژه ها
              </Typography>
            </Box>
            <Box>
              <Link href={'/project/list'} passHref>
                مشاهده همه
              </Link>
            </Box>
          </Box>
          <Divider />
          {props.project_list.data.map((item:any, index:any) => (
            <>
              <Box  key={index}>
                <Link href={`/project/show/${item.id}`} passHref>
                  <div className={'m-4 cursor-pointer  flex justify-between items-center h-6/12'}>
                    <div>
                      <Box>
                        <Typography className={'ir-yekan-black text-black'}>
                          {item.title}
                        </Typography>
                      </Box>
                      <Box className={'mt-1'}>
                        <span className={'font-light'}>{item.status}</span>
                      </Box>
                    </div>
                    <div style={{ borderRadius: '50%' }} className={'bg-blue-200 p-1'}>
                      <FiChevronLeft />
                    </div>
                  </div>
                </Link>
              </Box>
              <Divider />
            </>
          ))}
          <Box className={'mt-5 flex justify-center'}>
            <Button onClick={() => handleSubmit()} style={{ height: 60 }} className={'blue-grad-btn w-10/12'} variant={'contained'}>
              <FiPlus className={'ml-5'} size={25}/>
              {!Loading ? 'افزودن' : 'در حال ایجاد'}
            </Button>
          </Box>
          <br />
        </Card>
      </Grid>
      <Grid lg={9} item>
        <AppContainer title={'پروژه ها'}>
          <Typography className={'mb-5'} variant={'h5'}>افزودن پروژه جدید</Typography>
          <br />
          <Grid container item spacing={5}>
            <Grid item lg={4} >
              <TextField fullWidth onChange={(e) => setTitle(e.target.value)} name={'project_title'}  id="filled-basic" label="عنوان پروژه" variant="filled" />
            </Grid>
            <Grid item lg={4} >
              <AddProjectOwner
                userslist={usres}
                onChange={(owner:any) => setOwner(owner)}
              />
            </Grid>
            <Grid item lg={4} >
              <FormControl variant="filled" className={'w-full'}>
                <InputLabel id="demo-simple-select-filled-label">اهمیت پروژه</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={importance}
                  onChange={(event, value:any) => setimportance(value.props.value)}
                >
                  {tasks.map((item:any, index:number) => (
                    <MenuItem key={index} value={item.id}>{item.priority_text}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6}>
              <AddUserInput
                userslist={usres}
                onChange={(members:any) => setMembers(members)}
              />
            </Grid>
            <Grid item lg={6}>
              <AddObserverInput
                onChange={(observers:any) => setObservers(observers)}
                userslist={usres}
              />
            </Grid>
            <Grid item lg={6}>
              <TextEditorBox
                onChange={handleChangeDescription}
              />
            </Grid>
            <Grid item lg={6}>
              <FeatureEditorBox
                onChange={handleChangeFeatures}
              />
            </Grid>
            <Grid item lg={12}>
              <FileUploadProject />
            </Grid>
          </Grid>
        </AppContainer>
      </Grid>
    </Grid>
  );
};


export const getServerSideProps = async (ctx:any) => {

  const Users = await PrivateRequest(ctx).get('/users').then((res) => { return res.data}).catch((err) => {console.log('err users', err)})
  const taskStatus = await PrivateRequest(ctx).get('/tasks/status').then((res) => { return res.data}).catch((err) => {console.log('err taskstatus', err)})
  const taskpriofities = await PrivateRequest(ctx).get('/tasks/priority').then((res) => { return res.data.tasks}).catch((err) => {console.log('err taskstatus', err)})
  const project_list = await PrivateRequest(ctx).get('/projects').then((res) => { return res.data}).catch((err) => {console.log('err taskstatus', err)})


  if (!Users && !taskStatus && !taskpriofities && !project_list) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      Users,
      taskStatus,
      taskpriofities,
      project_list
    }
  }
}

export default Project;
