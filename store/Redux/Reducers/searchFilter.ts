import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/store/global';
import { Moment } from 'moment';
import { Reducer } from 'redux';
import { updateObject } from '@/store/Context/utility';

export type DateRange = {
  startDate: Moment | null;
  endDate: Moment | null;
};

export type SearchFilterState = {
  readonly city_id: number | undefined;
  readonly district_id: number | undefined;
  readonly guestsCount: number;
  readonly searchText: string;
  readonly roomsCount: number;
  readonly bookingType: number;
  readonly startDate: string | undefined;
  readonly endDate: string | undefined;
  readonly roomRecently: number[];
};

export type SearchFilterAction =
  | { type: 'ADD_VALUE'; value: number; field: string }
  | { type: 'CHANGE_DATE'; date: DateRange }
  | { type: 'SET_BOOKING_TYPE'; bookingType: number }
  | { type: 'SET_NAV_BOOKING_TYPE'; bookingType: number }
  | { type: 'SET_NAV_GUESTS'; guestsCount: number }
  | { type: 'SET_NUMBER_ROOM'; roomsCount: number }
  | { type: 'SET_ROOM_RECENTLY'; roomRecently: number[] }
  | { type: 'SET_SEARCH_TEXT'; searchText: string }
  | { type: 'SET_SEARCH_CITY'; city_id: number | undefined }
  | { type: 'SET_SEARCH_DISTRICT'; district_id: number | undefined }
  | { type: 'SET_START_DATE'; payload: string }
  | { type: 'SET_END_DATE'; payload: string };

const init: SearchFilterState = {
  city_id: undefined,
  district_id: undefined,
  searchText: '',
  guestsCount: 0,
  roomsCount: 0,
  bookingType: 2,
  startDate: undefined,
  endDate: undefined,
  roomRecently: []
};

const changeCount = (state: SearchFilterState | any, action: SearchFilterAction) => {
  if (action.type === 'ADD_VALUE') {
    let name: any = action.field;
    let obj: any = {};
    let totalValue: number = state[name] + action.value;
    obj[name] = totalValue > 0 ? totalValue : 1;
    return updateObject<SearchFilterState>(state, obj);
  }
  return state;
};

const changeDate = (state: SearchFilterState, action: SearchFilterAction) => {
  if (action.type === 'CHANGE_DATE') {
    const { date } = action;

    let startDate = date!.startDate!.format(DEFAULT_DATE_TIME_FORMAT);
    let endDate = date!.endDate
      ? date!.endDate!.format(DEFAULT_DATE_TIME_FORMAT)
      : date!.startDate!.format(DEFAULT_DATE_TIME_FORMAT);

    return updateObject<SearchFilterState>(state, {
      startDate,
      endDate
    });
  }
  return state;
};

const reducer: Reducer<SearchFilterState, SearchFilterAction> = (
  state: SearchFilterState = init,
  action: SearchFilterAction
): SearchFilterState => {
  switch (action.type) {
    case 'ADD_VALUE':
      return changeCount(state, action);
    case 'CHANGE_DATE':
      return changeDate(state, action);
    case 'SET_BOOKING_TYPE':
      return updateObject(state, { bookingType: action.bookingType });
    case 'SET_NAV_BOOKING_TYPE':
      return updateObject(state, { bookingType: action.bookingType });
    case 'SET_NAV_GUESTS':
      return updateObject(state, { guestsCount: action.guestsCount });
    case 'SET_ROOM_RECENTLY':
      return updateObject(state, { roomRecently: action.roomRecently });
    case 'SET_SEARCH_TEXT':
      return updateObject(state, { searchText: action.searchText });
    case 'SET_SEARCH_CITY':
      return updateObject(state, { city_id: action.city_id });
    case 'SET_SEARCH_DISTRICT':
      return updateObject(state, { district_id: action.district_id });
    case 'SET_NUMBER_ROOM':
      return updateObject(state, { roomsCount: action.roomsCount });
    case 'SET_START_DATE':
      return updateObject(state, { startDate: action.payload });
    case 'SET_END_DATE':
      return updateObject(state, { endDate: action.payload });
    default:
      return state;
  }
};

export default reducer;
