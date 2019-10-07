import { ImageReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/images';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { createStyles, Grid, makeStyles, TextField, Theme, Typography, CardActions, Tooltip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React, { ChangeEvent, FC, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  classes?: any;
  label?: string;
  subLabel?: string;
  arrImage: any;
  typeImage?: number;
  typeUpload: { type: any };
  type_txt?: string;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    wrapper: {
      marginBottom: theme.spacing(3)
    },
    textField: {
      width: '100%'
    },
    cardContent: {
      padding: '0 10px',
      '&:last-child': {
        paddingBottom: 0
      }
    },
    card: {
      position: 'relative'
    },
    media: {
      height: 250,
      border: '3px solid #ededed',
      borderRadius: 5
    },
    marginLabel: {
      marginBottom: theme.spacing(2)
    },
    cardAction: {
      color: '#ffffff',
      padding: theme.spacing(0, 1),
      position: 'absolute',
      top: '7%',
      left: '5%',
      zIndex: 10,
      boxSizing: 'border-box',
      display: 'flex',
      cursor: 'pointer',
      width: '30px',
      height: '30px',
      backgroundColor: '#484848',
      border: '1px solid lightgray',
      borderRadius: '50%'
    }
  })
);

const CardImageCaption: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { label, subLabel, arrImage, typeImage, typeUpload, type_txt } = props;
  const dispatch = useDispatch<Dispatch<ImageReducerAction>>();
  const [values, setValues] = useState(arrImage);
  const handleBlur = () => {
    if (type_txt) {
      dispatch({ type: typeUpload.type, payload: { [`${type_txt}`]: { images: values } } });
    } else {
      dispatch({ type: typeUpload.type, payload: { images: values } });
    }
  };
  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    values[index].caption = event.target.value;
    setValues(values);
  };
  const handleRemoveImage = (index: number) => {
    let newValues = values.splice(index, 1);
    setValues(newValues);
    handleBlur();
  };

  return (
    <Fragment>
      <Grid className={classes.wrapper}>
        <Grid container className={classes.marginLabel}>
          <section>
            <Typography variant="h1" className="label main_label">
              {label}
            </Typography>
            <Grid item className="normal_text">
              <span>{subLabel}</span>
            </Grid>
          </section>
        </Grid>
        <Grid container spacing={3}>
          {values.map((img, index) => (
            <Grid className={classes.card} item xs={12} sm={typeImage === 1 || typeImage === 4 ? 12 : 6} key={index}>
              {values.length > 1 ? (
                <Tooltip title="Xóa ảnh" placement="right" classes={{ tooltip: 'tooltip' }}>
                  <CardActions
                    onClick={() => handleRemoveImage(index)}
                    className={classes.cardAction}
                    disableSpacing>
                      <FontAwesomeIcon icon={faTrashAlt} size="1x"></FontAwesomeIcon>
                  </CardActions>
                </Tooltip>
              ) : (
                ''
              )}
              <Card >
                <CardMedia
                  className={classes.media}
                  image={IMAGE_STORAGE_LG + img.name}
                  title="Image"
                />
                <CardContent className={classes.cardContent}>
                  <TextField
                    id="standard-multiline-flexible"
                    label=""
                    placeholder={t('details:images:addCaption')}
                    multiline
                    rows="1"
                    rowsMax="4"
                    defaultValue={values[`${index}`].caption}
                    onChange={handleChange(index)}
                    onBlur={handleBlur}
                    className={classes.textField}
                    margin="normal"
                    InputProps={{
                      disableUnderline: true
                    }}
                    inputProps={{
                      style: { lineHeight: 1.5 }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CardImageCaption;
