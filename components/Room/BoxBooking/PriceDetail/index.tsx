import React, { useContext, FC, memo, useMemo } from 'react';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { Grid } from '@material-ui/core';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { ReducersList } from '@/store/Redux/Reducers';
import { RoomIndexRes } from '@/types/Requests/Rooms/RoomResponses';
import { useSelector } from 'react-redux';

const PriceDetail: FC = () => {
  const { state } = useContext(RoomDetailsContext);
  const room = useSelector<ReducersList, RoomIndexRes>((state) => state.roomPage.room);
  const { dataCalculate } = state;
  const { t } = useTranslation();

  return useMemo(
    () =>
      room && (
        <Grid container className="priceDetail">
          {!!dataCalculate && dataCalculate.days >= 5 ? (
            <Grid className="priceDetail__avg">
              <p>
                {t('room:boxBooking:average')} {numeral(dataCalculate.avg_price).format('0,0')} VND/{' '}
                {t('room:boxBooking:day')}
              </p>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={6} className="priceDetail__priceDay flex_center">
                <p>
                  {numeral(room.price_day).format('0,0')} VND/ {t('room:boxBooking:day')}
                </p>
              </Grid>
              {room.price_hour !== 0 && (
                <Grid item xs={6} className="priceDetail__priceHour flex_center">
                  {room.price_hour !== 0 && (
                    <p>
                      {numeral(room.price_hour).format('0,0')} VND/ 4 {t('room:boxBooking:hours')}
                    </p>
                  )}
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      ),
    [t, room, dataCalculate]
  );
};

export default memo(PriceDetail);
