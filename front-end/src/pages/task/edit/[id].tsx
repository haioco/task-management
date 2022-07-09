import React, {useEffect, useState} from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import AppContainer from "../../../@core/components/app-container/AppContainer";
import Link from "next/link";
import AddProject from "../components/AddProject";
import SelectPriority from "../components/SelectPriority";
import TaskStatus from "../components/TaskStatus";
import AddMember from "../components/AddMember";
import Divider from "@mui/material/Divider";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";
import PrivateRequest from "../../../@core/api/PrivateRequest";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";

const EidtTask = () => {
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

  const router = useRouter()
  // setTimeEstimated('')
  const {id} = router.query

  const handleSubmitTask = () => {
    const converTOarrMembers: any = []
    members && members.length > 0 && members.map((item:any) => {
      converTOarrMembers.push(item.id)
    })

    const dataTask  = {
      title: title,
      score: score,
      time: time,
      time_estimated: timeEstimated,
      project_id: project,
      priority_id: priority,
      task_members: converTOarrMembers,
      proficiency: parseInt(proficiency),
      status_id: taskStatus,
      description: description
    }
    PrivateRequest().post('/task/store', dataTask).then((res) => {
      if (res.status === 200) {
        toast.success('تسک جدید ایجاد شد   ')
      }
    }).catch((err) => {
      toast.error(err.response.data.error)
      console.log('err submit task', err)
    })
  }

  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const fileList  = e.target.files
    if (!fileList) return
    setFile(fileList[0])
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    formData.append('file', file as File)
    formData.append('task_id', '1212')
    PrivateRequest().post('/task/file/upload', formData, config).then((res) => {
      console.log('res file upload', res)
    }).catch((err) => {
      console.log('err file upload', err)
    })
  }
  useEffect(() => {
    PrivateRequest().get(`/task/${id}`).then((res) => {
      console.log('res show task', res.data.task)
      setTitle(res.data.task.title)
      setProject(res.data.task.project_id)
      setTaskStatus(res.data.task.status_id)
      setScore(res.data.task.score)
      setTime(res.data.task.estimated_time)
      setProficiency(res.data.task.proficiency)
      setPriority(res.data.task.priority_id)
      setDescription(res.data.task.description)
      console.log('(res.data.task.priority_id', res.data.task.priority_id)
    }).catch((err) => {
      console.log('err', err)
    })

  }, [])

  return (
    <div>
      <Grid container>
        <Grid lg={12} item>
          <AppContainer title={'ویرایش  فعالیت '}>
            <div className={'flex justify-between'}>
              <Typography className={'mb-5'} variant={'h5'}> ویرایش فعالیت  </Typography>
              <Link href='/task/list'>
                <Button variant={'text'} className={'mb-5'}> لیست فعالیت ها</Button>
              </Link>
            </div>
            <br />
            {title ? (
             <>
               <Grid container item spacing={5}>
                 <Grid item lg={3} >
                   <TextField defaultValue={title} fullWidth onChange={(e) => setTitle(e.target.value)} name={'project_title'}  id="filled-basic" label="عنوان فعالیت" variant="filled" />
                 </Grid>
                 <Grid item lg={2}>
                   <AddProject project={project} onChange={(project:any) => setProject(project)}/>
                 </Grid>
                 <Grid item lg={2}>
                   <SelectPriority priority={priority} onChange={(project:any) => setPriority(project)}/>
                 </Grid>
                 <Grid item lg={2}>
                   <TaskStatus status={taskStatus} onChange={(task:any) => setTaskStatus(task)} />
                 </Grid>
                 <Grid item lg={3}>
                   <AddMember onChange={(memmber:any) => setMembers(memmber)}/>
                 </Grid>
                 <Grid item lg={12}>
                   <Divider>
                     <div className={'flex items-center'}>
                       <AccessTimeIcon className={'m-2'}/>
                       زمان بندی پروژه و ارزیابی شاخص ها
                     </div>
                   </Divider>
                 </Grid>
                 <Grid item lg={4}>
                   <TextField
                     fullWidth
                     defaultValue={score}
                     type={'number'}
                     onChange={(e) => setScore(e.target.value)}
                     name={'project_title'}
                     id="filled-basic"
                     label="امتیاز فعالیت"
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
                     label="زمان انجام (ساعت)"
                     variant="filled"
                   />
                 </Grid>
                 <Grid item lg={4}>
                   <TextField
                     fullWidth
                     defaultValue={proficiency}
                     type={'text'}
                     onChange={(e) => setProficiency(e.target.value)}
                     name={'project_title'}
                     id="filled-basic"
                     label="  سطح تسلط"
                     variant="filled"
                   />
                 </Grid>
                 <Grid item lg={12}>
                   <Divider>
                     <div className={'flex items-center'}>
                       <DescriptionIcon className={'m-2'}/>
                       توضحیات  فعالیت
                     </div>
                   </Divider>
                 </Grid>
                 <Grid item lg={12}>
                   <TextField
                     defaultValue={description}
                     onChange={(e) => setDescription(e.target.value)}
                     multiline
                     rows={5}
                     variant="filled"
                     fullWidth
                     label="توضیحات فعالیت"
                   />
                 </Grid>
                 <Grid item lg={6}>
                   <Button
                     variant="contained"
                     component="label"
                   >
                     پیوست فایل
                     <input
                       onChange={handleUpload}
                       type="file"
                       hidden
                     />
                   </Button>
                 </Grid>
               </Grid>
               <div className={'mt-5 flex justify-end'}>
                 <Button size={'large'} onClick={handleSubmitTask} className={'bg-black mt-5 hover:bg-black text-white '}>ایجاد فعالیت</Button>
               </div>
             </>
            ): 'loading'}
          </AppContainer>
        </Grid>
      </Grid>

    </div>
  );
};
export default EidtTask;
