import { PureComponent } from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { boundingBox } from '../../utils/variables';
import TopMenu from '../../components/TopMenu';
import UserMarker from './components/UserMarker';
import { loadStatus } from './index';

import styles from './TrackRecordStyle';

interface ITrackRecordPageProps {
  userLoc: Location.LocationObject;
  isUserLocLoaded: loadStatus;
  onPressBack: () => void;
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
        latitudeDelta: latDelta * 0.1,
        longitudeDelta: lngDelta * 0.1,
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
    const { userLoc, isUserLocLoaded, onPressBack } = this.props;
    const { latDelta, lngDelta } = this.magicCalculateZoom();

    return (
      <View style={styles.container}>
        <TopMenu onPress={onPressBack} />

        {isUserLocLoaded === 'done' && (
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
          </MapView>
        )}
      </View>
    );
  }
}
