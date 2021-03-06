import React, { ChangeEvent, ReactNode, Dispatch, memo, FC, useMemo } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { MenuProps } from '.';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { BootstrapInput } from '@/components/SelectGlobal';
import { KeyboardArrowDown } from '@material-ui/icons';
import { BookingAction } from '@/store/Redux/Reducers/Booking/booking';

const SelectTimeCheckout: FC = () => {
  const dispatch = useDispatch<Dispatch<BookingAction>>();
  const availableCheckoutTime = useSelector<ReducersList, string[] | null>(
    (state) => state.booking.availableCheckoutTime
  );
  const checkOutHour = useSelector<ReducersList, string>((state) => state.booking.checkOutHour);

  const checkValue = useMemo<string>(() => {
    if (!!checkOutHour) {
      return checkOutHour;
    } else {
      return availableCheckoutTime[0];
    }
  }, [checkOutHour, availableCheckoutTime]);

  const onChange = (event: ChangeEvent<{ name?: string; value: string }>, child: ReactNode) => {
    dispatch({ type: 'SET_CHECK_OUT_HOUR', payload: event.target.value });
  };

  return useMemo(
    () => (
      <Select
        MenuProps={MenuProps}
        onChange={onChange}
        input={<BootstrapInput fullWidth className="selectHours__input" />}
        displayEmpty
        value={checkValue || ''}
        IconComponent={KeyboardArrowDown}>
        {availableCheckoutTime.map((item, index) => (
          <MenuItem key={index} value={item}>
            <p className="selectHours__guest">{item}</p>
          </MenuItem>
        ))}
      </Select>
    ),
    [checkValue, availableCheckoutTime]
  );
};

export default memo(SelectTimeCheckout);
