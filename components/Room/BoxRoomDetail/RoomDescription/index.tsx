import React, { FC, Fragment, useState, MouseEvent, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import Button from '@material-ui/core/Button';
import Orange from '@material-ui/core/colors/orange';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { GlobalContext } from '@/store/Context/GlobalContext';
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      lineHeight: '1.8rem'
    },
    name: {
      fontWeight: 900,
      [theme.breakpoints.down('xs')]: {
        margin: '1.5rem 0 0.4rem 0'
      }
    },
    icon: {
      marginBottom: 10
    },
    button: {
      color: Orange[500],
      padding: 0,
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      }
    },
    iconPlus: {
      fontSize: '15px'
    },
    title:{
      fontWeight: 700,
      margin: '8px 0',
    }
  })
);

interface IProps {
  room: RoomIndexRes,
}

const RoomDescription: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  // const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const {room} = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {router} = useContext(GlobalContext);
  const isPreviewPage = router.pathname.includes('preview-room');

  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const transformHtmlContent = (node: any, index: number) => {
    if (node.name === 'p' || node.name === 'image') {
      node.attribs.class = classes.tagP_inHtmlPare;
      return convertNodeToElement(node, index, transformHtmlContent);
    }
  };

  const notFoundContent = `<p> ${t('room:notFoundContent')} </p>`;

  return (
    room && (
      <Fragment>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.name}>
              {t('rooms:description')}
            </Typography>
            {ReactHtmlParser(isPreviewPage && !room.details.data[0].description ? notFoundContent : room.details.data[0].description, {
              transform: transformHtmlContent
            })}
          </Grid>
          {isOpen ? (
            <Fragment>
              <Grid item xs={12}>
                <Typography variant='subtitle2' className={classes.title}>
                  {t('room:space')}
                </Typography>
                {ReactHtmlParser(isPreviewPage && !room.details.data[0].space ? notFoundContent : room.details.data[0].space, {
                  transform: transformHtmlContent
                })}
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle2' className={classes.title}>
                  {t('room:rules')}
                </Typography>
                {ReactHtmlParser(isPreviewPage && !room.details.data[0].note ? notFoundContent : room.details.data[0].note, {
                  transform: transformHtmlContent
                })}
              </Grid>
              <Button onClick={toggle} className={classes.button} size="small">
                {t('rooms:readLess')}
              </Button>
            </Fragment>
          ) : (
              <Button onClick={toggle} className={classes.button} size="small">
                &#8230; {t('rooms:readMore')}
              </Button>
            )}
        </Grid>
      </Fragment>
    )
  );
};

export default RoomDescription;
