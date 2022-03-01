import React from 'react';

import { FlatList, ActivityIndicator } from 'react-native';

import MovieCard, { containerHeight } from 'components/atoms/movie-card';
import { IMovie } from 'core/domain/movie.interface';
import { verticalScale } from 'utils/scaling';

interface IProps {
  movies: IMovie[];
}

const MoviesList = ({ movies }: IProps) => {
  const renderItem = ({ item }: { item: IMovie}) => (
    <MovieCard 
      title={item.title}
      releaseDate={item.release_date}
      posterPath={item.poster_path}
      movieId={item.id}
    />
  );

  const getItemLayout = (_data: any, index: number) => (
    {length: containerHeight, offset: containerHeight * index, index}
  );

  const keyExtractor = (item: IMovie) => String(item.id);

  const renderFooter = () => {
    if (movies.length) {
      return <></>;
    }
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentContainerStyle={{ paddingBottom: verticalScale(40) }}
      getItemLayout={getItemLayout}
      ListFooterComponent={renderFooter}
    />
  );
}

export default MoviesList;