import React, { Fragment, FC, useState, MouseEvent, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Theme,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  IconButton,
  Grid,
  Zoom,
  Tooltip,
  Icon,
  ListItemIcon, ListItemText, Hidden, SwipeableDrawer, List, ListItem, Divider
} from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';
import Logo from '@/components/Toolbar/Logo';
import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';
import ArrowDown from '@material-ui/icons/KeyboardArrowDownRounded';
import PolicyIcon from '@material-ui/icons/GavelRounded';
import { StyledMenuItem, StyledMenu } from '@/components/Toolbar/SwitchLanguage';
import IconMenu from '@material-ui/icons/MenuRounded';
import { useTranslation } from 'react-i18next';
import { withCookies } from 'react-cookie';
import { compose } from "recompose";
import SlideDrawerMerchant from '@/components/LTR/ReusableComponents/SlideDrawerMerchant';
import { GlobalContext } from '@/store/Context/GlobalContext';

interface IProps {
  classes?: any,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    btnPolicy: {
      borderRadius: 4,
      color: '#74788d',
      textTransform: 'initial'
    },
    avatar: {
      alignSelf: 'center',
      borderRadius: 4,
      cursor: 'pointer'
    },
    divActions: {
      display: 'flex',
      alignItems: 'center'
    },
    IconExit: {
      backgroundColor: '#FAE4FA',
      color: '#FD27EB',
      borderRadius: 4,
      padding: 8,
      '&:hover': {
        background: '#FD27EB',
        color: '#fff'
      }
    },
    IconPolicy: {
      backgroundColor: '#DCEEF2',
      color: '#1DC9B7',
      borderRadius: 4,
      padding: 8,
      '&:hover': {
        background: '#1DC9B7',
        color: '#fff'
      }
    },
    grow: {
      flexGrow: 1,
      marginLeft: '20px',
      [theme.breakpoints.only('xs')]: {
        marginLeft: 0
      }
    },
    drawer: {
      [theme.breakpoints.only('xs')]: {
        width: '80%'
      },
      width: '60%'
    },

  })
);

const NavHeader_Merchant: FC<IProps> = (props) => {
  const classes                 = useStyles(props);
  const {}                      = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { router } = useContext(GlobalContext);
  function handleSwitch(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const openLink = (url: string) => {
    router.push(url);
  };

  return (
    <div style = {{ backgroundColor: '#F9F9FC' }}>
      <Grid container item xs={12}>
        <AppBar
          elevation = {0}
          position = 'static'
          style = {{ backgroundColor: '#F9F9FC' }}
        >
          <Toolbar className = {classes.toolbar}>
            <Hidden smDown>
              <Grid container justify = 'space-between' alignItems = 'center'>
                <Grid item>
                  <Logo href = '/host' />
                </Grid>
                <Grid item>
                  <Grid container spacing = {2} alignItems = 'center' justify = 'space-around'>
                    <Grid item>
                      <Button href = {'#'} className = {classes.btnPolicy}>
                        Danh sách booking
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className = {classes.btnPolicy} onClick = {handleSwitch}>
                        Quản lý phòng
                        <ArrowDown />
                      </Button>

                      <StyledMenu
                        id = 'customized-menu'
                        anchorEl = {anchorEl}
                        keepMounted
                        open = {Boolean(anchorEl)}
                        onClose = {handleClose}>
                        <StyledMenuItem onClick = {() => openLink('/host/room-list')}>
                          <ListItemText primary = 'Danh sách phòng' />
                        </StyledMenuItem>
                        <StyledMenuItem onClick = {() => alert('Chuyển link')}>
                          <ListItemText primary = 'Đăng phòng' />
                        </StyledMenuItem>
                      </StyledMenu>
                    </Grid>
                    <Grid item>
                      <Button href = {'#'} className = {classes.btnPolicy}>
                        Khuyến mãi
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button href = {'#'} className = {classes.btnPolicy}>
                        Tin nhắn
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing = {2} alignItems = 'center' justify = 'flex-end'>
                    <Grid item>
                      <Tooltip TransitionComponent = {Zoom} title = 'Chính sách và điều khoản'>
                        <IconButton color = 'primary' className = {classes.IconPolicy} aria-label = 'Policy'>
                          <PolicyIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip TransitionComponent = {Zoom} title = 'Đăng xuất'>
                        <IconButton color = 'primary' className = {classes.IconExit} aria-label = 'Logout'>
                          <ExitToAppIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip TransitionComponent = {Zoom} title = 'Thông tin cá nhân'>
                        <Avatar alt = 'Profile' src = {'@/../../../static/images/room_demo.jpg'}
                                className = {classes.avatar} onClick = {() => alert('Chuyển link')} />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Logo href = '/host' />
              <div className={classes.grow} />
              <IconMenu onClick={() => setOpenDrawer(true)} />

              <SwipeableDrawer
                disableSwipeToOpen
                open={openDrawer}
                onOpen={() => setOpenDrawer(true)}
                onClose={() => setOpenDrawer(false)}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
                classes={{
                  paper: classes.drawer
                }}>
                <SlideDrawerMerchant setOpen={setOpenDrawer}/>
              </SwipeableDrawer>
            </Hidden>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

export default compose<IProps, any>(
  withCookies
)(NavHeader_Merchant);