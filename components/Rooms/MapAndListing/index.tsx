import React, { useMemo } from 'react';
import { useRefreshListing } from './context';
import MapRoomListing from './MapRoomListing';
import SidebarAndListing from '../SidebarAndListing';

const MapAndListing = () => {
  const { isMapOpen } = useRefreshListing();
  return useMemo(
    () =>
      !!isMapOpen ? <MapRoomListing/> : <SidebarAndListing/>,
    [isMapOpen]
  );
};

export default MapAndListing;
