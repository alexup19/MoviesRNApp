import React, { useState } from 'react';

import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';

import { verticalScale, moderateScale, moderateVerticalScale, scaleFont } from 'utils/scaling';
import { Colors } from 'styles';

const { width: DEVICE_WIDTH } = Dimensions.get('window');
const imageOriginalWidth = 185;
const imageOriginalHeight = 278;
const cardPadding = moderateScale(10);
const cardWidth = (DEVICE_WIDTH / 2) - (cardPadding/2 * 2);
const imageHeight = (imageOriginalHeight/imageOriginalWidth) * cardWidth;

export const containerHeight = Math.ceil(imageHeight + moderateVerticalScale(80, 0.25) + cardPadding);

const Container = styled.View`
  width: ${DEVICE_WIDTH/2}px;
  align-items: center;
  padding-bottom: ${cardPadding}px;
  height: ${containerHeight}px;
`;

const Card = styled.View`
  background-color: #1c1a1a;
  flex: 1;
  align-items: center;
  width: ${cardWidth}px;
  border-radius: 15px;
`;

const Text = styled.Text`
  color: ${Colors.WHITE};
  font-size: ${scaleFont(14)}px;
`;

const TextContainer = styled.View`
  width: 100%;
  flex: 1;
  padding: ${cardPadding}px;
`;

interface IProps {
  posterPath: string;
  title: string;
  releaseDate: string;
}

const MovieCard = ({ posterPath, title, releaseDate }: IProps) => (
  <Container>
      <Card>
      <FastImage
          style={{
          width: cardWidth,
          height: imageHeight,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          }}
          source={{
          uri: `https://image.tmdb.org/t/p/w185${posterPath}`,
          priority: FastImage.priority.normal,
          }}
      />
      <TextContainer>
          <Text style={{ fontWeight: "bold", fontSize: scaleFont(15) }} numberOfLines={2}>{title}</Text>
          <Text style={{ paddingTop: verticalScale(8) }}>{dayjs(releaseDate).format('MMMM DD, YYYY')}</Text>
      </TextContainer>
      </Card>
  </Container>
);

export default MovieCard;