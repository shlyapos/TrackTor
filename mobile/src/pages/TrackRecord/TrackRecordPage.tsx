import { PureComponent } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { ActivityIndicator, FAB } from 'react-native-paper';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { boundingBox } from '../../utils/variables';
import { IFrontendTrack } from '../../models/tracks';
import UserMarker from './components/UserMarker';
import InfoBlock from './components/InfoBlock';
import TrackRunStop from './components/TrackRunStop';
import ActionButtons, { IActionButtonsProps } from './components/ActionButtons';
import { loadStatus } from './index';

import styles from './TrackRecordStyle';

interface ITrackRecordPageProps extends IActionButtonsProps {
  routeCoords?: IFrontendTrack['coords'];
  finishStatus?: boolean;
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
      routeCoords,
      finishStatus,
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
        <InfoBlock time={timer} distance={distance} />

        {isUserLocLoaded === 'stop' && routeCoords ? (
          <TrackRunStop
            onPressSave={onPressSave}
            onPressContinue={onPressContinue}
            onPressNotSave={onPressNotSave}
            isFinished={finishStatus}
          />
        ) : (
          <View>
            {isUserLocLoaded === 'load' ? (
              <>
                <Text style={styles.loadText}>??????????????????, ?????? ???????? ????????...</Text>

                <ActivityIndicator
                  animating={true}
                  color={styles.loadAnimate.color}
                  style={styles.loadAnimate}
                  size={60}
                />
              </>
            ) : (
              <View>
                {/* TODO: ??????, ?????? ?????? ???????????????? ???? ???????????? ???????????????? ???? ?????????????????? ?????????????? */}
                {isUserLocLoaded === 'done' && (
                  <FAB
                    style={styles.fab}
                    icon={routeCoords ? 'stop' : 'pause'}
                    onPress={onPressPause}
                  />
                )}
                {isUserLocLoaded === 'stop' && !routeCoords && (
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
                  {/* User location marker */}
                  <Marker
                    coordinate={{
                      latitude: userLoc.coords.latitude,
                      longitude: userLoc.coords.longitude,
                    }}
                  >
                    <UserMarker />
                  </Marker>

                  {/* Checkpoint markers for record */}
                  {coords &&
                    coords.map(({ lat, lon }, index) => (
                      <Marker
                        key={index}
                        coordinate={{ latitude: lat, longitude: lon }}
                        pinColor={styles.mapMarkerRecord.color}
                      />
                    ))}

                  {/* Path lines for record */}
                  {coords && coords.length > 1 && (
                    <Polyline
                      coordinates={coords.map(({ lat, lon }) => ({
                        latitude: lat,
                        longitude: lon,
                      }))}
                      strokeWidth={2}
                      strokeColor={styles.mapMarkerRecord.color}
                      lineCap={'round'}
                    />
                  )}

                  {/* Checkpoint markers for track route */}
                  {routeCoords &&
                    routeCoords.map(({ lat, lon }, index) => (
                      <Marker
                        key={index}
                        coordinate={{ latitude: lat, longitude: lon }}
                        pinColor={styles.mapMarkerRoute.color}
                      />
                    ))}

                  {/* Path lines for track route */}
                  {routeCoords && (
                    <Polyline
                      coordinates={routeCoords.map(({ lat, lon }) => ({
                        latitude: lat,
                        longitude: lon,
                      }))}
                      strokeWidth={2}
                      strokeColor={styles.mapMarkerRoute.color}
                      lineCap={'round'}
                    />
                  )}
                </MapView>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
