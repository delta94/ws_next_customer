import React, { Fragment, FC, useContext, useReducer } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Button, Hidden } from '@material-ui/core';
import GpsFixed from '@material-ui/icons/GpsFixedRounded';
import SearchAutoSuggestion from '@/components/Home/SearchAutoSuggestion';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { NumberRoomCity } from '@/types/Requests/Rooms/RoomResponses';
import { ParsedUrlQueryInput } from "querystring";
import Router from 'next/router';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { SearchFilterState, SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { RoomFilterContext, RoomFilterReducer, RoomFilterStateInit } from '@/store/Context/Room/RoomFilterContext';
import { updateRouter } from '@/store/Context/utility';
import { Dispatch } from 'redux';

interface IProps {
  classes?: any,
  showPlaces: boolean,
  closeModal?: () => void,
  className?: string,
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    btnPlace:{
      margin:'8px 16px 8px 0',
      boxShadow:'0 2px 9px -2px rgba(132,135,138,.2)',
      textTransform: 'initial',
      backgroundColor: '#fff'
    }
  })
);

const SearchHomeLT: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {showPlaces, closeModal, className} = props;
  const {t} = useTranslation();
  const { dispatch: dispatchGlobal, width } = useContext(GlobalContext);
  const cities = useSelector<ReducersList, NumberRoomCity[]>(
    (state) => state.roomHomepage.roomsCity
  );
  const filter = useSelector<ReducersList, SearchFilterState>(
    (state) => state.searchFilter
  );
  const [stateRoomFilter, dispatchRoomFilter] = useReducer(RoomFilterReducer, RoomFilterStateInit);
  const { searchText, city_id, district_id, guestsCount, roomsCount} = filter;
  const dispatchSearch = useDispatch<Dispatch<SearchFilterAction>>();

  const applySearch = () => {
    closeModal && closeModal();

    dispatchGlobal({ type: 'setOverlay', payload: false });
    const pushQuery: ParsedUrlQueryInput = {
      name: city_id === undefined && district_id === undefined ? searchText : '',
      city_id: city_id ? city_id : '',
      district_id: district_id ? district_id : '',
      bedrooms: roomsCount,
      number_guest: guestsCount,
      // discount:''
    };

    Router.push({
      pathname: '/long-term-rooms',
      query: pushQuery
    });
  };

  const locationRoom = (nameCity: string) => {
    updateRouter('/long-term-rooms',true, 'name', nameCity);
    dispatchSearch({type:'SET_SEARCH_TEXT', searchText:nameCity})
  };

  let numRecommend: number;
  switch (width) {
    case 'xl': numRecommend = 5;
      break;
    case 'lg': numRecommend = 4;
      break;
    case 'md': numRecommend = 3;
      break;
    case 'sm': numRecommend = 4;
      break;
    default: numRecommend = 4;
  }

  return (
    <RoomFilterContext.Provider value={{ state: stateRoomFilter, dispatch: dispatchRoomFilter }}>
      <Grid container spacing={1} className={className}>
      <Grid item xs={12} md={9}>
        <SearchAutoSuggestion/>
      </Grid>
      <Grid item xs={12} md={3}>
        <ButtonGlobal padding="0px" width="100%" height={width === 'xs' ? 40 : 50} onClick={applySearch}>
          {t('home:searchComponent:search')}
        </ButtonGlobal>
      </Grid>
      {showPlaces && (
        <Fragment>
          <Hidden xsDown>
          <Grid item xs={12} sm={12} md={11} lg={11} xl={9}>
            <Button variant="contained" className={classes.btnPlace}>
              <GpsFixed style={{marginRight:8, color:'tomato'}}/>
              Vị trí của bạn
            </Button>

            {cities.map((o,i)=> (
              i < numRecommend ? (
                <Button key={i} variant="contained" className={classes.btnPlace} onClick={()=>locationRoom(o.name_city)}>
                  {o.name_city} ({o.total_rooms})
                </Button>
              ) : null
            ))}
          </Grid>
          <Grid item xs/>
          </Hidden>
        </Fragment>
      )}
    </Grid>
    </RoomFilterContext.Provider>
  );
};

export default SearchHomeLT;