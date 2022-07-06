import React from 'react';
import {Box, CardContent, Container, Typography} from "@mui/material";
import FadeIn from 'react-fade-in';


type Props = {
  children: React.ReactNode,
  title?: string
}

const AppContainer = ({children, title}: Props) => {
  return (
    <FadeIn>
      <Box className={'bg-primary-color-h rounded-t-lg p-3'}>
        <Typography className={'text-white'}> {title}</Typography>
      </Box>
      <CardContent className={'bg-white shadow-md'}>
        {children}
      </CardContent>
    </FadeIn>
  );
};

export default AppContainer;
