import React from 'react';
import {
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import Paper from '@mui/material/Paper';
import CompletedTask from "./TaskItem/CompletedTask";
import InPrograssTask from "./TaskItem/InPrograssTask";
import WaitingTasks from "./TaskItem/Waiting،Tasks";
import {NotStarted} from "@mui/icons-material";
import NotStartedTask from "./TaskItem/NotStartedTask";




const Tasks = () => {
  return (
      <>
        <Grid item md={12} lg={12}>
          <Card className={'bg-[#e4e8f3]'}>
          <CardContent>
            <CompletedTask />
            <br /><br />
            <InPrograssTask />
            <br /><br />
            <WaitingTasks />
            <br /><br />
            <NotStartedTask />
          </CardContent>
          </Card>
        </Grid>
      </>
  );
};

export default Tasks;
