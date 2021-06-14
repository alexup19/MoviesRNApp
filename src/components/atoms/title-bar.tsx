import React from 'react';

import styled from 'styled-components/native';

import { Colors } from 'styles';

const Container = styled.View`
  flex-direction: row;
  height: 40px;
  justify-content: center;
`;

const Text = styled.Text`
  color: ${Colors.WHITE};
  font-size: 16px;
`;

interface IBarView {
  left?: boolean;
  right?: boolean;
}

const BarView = styled.View<IBarView>`
  align-items: ${(props) => {
    if (props.left) return 'flex-start';
    if (props.right) return 'flex-end';
    return 'center'
  }};
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
`;

interface IProps {
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  title: string;
}

const TitleBar = ({leftComponent, rightComponent, title}: IProps) => (
  <Container>
    {
      leftComponent && (
        <BarView left>
          {leftComponent}
        </BarView>
      )
    }
    <BarView>
      <Text>{title}</Text>
    </BarView>
    {
      !rightComponent && (
        <BarView right>
          {rightComponent}
        </BarView>
      )
    }
  </Container>
);

export default TitleBar;