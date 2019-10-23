/* global google */
import CitiesList from '@/components/LTR/Merchant/Listing/CreateListing/Location/CitiesList';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { ReducersList } from '@/store/Redux/Reducers';
import { CreateListingActions, CreateListingState } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { FormControl, OutlinedInput } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import classNames from 'classnames';
import { Formik, FormikActions, FormikProps } from 'formik';
import deepEqual from 'lodash.isequal';
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as Yup from 'yup';
import CardWrapperUpdate from '../CardWrapperUpdate';
interface IProps { }
interface Coordinate {
  lat: number;
  lng: number;
}

interface GoogleMapProps {
  defaultCenter: Coordinate | null;
  coordinate: Coordinate;
  onClickMap: (e: google.maps.MouseEvent | google.maps.IconMouseEvent) => void;
}

interface FormValues {
  address: string;
  city: string;
  building: string;
}

const useValidatation = () => {
  const { t } = useTranslation();

  const FormValidationSchema = Yup.object().shape({
    address: Yup.string().required(t('basic:addressRequired')),
    city: Yup.string().required(t('basic:cityRequired'))
  });

  return FormValidationSchema;
};

const UpdateLocation: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  //   const google: any = window.google;  
  //   const { room_id, guestRecommendation, maxGuest } = useSelector<ReducersList, UpdateDetailsState>(
  //     (state) => state.updateDetails
  //   );
  //   const dispatch = useDispatch<Dispatch<UpdateDetailsActions>>();
  const { address, building, disableSubmit } = useSelector<ReducersList, CreateListingState>(
    (state) => state.createListing
  );
  const [addressInput, setAddress] = useState<string>(address);
  const [buildingInput, setBuilding] = useState<string>(building);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [coordinate, setCoordinate] = useState<Coordinate>(null);
  const [defaultCenter, setDefaultCenter] = useState<Coordinate | null>(null);
  const [district, setDistrict] = useState<number>(null);
  const [districtList, setDistrictList] = useState<any[]>(null);
  const [disabledDistrictField, setDisabledDistrictField] = useState<boolean>(true);
  const [disableSubmitForm, setDisableSubmit] = useState<boolean>(disableSubmit);

  const FormValidationSchema = useValidatation();

  useEffect(() => {
    dispatch({
      type: 'SET_DISABLE_SUBMIT',
      payload: disableSubmitForm
    });
  }, [disableSubmitForm]);

  useEffect(() => {
    dispatch({
      type: 'SET_COORDINATE',
      payload: coordinate
    });
  }, [coordinate]);
  useEffect(() => {
    dispatch({
      type: 'SET_ADDRESS',
      payload: addressInput
    });
  }, [addressInput]);

  const onClickMap = (e: google.maps.MouseEvent) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setCoordinate({
      lat: lat,
      lng: lng
    });
  };
  const MapWithAMarker = withGoogleMap<GoogleMapProps>((props) => (
    <GoogleMap defaultZoom={16} defaultCenter={props.defaultCenter} onClick={props.onClickMap}>
      <Marker position={props.coordinate} />
    </GoogleMap>
  ));

  const handleChange = (event) => {
    setBuilding(event.target.value);
  };

  const onSuggestSelect = (place: Suggest) => {
    if (place) {
      let { lat, lng } = place.location;
      setCoordinate({
        lat,
        lng
      });
      setDefaultCenter({
        lat,
        lng
      });
      setAddress(place.label);
    }
  };

  const callBackOnChange = (value) => {
    setDistrict(value);
    dispatch({
      type: 'SET_DISTRICT_ID',
      payload: parseInt(value)
    });
  };

  const handleBlur = (e) => {
    dispatch({
      type: 'SET_BUILDING',
      payload: buildingInput
    });
  };

  const initFormValue: FormValues = {
    address: '',
    city: '',
    building: ''
  };

  const handleFormSubmit = (values: FormValues, actions: FormikActions<FormValues>) => {
    return {};
  };

  const handleChangeAddress = (setFieldValue: any) => (value: any) => {
    setFieldValue('address', value);
  };

  const InputFeedback = ({ error }) =>
    error ? <div className={classNames('input-feedback')}>{error}</div> : null;

  return (
    <Fragment>
      <CardWrapperUpdate>
        <div className="step1-tab3-location">
          <Grid className="createListing-location">
            <Grid className="createListing-heading-1">Địa chỉ căn hộ của bạn</Grid>
            <Grid className="createListing-subTitle">
              Khách sẽ chỉ biết được địa chỉ chính xác sau khi đặt phòng thành công
            </Grid>
          </Grid>

          <Formik
            enableReinitialize={true}
            validateOnChange={true}
            validationSchema={FormValidationSchema}
            initialValues={initFormValue}
            onSubmit={handleFormSubmit}
            render={({
              values,
              handleSubmit,
              touched,
              errors,
              initialValues,
              isSubmitting,
              handleChange,
              handleBlur,
              setFieldValue,
              setFieldTouched
            }: FormikProps<FormValues>) => {
              const hasChanged = !deepEqual(values, initialValues);
              const hasErrors = Object.keys(errors).length > 0;
              setDisableSubmit(!hasChanged || hasErrors || isSubmitting);
              return (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ color: '#767676' }}>Địa chỉ</h3>
                  <Geosuggest
                    country="vn"
                    placeholder="Nhập địa chỉ"
                    onSuggestSelect={onSuggestSelect}
                    // location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius={20}
                    onChange={handleChangeAddress(setFieldValue)}
                    onBlur={() => {
                      setFieldTouched('address', true);
                    }}
                    value={values.address}
                    name="address"
                  />

                  {touched.address && <InputFeedback error={errors.address} />}
                  <Grid style={{ width: 'calc(80% - 8px)', margin: '20px 0' }}>
                    <h3 style={{ color: '#767676' }}>Toà nhà (Tuỳ chọn)</h3>

                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        placeholder="Nhập số căn hộ"
                        id="component-outlined"
                        value={values.building}
                        onChange={(e) => {
                          setFieldValue('building', e.target.value);
                        }}
                        onBlur={(e: any) => {
                          handleBlur(e);
                          dispatch({
                            type: 'SET_BUILDING',
                            payload: e.currentTarget.value
                          });
                        }}
                        labelWidth={0}
                      />
                    </FormControl>
                  </Grid>
                  <Grid container style={{ display: 'flex' }}>
                    <Grid item xs={7} style={{ paddingRight: 20 }}>
                      <Grid style={{ margin: '32px 0' }}>
                        <h3
                          style={{
                            color: '#767676',
                            paddingBottom: 8,
                            fontSize: 16,
                            fontWeight: 600,
                            lineHeight: '1.375em'
                          }}>
                          Thành phố
                        </h3>
                        <CitiesList
                          onChange={setFieldValue}
                          // onBlur={handleBlur}
                          valueCity={values.city}
                          onBlur={setFieldTouched}
                          districtList={districtList}
                          setDistrictList={setDistrictList}
                          setDisabledDistrictField={setDisabledDistrictField}
                          setDistrict={setDistrict}
                        />
                        {touched.city && <InputFeedback error={errors.city} />}
                      </Grid>
                    </Grid>
                    <Grid item xs={5}>
                      <SelectCustom
                        name="district"
                        // onChange={handleChangeSelect}
                        value={district}
                        options={districtList}
                        title="Quận huyện"
                        callBackOnChange={callBackOnChange}
                        disabled={disabledDistrictField}
                      />
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          />

          <Grid className="createListing-heading-2">Đây đã phải là địa chỉ đúng chưa?</Grid>
          <h3 className="createListing-subTitle">
            Nếu cần thiết, bạn có thể thay đổi vị trí cho chính xác. Chỉ những khách hàng xác nhận
            đặt phòng mới có thể thấy được
          </h3>
          {defaultCenter && (
            <MapWithAMarker
              containerElement={<div style={{ height: `300px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              defaultCenter={defaultCenter}
              coordinate={coordinate}
              onClickMap={onClickMap}
            />
          )}
        </div>
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdateLocation;