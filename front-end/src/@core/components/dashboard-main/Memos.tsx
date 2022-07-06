import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";

const Memos = () => {
  return (
      <Grid item lg={12}>
        <Card className={'bg-[#e4e8f3]'}>
          <CardContent>
            <Typography variant={'h5'} className={'ir-yekan-black primary-text-h'} gutterBottom>
              یادداشت ها
            </Typography>
            <Grid className={'mt-5'} spacing={5} container>
              <Grid item lg={4}>
                <Card className={'bg-white'}>
                  <CardContent>
                    یادداشت های من
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4}>
                <Card className={'bg-white'}>
                  <CardContent>
                    یادداشت های من
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4}>
                <Card className={'bg-white'}>
                  <CardContent>
                    یادداشت های من
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
  );
};

export default Memos;
