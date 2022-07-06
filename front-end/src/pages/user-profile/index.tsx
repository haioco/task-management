import React from 'react';
import {Box, Button, Card, Container, Divider, Grid, Typography} from "@mui/material";
import {FiChevronLeft, FiPlus} from "react-icons/fi";
import Avatar from "@mui/material/Avatar";

const UserProfile = () => {
  return (
    <div>
      <Grid container spacing={5}>
        <Grid lg={3} sm={12} md={12} item>
          <Box className={' p-1 mb-2 rounded-lg'}>
            <Typography style={{ fontWeight: 800 }} className={'ir-yekan-black text-black'} variant={'h4'}>
              پروفایل
            </Typography>
          </Box>
          <Card style={{ height: '30rem' }} className={'bg-[#eef2fb]'}>
            <Container className={'flex justify-center mt-5'}>
              <div style={{ borderRadius: '13px' }} className={'bg-[#facb51] flex items-center text-center ml-1 w-6/12'}>
                <div  style={{ borderRadius: '13px' }} className={' bg-[#ffb800] flex items-center justify-center w-10/12 p-1'}>
                  امتیاز ماه
                </div>
                <div className={'ml-2'}>
                  120
                </div>
              </div>
              <div style={{ borderRadius: '13px' }} className={'bg-[#b2baca]  flex items-center text-center w-6/12'}>
                <div style={{ borderRadius: '13px' }} className={'bg-[#8893a9] flex items-center justify-center text-white w-10/12 p-1'}>
                  امتیاز ماه
                </div>
                <div className={'ml-2'}>
                  120
                </div>
              </div>
            </Container>
            <Container className={'flex justify-center mt-3'}>
              <div style={{ borderRadius: '13px' }} className={'bg-[#facb51] flex items-center text-center ml-1 w-6/12'}>
                <div  style={{ borderRadius: '13px' }} className={' bg-[#ffb800] flex items-center justify-center w-10/12 p-1'}>
                  امتیاز ماه
                </div>
                <div className={'ml-2'}>
                  120
                </div>
              </div>
              <div style={{ borderRadius: '13px' }} className={'flex items-center justify-between text-center w-6/12'}>
                <div style={{ borderRadius: '4px' }} className={'bg-[#00bc8b] rounded-lg p-3 text-center  flex justify-centers items-center w-8 h-8'}>
                  <span className={'text-white'}>12</span>
                </div>
                <div style={{ borderRadius: '4px' }} className={'bg-[#ef3737] p-3 text-center flex justify-centers items-center w-8 h-8'}>
                  <span className={'text-white'}>12</span>
                </div>
                <div style={{ borderRadius: '4px' }} className={'bg-[#0f5ef7]  p-3 text-center  flex justify-centers items-center w-8 h-8'}>
                  <span className={'text-white'}>12</span>
                </div>
              </div>
            </Container>
            <br />
            <Divider />
            <Box className={'m-4 cursor-pointer flex justify-between items-center h-6/12'}>
              <div>
                <Box>
                  <Typography className={'font-black text-black'}>
                    اطلاعات عمومی
                  </Typography>
                </Box>
              </div>
              <div style={{ borderRadius: '50%' }} className={'bg-blue-200 p-1'}>
                <FiChevronLeft />
              </div>
            </Box>
            <Divider />
            <Box className={'m-4 cursor-pointer  flex justify-between items-center h-6/12'}>
              <div>
                <Box>
                  <Typography className={'font-black text-black'}>
                    وظایف
                  </Typography>
                </Box>
              </div>
              <div style={{ borderRadius: '50%' }} className={'bg-blue-200 p-1'}>
                <FiChevronLeft />
              </div>
            </Box>
            <Divider />
            <Box className={'m-4 cursor-pointer  flex justify-between items-center h-6/12'}>
              <div>
                <Box>
                  <Typography className={'font-black text-black'}>
                    کارنامه
                  </Typography>
                </Box>
              </div>
              <div style={{ borderRadius: '50%' }} className={'bg-blue-200 p-1'}>
                <FiChevronLeft />
              </div>
            </Box>
            <Divider />
            <Box className={'m-4 cursor-pointer  flex justify-between items-center h-6/12'}>
              <div>
                <Box>
                  <Typography className={'font-black text-black'}>
                    فایل ها
                  </Typography>
                </Box>
              </div>
              <div style={{ borderRadius: '50%' }} className={'bg-blue-200 p-1'}>
                <FiChevronLeft />
              </div>
            </Box>
            <br />
            <br />
            <br />
            <Box className={'mt-5 flex justify-center'}>
              <Button style={{ height: 60 }} className={'blue-grad-btn w-10/12'} variant={'contained'}>
                <FiPlus className={'ml-5'} size={25}/>
                افودن
              </Button>
            </Box>
            <br />
          </Card>
        </Grid>
        <Grid lg={9} sm={12} md={12} item>
          <br />
          <br />
          <Box className={'mt-5 flex justify-between'}>
            <div className={'flex'}>
              <Avatar
                alt='John Doe'
                sx={{ width: 60, height: 60 }}
                src='/images/avatars/1.png'
              />
              <div className={'mr-5 flex justify-center flex-col'}>
                <span className={'ir-yekan-bold font-bold'}>   بیژن سعیدی</span>
                <span className={'font-light'}>مدیریت محصول</span>
              </div>
            </div>
            <div  className={'mr-5 flex text-left flex-col'}>
              <span className={'ir-yekan-bold font-bold'}> H.Safarzadeh@haio.ir </span>
              <span className={'font-light'}> 09053200107</span>
            </div>
          </Box>
          <Divider className={'mt-5'}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfile;
