import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.coordinates;
  const { title, location } = route.params;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}
    >
      <Marker
        coordinate={{
          latitude,
          longitude,
        }}
        title={title}
        description={location}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
