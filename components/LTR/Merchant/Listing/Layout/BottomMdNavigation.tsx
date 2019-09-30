import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import ButtonGlobal from '@/components/ButtonGlobal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';

interface IProps {
  activeStep: number;
  handleBack: () => void;
  steps: Array<string>;
  handleNext: () => void;
  disableNext?: boolean;
}

const BottomMdNavigation: FC<IProps> = (props) => {
  const { activeStep, handleBack, steps, handleNext, disableNext } = props;

  return (
    <GridContainer
      xs={10}
      className="bottom-navigation"
      classNameItem="bottom-navigation-container">
      <Grid container item xs={7} className="bottom-navigation-inner-container">
        <Grid item className="bottom-navigation-inner-wrapper">
          <Grid className="prev-button">
            <Button
              className="prev-link"
              onClick={handleBack}>
              <FontAwesomeIcon icon={faChevronLeft} size="2x" color="#fa991c"></FontAwesomeIcon>
              <span className="prev-title">Back</span>
            </Button>
          </Grid>
          <Grid className="next-button">
            <ButtonGlobal onClick={handleNext} disabled={disableNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </ButtonGlobal>
          </Grid>
        </Grid>
      </Grid>
    </GridContainer>
  );
};
BottomMdNavigation.defaultProps = {
  disableNext: false,
};

export default BottomMdNavigation;
