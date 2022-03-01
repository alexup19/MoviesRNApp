import React, { useEffect, useState }  from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import axios from 'core/axios';

import TitleBar from 'atoms/title-bar';
import MoviesList from 'components/molecules/movies-list';
import { Colors } from 'styles';
import DetailsScreen from 'screens/details';

import { IMovie } from 'core/domain/movie.interface';

const AppContainerView = styled.View`
  flex: 1;
  background-color: ${Colors.BLACK};
`;

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const [movies, setMovies] = useState([] as IMovie[]);

  const getMovies = () => {
    axios.get(`movie/popular`)
    .then(function (response) {
      console.log(response.data.results);
      setMovies(response.data.results);
    })
    .catch(function (error) {
      console.log(error.response);
    });
  }

  useEffect(() => {
    getMovies();
  }, []);

	return (
    <AppContainerView>
      <StatusBar barStyle="light-content" />
      <MoviesList movies={movies} />
    </AppContainerView>
	);
};

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Top Movies',
          headerStyle: {
            backgroundColor: Colors.BLACK,
          },
          headerTintColor: Colors.WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{
          title: '',
          headerStyle: {
            backgroundColor: Colors.BLACK,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
