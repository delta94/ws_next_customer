import { createStyles, makeStyles, Theme, Typography, Grid, Button } from '@material-ui/core';
import React, { FC, Fragment, useState, MouseEvent } from 'react';
import CardWrapperItem from '../CardWrapperItem';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(1),
      color: '#484848'
    },
    tagP_inHtmlPare: {
      width: '100%',
      display: 'inline',
    },
    button: {
      padding: 0,
      textTransform: 'initial',
      color: '#1d8df7',
      '&:hover': {
        backgroundColor: '#ffffff'
      },
    },
    roomName: {
      display: 'inline-block',
      alignItems: 'center',
    }
  })
);

const NameAndDescription: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  const transformHtmlContent = (node: any, index: number) => {
    if (node.name === 'p' || node.name === 'image') {
      node.attribs.class = classes.tagP_inHtmlPare;
      return convertNodeToElement(node, index, transformHtmlContent);
    }
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Tên và mô tả">
          <Typography variant="subtitle1" className={classes.name}>
            {listing.about_room.name}
          </Typography>
          <Grid>
            <span>
              {isOpen ? (
                <span className={classes.roomName}>
                  {ReactHtmlParser(listing.about_room.description, {
                    transform: transformHtmlContent
                  })}
                </span>
              ) : (
                <span className={classes.roomName}>
                  {ReactHtmlParser(listing.about_room.description.substring(0, 150), {
                    transform: transformHtmlContent
                  })}
                  <Button onClick={toggle} className={classes.button}>
                    &#8230;Xem thêm
                  </Button>
                </span>
              )}
            </span>
          </Grid>
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default NameAndDescription;
