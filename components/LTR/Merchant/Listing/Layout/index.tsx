import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid/Grid';

import GridContainer from '@/components/Layout/Grid/Container';
import HeaderNav from './HeaderNavigation';
import StepperProgress from './StepperProgress';

interface IProps {
  title: string;
}

const Layout: FC<IProps> = (props) => {
  const { title } = props;

  return (
    <Grid className="listing-container">
      <HeaderNav title={title} />
      <GridContainer
        xs={12}
        md={10}
        className="listing-content"
        classNameItem="listing-content-wrapper">
        <StepperProgress />
      </GridContainer>
    </Grid>
  );
};

export default Layout;
