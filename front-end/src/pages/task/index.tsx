import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import AppContainer from "../../@core/components/app-container/AppContainer";
import AddProject from "./components/AddProject";
import SelectPriority from "./components/SelectPriority";
import AddMember from "./components/AddMember";
import TaskStatus from "./components/TaskStatus";
import PrivateRequest from "../../@core/api/PrivateRequest";
import {toast} from "react-hot-toast";
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import Link from "next/link";


const Tasks = ({parent_id, parent_name} : {parent_id?: number | string , parent_name?: string}) => {
  const [title, setTitle] = useState<any>()
  const [project, setProject] = useState<any>()
  const [priority, setPriority] = useState<any>()
  const [proficiency, setProficiency] = useState<any>()
  // const [proficiencyEstimated, setProficiencyEstimated] = useState<any>()
  // const [level, setLevel] = useState<any>(1)
  const [taskStatus, setTaskStatus] = useState<any>()
  const [time, setTime] = useState<any>()
  const [timeEstimated, setTimeEstimated] = useState<any>()
  const [description, setDescription] = useState<any>()
  const [members, setMembers] = useState<any>()
  const [score, setScore] = useState<any>()
  const [file, setFile] = useState<string | Blob>()
  const handleSubmitTask = () => {
    const converTOarrMembers: any = []


    members && members.length > 0 && members.map((item:any) => {
      converTOarrMembers.push(item.id)
    })
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const dataTask  = {
      title: title,
      score: score,
      time: time,
      parent_task_id: parent_id ? parent_id : null,
      time_estimated: timeEstimated,
      project_id: project,
      priority_id: priority,
      task_members: converTOarrMembers,
      proficiency: parseInt(proficiency),
      status_id: taskStatus,
      description: description
    }
    toast.loading('???? ?????? ?????????? ????????????')
    PrivateRequest().post('/task/store', dataTask).then((res) => {
      console.log('task store', res.data.task.id)
      if (res.status === 200) {
          if (file) {
            toast.loading('???? ?????? ???????????????? ????????')
            const formData = new FormData();
            formData.append('file', file as File)
            formData.append('task_id', res.data.task.id)
            PrivateRequest().post('/task/file/upload', formData, config).then((res) => {
              toast.remove()
              toast.success('???????? ???????????????? ????')
            }).catch((err) => {
              toast.remove()
              toast.error( '???????? ???????????????? ??????')
              console.log('err file upload', err)
            })
          }
          toast.remove()
         toast.success('???????????? ???????? ?????????? ????   ')
      }
    }).catch((err) => {
      toast.remove()
      toast.error(err.response.data.error)
      console.log('err submit task', err)
    })
  }
  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const fileList  = e.target.files
    if (!fileList) return
    setFile(fileList[0])
  }


  return (
    <div>
      <Grid container>
        <Grid lg={12} item>
          <AppContainer title={'???????????? ???????????? '}>
            <div className={'flex justify-between'}>
              <Typography className={'mb-5'} variant={'h5'}> ???????????? ???????????? ????????
                {parent_name && ' ????????  ' + parent_name + ' '}
                {parent_id && ' ' + parent_id + ' '}
              </Typography>

              <Link href='/task/list'>
                <Button variant={'text'} className={'mb-5'}> ???????? ???????????? ????</Button>
              </Link>

            </div>
            <br />
            <Grid container item spacing={5}>
              <Grid item lg={3} >
                <TextField fullWidth onChange={(e) => setTitle(e.target.value)} name={'project_title'}  id="filled-basic" label="?????????? ????????????" variant="filled" />
              </Grid>
              <Grid item lg={2}>
                <AddProject onChange={(project:any) => setProject(project)}/>
              </Grid>
              <Grid item lg={2}>
                <SelectPriority onChange={(project:any) => setPriority(project)}/>
              </Grid>
              <Grid item lg={2}>
                <TaskStatus onChange={(task:any) => setTaskStatus(task)} />
              </Grid>
              <Grid item lg={3}>
                <AddMember onChange={(memmber:any) => setMembers(memmber)}/>
              </Grid>
              <Grid item lg={12}>
                <Divider>
                  <div className={'flex items-center'}>
                    <AccessTimeIcon className={'m-2'}/>
                    ???????? ???????? ?????????? ?? ?????????????? ???????? ????
                  </div>
                </Divider>
              </Grid>
              <Grid item lg={4}>
                <TextField
                  fullWidth
                  type={'number'}
                  onChange={(e) => setScore(e.target.value)}
                  name={'project_title'}
                  id="filled-basic"
                  label="???????????? ????????????"
                  variant="filled"
                />
              </Grid>
              <Grid item lg={4}>
                <TextField
                  fullWidth
                  defaultValue={time}
                  type={'number'}
                  onChange={(e) => setTime(e.target.value)}
                  id="filled-basic"
                  label="???????? ?????????? (????????)"
                  variant="filled"
                />
              </Grid>
              <Grid item lg={4}>
                <TextField
                  fullWidth
                  type={'text'}
                  onChange={(e) => setProficiency(e.target.value)}
                  name={'project_title'}
                  id="filled-basic"
                  label="  ?????? ????????"
                  variant="filled"
                />
              </Grid>
              <Grid item lg={12}>
                <Divider>
                  <div className={'flex items-center'}>
                    <DescriptionIcon className={'m-2'}/>
                    ??????????????  ????????????
                  </div>
                </Divider>
              </Grid>
              <Grid item lg={12}>
                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={5}
                  variant="filled"
                  fullWidth
                  label="?????????????? ????????????"
                />
              </Grid>
              <Grid item lg={6}>
                <Button
                  variant="contained"
                  component="label"
                >
                  ?????????? ????????
                  <input
                    onChange={handleUpload}
                    type="file"
                    hidden
                  />
                </Button>
              </Grid>
            </Grid>
            <div className={'mt-5 flex justify-end'}>
              <Button size={'large'} onClick={handleSubmitTask} className={'bg-black mt-5 hover:bg-black text-white '}>?????????? ????????????</Button>
            </div>
          </AppContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Tasks;
