import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";

function WeatherEx() {
  const [cityName, onChangeCity] = useState("");
  const [weatherArr, setWeatherArr] = useState([]);

  // GET DATA BY REGULAR FETCH
  // const GetCityWeather = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.weatherapi.com/v1/current.json?key=7bc08654c7e84d0da7d82216222103&q=${cityName}`
  //     );
  //     const json = await response.json();
  //     setWeatherArr([...weatherArr, json]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // GET DATA WITH AXIOS
  const GetCityWeather = async () => {
    try {
      await axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=7bc08654c7e84d0da7d82216222103&q=${cityName}`
        )
        .then((response) => {
          setWeatherArr([...weatherArr, response.data]);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCity}
        value={cityName}
        placeholder="City name"
      />
      <View style={{ width: "50%", alignSelf: "center" }}>
        <Button
          title="Search"
          color="green"
          onPress={() => {
            GetCityWeather();
          }}
        />
      </View>

      <ScrollView>
        {weatherArr.map((e, i) => {
          return (
            <View style={styles.box} key={i}>
              <Image
                source={{
                  uri: `https:${e.current.condition.icon}`,
                }}
                style={{
                  width: 45,
                  height: 45,
                }}
              />
              <Text style={[styles.text, { color: "red" }]}>
                {e.current.temp_c} °C
              </Text>
              <Text style={styles.text}>{e.current.condition.text}</Text>
              <Text style={styles.text}>City name: {e.location.name}</Text>
              <Text style={styles.text}>Country: {e.location.country}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  box: {
    borderWidth: 1,
    margin: 15,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WeatherEx;
