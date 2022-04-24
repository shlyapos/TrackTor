import { PureComponent } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator, FAB } from 'react-native-paper';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { boundingBox } from '../../utils/variables';
import { IFrontendTrack } from '../../models/tracks';
import UserMarker from './components/UserMarker';
import InfoBlock from './components/InfoBlock';
import ActionButtons, { IActionButtonsProps } from './components/ActionButtons';
import { loadStatus } from './index';

import styles from './TrackRecordStyle';

interface ITrackRecordPageProps extends IActionButtonsProps {
  coords: IFrontendTrack['coords'];
  timer: string;
  distance: string;
  userLoc: Location.LocationObject;
  isUserLocLoaded: loadStatus;
  onPressPause: () => void;
}

export default class TrackRecordPage extends PureComponent<ITrackRecordPageProps> {
  private _mapView: MapView | null = null;

  componentDidUpdate(nextProps: ITrackRecordPageProps) {
    const { userLoc, isUserLocLoaded } = nextProps;
    const { latDelta, lngDelta } = this.magicCalculateZoom();

    if (isUserLocLoaded === 'done' && this._mapView) {
      this._mapView.animateToRegion({
        latitude: userLoc.coords.latitude,
        longitude: userLoc.coords.longitude,
        latitudeDelta: latDelta * 0.05,
        longitudeDelta: lngDelta * 0.05,
      });
    }
  }

  private magicCalculateZoom = () => {
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;

    const northeastLat = boundingBox.northEast.latitude;
    const southwestLat = boundingBox.southWest.latitude;
    const latDelta = northeastLat - southwestLat;
    const lngDelta = latDelta * ASPECT_RATIO;

    return { latDelta, lngDelta };
  };

  render() {
    const {
      coords,
      timer,
      distance,
      userLoc,
      isUserLocLoaded,
      onPressPause,
      onPressSave,
      onPressContinue,
      onPressNotSave,
    } = this.props;
    const { latDelta, lngDelta } = this.magicCalculateZoom();

    return (
      <View style={styles.container}>
        <View>
          <InfoBlock time={timer} distance={distance} />

          {isUserLocLoaded === 'load' ? (
            <ActivityIndicator
              animating={true}
              color={styles.loadAnimate.color}
              style={styles.loadAnimate}
              size={60}
            />
          ) : (
            <View>
              {/* TODO: баг, что при переходе на другую страницу не очищаются маркеры */}
              {isUserLocLoaded === 'done' && (
                <FAB style={styles.fab} icon='pause' onPress={onPressPause} />
              )}
              {isUserLocLoaded === 'stop' && (
                <ActionButtons
                  onPressSave={onPressSave}
                  onPressContinue={onPressContinue}
                  onPressNotSave={onPressNotSave}
                />
              )}

              <MapView
                ref={(mapView) => {
                  this._mapView = mapView;
                }}
                style={styles.map}
                showsBuildings
                initialRegion={{
                  latitude: userLoc.coords.latitude,
                  longitude: userLoc.coords.longitude,
                  latitudeDelta: latDelta * 0.5,
                  longitudeDelta: lngDelta * 0.5,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: userLoc.coords.latitude,
                    longitude: userLoc.coords.longitude,
                  }}
                >
                  <UserMarker />
                </Marker>

                {coords &&
                  coords.map(({ lat, lon }, index) => (
                    <Marker
                      key={index}
                      coordinate={{ latitude: lat, longitude: lon }}
                    />
                  ))}

                {coords && coords.length > 1 && (
                  <Polyline
                    coordinates={coords.map(({ lat, lon }) => ({
                      latitude: lat,
                      longitude: lon,
                    }))}
                    strokeWidth={2}
                    strokeColor={styles.mapPolylineColor.color}
                    lineCap={'round'}
                  />
                )}
              </MapView>
            </View>
          )}
        </View>
      </View>
    );
  }
}
