import React, { FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Theme,
  Grid,
  Paper,
  Typography,
  Button,
  Modal
} from '@material-ui/core';
import moment from 'moment';
import DateRangeOutline from '@material-ui/icons/DateRangeOutlined';
import { useTranslation } from 'react-i18next';
import GridContainer from '@/components/Layout/Grid/Container';
import SearchComponent from '@/components/Home/SearchComponent';
import { ReducersType } from '@/store/Redux/Reducers';
import { compose } from "recompose";
import { connect } from 'react-redux';
import { SearchFilterState } from '@/store/Redux/Reducers/Search/searchFilter';


interface IProps {
  classes?: any;
  filter: SearchFilterState;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxChangeDate: {
      padding: 10,
    },
    flexBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    margin15: {
      marginTop: 15,
      [theme!.breakpoints!.down!("sm")]: {
        marginTop: 8
      }
    },
    dialogTitle: {
      display: "flex",
      justifyContent: "space-between",
    },
    closeButtonRoot: {
      [theme!.breakpoints!.only!("xs")]: {
        position: "absolute"
      }
    },
    closeButton: {
      [theme!.breakpoints!.only!("xs")]: {},
      position: "absolute",
      top: '1%',
      right: '1%'
    },
    dialogContent: {
      [theme!.breakpoints!.only!("xs")]: {
        padding: 0
      }
    },
    boxModal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    modalSearch: {
      padding: 16,
      backgroundColor: '#fff',
    }
  })
);

const SearchMobile: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { filter } = props;
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const {
    startDate,
    endDate,
    roomsCount,
    guestsCount
  } = filter;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item sm={12} xs={12} className={classes.margin15}>

      <Paper
        className={classes.boxChangeDate}
        onClick={() => setOpen(true)}
      >
        <Grid container spacing={2}>
          <Grid item xs={2} className={classes.flexBox}>
            <DateRangeOutline
              color="primary"
              style={{ verticalAlign: "middle", fontSize: 30 }}
            />
          </Grid>
          <Grid item xs={7}>
            <Typography
              variant="subtitle2"
              style={{ fontSize: "0.725rem", fontWeight: 700 }}
            >
              {moment(startDate).format("DD/MM/YYYY")} -{" "}
              {moment(endDate).format("DD/MM/YYYY")}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              style={{ fontSize: "0.725rem", fontWeight: 700 }}
            >
              {guestsCount} {t('rooms:guests')}, {roomsCount}{" "}{t('rooms:rooms')}
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.flexBox}>
            <Button
              variant="text"
              color="primary"
              style={{
                fontSize: "0.64rem",
                verticalAlign: "-webkit-baseline-middle"
              }}
            >
              {t('rooms:change')}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <GridContainer xs={11} sm={10} className={classes.boxModal}>
          <GridContainer xs={12} spacing={1} style={{ backgroundColor: '#fff' }}>
            <Typography id="modal-title" variant='h5' align='center' style={{ padding: 8 }}>
              {t('rooms:search')}
            </Typography>
          </GridContainer>
          <SearchComponent showGuestRoom={true} className={classes.modalSearch} closeModal={() => setOpen(false)} />
        </GridContainer>
      </Modal>
    </Grid>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps),
)(SearchMobile);
