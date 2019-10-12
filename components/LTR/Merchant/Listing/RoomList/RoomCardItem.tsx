import {
  createStyles,
  Divider,
  Grid,
  Link,
  Theme,
  Paper,
  IconButton,
  Hidden,
  Tooltip
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/styles';
import React, { FC, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faBed, faBath, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import LinearProgress from '@material-ui/core/LinearProgress';
import numeral from 'numeral';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
interface IProps {
  classes?: any;
  room: any;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3)
    },
    paper: {
      padding: '16px'
    },
    title: {
      fontWeight: 600
    },
    content: {
      height: '100%',
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'center'
    },
    img: {
      display: 'block',
      width: 140,
      objectFit: 'cover',
      border: '1px solid #efefef',
      borderRadius: '10px'
    },
    imgDefault: {
      width: 140,
      height: 40,
      margin: 'auto'
    },
    widthImg: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        marginBottom: 8
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 160
      }
    },
    wrapperImage: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        maxWidth: 140
      },
      [theme.breakpoints.down('sm')]: {
        height: 117
      },
      [theme.breakpoints.down('xs')]: {
        height: 94
      },
      backgroundColor: '#3d5c5c',
      border: '1px solid #ffffff',
      borderRadius: '10px'
    },
    roomName: {
      fontSize: '1.2rem',
      display: 'inline-block',
      color: '#48465b',
      fontWeight: 600,
      alignItems: 'center',
      marginRight: '0.5rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1rem'
      }
    },
    price: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: '5px 0'
    },
    priceDay: {
      display: 'flex',
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12
      }
    },
    priceAll: {
      display: 'flex',
      fontWeight: 600,
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12
      }
    },
    link: {
      color: '#484848'
    },
    infoRoomName: {
      display: 'flex',
      margin: '5px 0'
    },
    vertifiredMdDown: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        alignItems: 'flex-start'
      }
    },
    iconVerified: {
      width: '23px',
      float: 'inherit',
      position: 'relative',
      top: 5,
      left: 5
    },
    spanIcon: {
      display: 'flex',
      alignItems: 'center'
    },
    marginLabel: {
      margin: '16px 0'
    },
    wrapperIcon: {
      maxWidth: 140
    },
    IconButton: {
      backgroundColor: '#E1E8F7',
      color: '#3E93F8',
      borderRadius: '50%',
      padding: 8,
      marginLeft: 8,
      '&:hover': {
        background: '#3E93F8',
        color: '#fff'
      }
    },
    IconImage: {
      backgroundColor: '#E1E8F7',
      color: '#3E93F8',
      padding: 8,
      marginLeft: 8,
      '&:hover': {
        background: '#3E93F8',
        color: '#fff'
      }
    },
    sizeImage: {
      width: '1.5rem',
      height: '1.5rem'
    },
    customIcon: {
      color: '#767676'
    },
    maxWidthIcon: {
      maxWidth: 60
    },
    sizeButton: {
      [theme.breakpoints.down('md')]: {
        width: '0.9rem',
        height: '0.9rem'
      }
    },
    process: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'flex-start'
      }
    },
    imgDetail: {
      height: 45,
      [theme.breakpoints.down('md')]: {
        height: 40
      },
      [theme.breakpoints.down('sm')]: {
        height: 35
      },
      [theme.breakpoints.down('xs')]: {
        height: 30
      }
    },
    marginProcess: {
      marginRight: '10px'
    },
    IconDetail: {
      color: 'lightgray'
    },
    subLabel: {
      fontWeight: 600,
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 13
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 12
      }
    },
    btnShowSmUp: {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'flex-end'
    },
    percent: {
      fontWeight: 600
    }
  })
);
const RoomCardItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { room } = props;
  const { router } = useContext(GlobalContext);
  const BorderLinearProgress = withStyles({
    root: {
      height: 6,
      width: 300,
      backgroundColor: '#ededed',
      borderRadius: 30
    },
    bar: {
      borderRadius: 30,
      backgroundColor: '#43cab8'
    }
  })(LinearProgress);

  const openUpdateRoom = (room_id: number) => {
    router.push(`/host/create-listing/${room_id}/process`);
  };
  const openPreviewRoom = (room_id: number) => {
    router.push(`/host/preview-room/${room_id}`);
  };

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center" className={classes.root}>
        <Grid item xs={11} sm={11} md={10} lg={8}>
          <Paper className={classes.paper}>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Grid container>
                  {room.avatar && room.avatar.images.length ? (
                    <Grid item xs={7} sm={3} md={3} lg={2} className={classes.widthImg}>
                      <img
                        className={classes.img}
                        src={IMAGE_STORAGE_LG + room.avatar.images[0].name}
                        alt="Westay - Homestay cho người việt"
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={7} sm={3} md={3} lg={2} className={classes.widthImg}>
                      <Grid className={classes.wrapperImage}>
                        <img
                          src={'/static/images/camera.svg'}
                          alt="Camera"
                          className={classes.imgDefault}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <Hidden smUp>
                    <Grid item xs={5} className={classes.btnShowSmUp}>
                      <Grid item>
                        <Tooltip
                          title="Cập nhật phòng"
                          placement="bottom"
                          classes={{ tooltip: 'tooltip' }}>
                          <IconButton
                            color="primary"
                            className={classes.IconButton}
                            aria-label="Edit"
                            onClick={() => openUpdateRoom(room.id)}>
                            <EditIcon className={classes.sizeButton} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="Xem trước phòng"
                          placement="bottom"
                          classes={{ tooltip: 'tooltip' }}>
                          <IconButton
                            color="primary"
                            className={classes.IconButton}
                            aria-label="Search"
                            onClick={() => openPreviewRoom(room.id)}>
                            <SearchIcon className={classes.sizeButton} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} sm={9} md={9} lg={10}>
                    <Grid className={classes.content}>
                      <Grid container>
                        <Grid item xs={12} sm={10} className={classes.infoRoomName}>
                          <span>
                            <Link href="/terms-and-conditions" className={classes.roomName}>
                              {room.about_room ? room.about_room.name : 'Chưa có tên căn hộ'}
                              {room.short_term_room.status === 1 ? (
                                <img
                                  src={'/static/images/verified.svg'}
                                  alt="Verified"
                                  className={classes.iconVerified}
                                />
                              ) : (
                                ''
                              )}
                            </Link>
                          </span>
                        </Grid>
                        <Hidden xsDown>
                          <Grid container item xs={2} justify="flex-end">
                            <Grid item>
                              <Tooltip
                                title="Cập nhật phòng"
                                placement="bottom"
                                classes={{ tooltip: 'tooltip' }}>
                                <IconButton
                                  color="primary"
                                  className={classes.IconButton}
                                  aria-label="Edit"
                                  onClick={() => openUpdateRoom(room.id)}>
                                  <EditIcon className={classes.sizeButton} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip
                                title="Xem trước phòng"
                                placement="bottom"
                                classes={{ tooltip: 'tooltip' }}>
                                <IconButton
                                  color="primary"
                                  className={classes.IconButton}
                                  aria-label="Search"
                                  onClick={() => openPreviewRoom(room.id)}>
                                  <SearchIcon className={classes.sizeButton} />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </Hidden>
                      </Grid>
                      <Grid className={classes.price}>
                        <Grid container item xs={12} sm={12} lg={10} spacing={1}>
                          <Grid item xs={6} sm={3} lg={6} xl={3} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faDoorOpen}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  60 m<sup>2</sup>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={3} lg={6} xl={3} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faUserFriends}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  {room.guests
                                    ? room.guests.recommendation + room.guests.max_additional_guest
                                    : '0'}{' '}
                                  khách
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={6} sm={3} lg={6} xl={3} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faBed}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  {room.bedrooms.number_bedroom} phòng ngủ
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={3} lg={6} xl={3} className={classes.wrapperIcon}>
                            <Grid container>
                              <Grid item xs={2} className={classes.spanIcon}>
                                <FontAwesomeIcon
                                  className={classes.customIcon}
                                  icon={faBath}></FontAwesomeIcon>
                              </Grid>
                              <Grid className={classes.nameIcon} item xs={10}>
                                <Typography variant="subtitle1" className={classes.priceDay}>
                                  {room.bathrooms.number_bathroom} phòng tắm
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} lg={6} className={classes.infoRoomName}>
                          {room.short_term_room.rent_type === 3 ? (
                            <Typography variant="body1" className={classes.priceAll}>
                              {room.status === 1 ? (
                                <span>
                                  {numeral(room.prices.prices.term_1_month).format('0,0')} vnđ/
                                  1tháng &#8226;
                                </span>
                              ) : (
                                ''
                              )}
                              <span>
                                &nbsp;
                                {numeral(room.short_term_room.price_day).format('0,0')} vnđ/ 1ngày
                                &#8226;
                              </span>
                              <span>
                                &nbsp;
                                {numeral(room.short_term_room.price_hour).format('0,0')} vnđ/ 4giờ
                              </span>
                            </Typography>
                          ) : (
                            ''
                          )}
                          {room.short_term_room.rent_type === 2 ? (
                            <Typography variant="body1" className={classes.priceAll}>
                              {room.status === 1 ? (
                                <span>
                                  {numeral(room.prices.prices.term_1_month).format('0,0')} vnđ/
                                  1tháng &#8226;
                                </span>
                              ) : (
                                ''
                              )}
                              <span>
                                &nbsp;
                                {numeral(room.short_term_room.price_day).format('0,0')} vnđ/ 1ngày
                              </span>
                            </Typography>
                          ) : (
                            ''
                          )}
                          {room.short_term_room.rent_type === 1 ? (
                            <Typography variant="body1" className={classes.priceAll}>
                              {room.status === 1 ? (
                                <span>
                                  {numeral(room.prices.prices.term_1_month).format('0,0')} vnđ/
                                  1tháng &#8226;
                                </span>
                              ) : (
                                ''
                              )}
                              <span>
                                &nbsp;
                                {numeral(room.short_term_room.price_hour).format('0,0')} vnđ/ 4giờ
                              </span>
                            </Typography>
                          ) : (
                            ''
                          )}
                        </Grid>
                        {room.percent < 100 ? (
                          <Grid container item xs={12} lg={6}>
                            <Grid item xs={12} className={classes.process}>
                              <BorderLinearProgress
                                className={classes.marginProcess}
                                variant="determinate"
                                color="secondary"
                                value={room.percent}
                              />
                              <span className={classes.percent}> {room.percent}%</span>
                            </Grid>
                          </Grid>
                        ) : (
                          ''
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.marginLabel} />
            <Grid className={classes.price}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/house.svg'}
                        alt="House"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Loại phòng
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                        {room.accommodation_type_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/rentType.svg'}
                        alt="Rent Type"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Ngắn hạn
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                        {room.short_term_rent_type.rent_type === 3
                          ? 'Ngày và giờ'
                          : room.short_term_rent_type.rent_type_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/longterm.svg'}
                        alt="Rent Type"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Dài hạn
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                        {room.status === 0 ? 'Đang khóa' : 'Theo tháng'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={
                          room.instant_book === 1
                            ? '/static/images/flash.svg'
                            : '/static/images/flashWhite.svg'
                        }
                        alt="Flash"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Loại đặt phòng
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                        {room.instant_book_txt}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={4} md lg xl={3}>
                  <Grid container>
                    <Grid item xs={4} sm={3} md={12} lg={3} className={classes.maxWidthIcon}>
                      <img
                        src={'/static/images/policy.svg'}
                        alt="Policy"
                        className={classes.imgDetail}
                      />
                    </Grid>
                    <Grid className={classes.nameIcon} item xs={8} sm={9} lg={9} md={12}>
                      <Typography variant="subtitle1" className={classes.priceDay}>
                        Chính sách hủy
                      </Typography>
                      <Typography variant={'body1'} className={classes.subLabel}>
                      {room.short_term_room.settings.booking_cancel_type_text}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default RoomCardItem;
