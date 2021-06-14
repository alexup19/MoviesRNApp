import React, { useEffect, useState }  from 'react';

import { SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import axios from 'core/axios';

import TitleBar from 'atoms/title-bar';
import MoviesList from 'components/molecules/movies-list';
import { Colors } from 'styles';

import { IMovie } from 'core/domain/movie.interface';

const AppContainerView = styled.View`
  flex: 1;
  background-color: ${Colors.BLACK};
`;

const App = () => {
  const [movies, setMovies] = useState([] as IMovie[]);

  const getMovies = () => {
    axios.get(`https://api.themoviedb.org/3/movie/popular`)
    .then(function (response) {
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
      <SafeAreaView />
			<StatusBar barStyle="light-content" />
      <TitleBar title="Top Movies" />
      <MoviesList movies={movies} />
		</AppContainerView>
	);
};

export default App;
