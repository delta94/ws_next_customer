import React, { useState, FC, useMemo, memo } from 'react';
import { Grid, InputBase, Paper } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import CustomPopper from '@/components/CustomPopper';
import { useTranslation } from 'react-i18next';

const ActionChoose = dynamic(() => import('./ActionChoose'));

const ChooseGuestRoom: FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const numberGuest = useSelector<ReducersList, number>((state) => state.searchFilter.guestsCount);
  const numberRoom = useSelector<ReducersList, number>((state) => state.searchFilter.roomsCount);

  const valueInput = useMemo<string>(() => {
    if (numberGuest !== 0 && numberRoom !== 0) {
      return `${numberGuest} ${t('home:searchComponent:guest')} & ${numberRoom} ${t(
        'home:searchComponent:room'
      )}`;
    } else if (numberGuest !== 0) {
      return `${numberGuest} ${t('home:searchComponent:guest')} & 0 ${t(
        'home:searchComponent:room'
      )}`;
    } else if (numberRoom !== 0) {
      return `0 ${t('home:searchComponent:guest')} & ${numberRoom} ${t(
        'home:searchComponent:room'
      )}`;
    }

    return '';
  }, [numberGuest, numberRoom]);

  const hanldeClose = () => {
    setOpen(false);
  };

  return (
    <CustomPopper
      arrow
      placement="bottom"
      duration={200}
      trigger="click"
      isVisible={open}
      theme="light-border"
      onHide={hanldeClose}
      interactive
      content={<ActionChoose open={open} setOpen={setOpen}></ActionChoose>}>
      <Paper elevation={0} className="chooseGuestRoom">
        <Grid container className="root" onClick={() => setOpen(true)}>
          <span className="flex_columCenter">
            <FontAwesomeIcon icon={faDoorClosed} size="1x"></FontAwesomeIcon>
            <InputBase
              readOnly
              value={valueInput}
              className="input"
              placeholder={`${t('home:searchComponent:guestUpper')} & ${t(
                'home:searchComponent:room'
              )}`}
            />
          </span>
        </Grid>
      </Paper>
    </CustomPopper>
  );
};

export default memo(ChooseGuestRoom);