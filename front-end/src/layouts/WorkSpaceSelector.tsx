import React, {ReactNode} from 'react';
import {styled} from "@mui/material/styles";
import Box, {BoxProps} from "@mui/material/Box";
import {Divider, Grid} from '@mui/material';
import CardTransactions from "../views/ui/cards/advanced/CardTransactions";
import Typography from "@mui/material/Typography";
import UserDropdown from "../@core/layouts/components/shared-components/UserDropdown";
import {Settings} from "../@core/context/settingsContext";
import WorkspacesIcon from '@mui/icons-material/Workspaces';


const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

interface Props {
  settings: Settings
}

const WorkSpaceSelector = (props: Props) => {
  const { settings } = props
  const { direction } = settings


  return (
    <div className={'ir-yekan-reqular'}>
      <MainContentWrapper className='layout-content-wrapper'>
        <ContentWrapper className='layout-page-content'>
          <div className={'m-5 flex justify-between items-center '}>
            <div className={'flex items-center'}>
              <WorkspacesIcon className={'ml-2'} />
              <Typography variant={'h5'} className={'ir-yekan-black'}>فضای کاری خود را انتخاب کنید</Typography>
            </div>
            <div>
              <UserDropdown settings={settings} />
            </div>
          </div>
          <Divider />
          <Grid className={'mt-5'} container spacing={6}>
            <Grid item xs={12} md={6} lg={3}>
              <CardTransactions />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <CardTransactions />
            </Grid>
          </Grid>
        </ContentWrapper>
      </MainContentWrapper>
    </div>
  );
};

export default WorkSpaceSelector;
