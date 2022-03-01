import React, { useEffect, useState }  from 'react';

import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import axios from 'core/axios';

import { Colors } from 'styles';
import { IMovieDetails, IMovieGenres } from 'core/domain/movie.interface';

const AppContainerView = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.BLACK};
`;

const Text = styled.Text`
  color: ${Colors.WHITE};
  font-size: 32px;
  text-align: center;
`;

const OverviewText = styled.Text`
    color: ${Colors.WHITE};
    font-size: 16px;
    text-align: center;
    margin: 16px;
`;

const GenreView = styled.View`
    margin: 8px;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 100px;
`;

const GenreText = styled.Text`
    color: ${Colors.WHITE};
    font-size: 14px;
`;

const DetailsScreen = ({ route } : { route: { params: { movieId: number }}}) => {
    const { movieId } = route.params;
    const [movie, setMovie] = useState({} as IMovieDetails);

    const getMovieDetails = () => {
        axios.get(`movie/${movieId}`)
        .then(function (response) {
            console.log(response.data);
            setMovie(response.data);
        })
        .catch(function (error) {
            console.log(error.response);
        });
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    const { 
        original_title, 
        overview, 
        poster_path,
        genres
    } = movie;

    const genreListItem = ({ item }: { item: IMovieGenres }) => (
        <GenreView>
            <GenreText>{item.name}</GenreText>
        </GenreView>
    );

    const keyExtractor = (item: IMovieGenres) => String(item.id);

    return (
        <AppContainerView>
            <FastImage
                style={{
                    width: 200,
                    height: 300,
                    alignSelf: 'center',
                    marginVertical: 16,
                }}
                source={{
                    uri: `https://image.tmdb.org/t/p/w185${poster_path}`,
                    priority: FastImage.priority.normal,
                }}
            />
            <Text>
                {original_title}
            </Text>
            <OverviewText>
                {overview}
            </OverviewText>
            <FlatList
                data={genres}
                renderItem={genreListItem}
                numColumns={3}
                contentContainerStyle={{ alignItems: 'center', flex: 1 }}
                keyExtractor={keyExtractor}
            />
        </AppContainerView>
    );
}

export default DetailsScreen;