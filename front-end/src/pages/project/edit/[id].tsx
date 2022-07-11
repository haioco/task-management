import React, {useEffect, useState} from 'react';
import PrivateRequest from "../../../@core/api/PrivateRequest";
import {useRouter} from "next/router";
import {Button, Grid, TextField, Typography} from "@mui/material";
import AppContainer from "../../../@core/components/app-container/AppContainer";
import AddProjectOwner from "../components/AddProjectOwner";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddUserInput from "../components/AddUserInput";
import AddObserverInput from "../components/AddObserverInput";
import TextEditorBox from "../components/Editor";
import FeatureEditorBox from "../components/Futures";
import FileUploadProject from "../components/FileUploadProject";
import toast from "react-hot-toast";

const EditProkect = (props:any) => {
  const router = useRouter()
  const {id} = router.query
  const [project, setProject] = useState<any>()

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
        advantages: features,
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
    const getTask = () => {
      PrivateRequest()
        .get(`/project/${id}`)
        .then(res => {
          console.log('res.data.data', res.data.data)
          setProject(res.data.data)
        })
        .catch(err => {
          console.log('err users', err)
        })
    }
  useEffect(() => {
    getTask()
  }, [])

  return (
    <div>
      <Grid container>
        <Grid lg={12} item>
          <AppContainer title={'ویرایش  پروژه '}>
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
            <div className={'m-2 flex justify-end'}>
              <Button className={'bg-black text-white'}>ویرایش پروژه</Button>
            </div>
          </AppContainer>
        </Grid>
      </Grid>
    </div>
  );
}

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

export default EditProkect;
