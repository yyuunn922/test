import styled from '@emotion/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const TitleText = styled.Text`
    color: white;
    font-size: 33px;
    font-weight: bold;
`;

export const TitleTextB = styled.Text`
    padding: 10px;
    color: black;
    font-size: 33px;
    font-weight: bold;
`;

export const SmallText = styled.Text`
    color: white;
    font-size: 12px;
    font-weight: bold;
`;

export const Container = styled(GestureHandlerRootView)`
    aspect-ratio: 16/4;
    cursor: grab;
`;

export const FlatContainer = styled.FlatList`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const Layer = styled.View`
    padding: 2px 6px;
    border-radius: 20px;
    background-color: #11111180;
    color: white;
`;

export const FlexRow = styled.View`
    gap: 10px;
    display: flex;
    flex-direction: row;
`;

export const IndicatorItem = styled.TouchableOpacity<{selectedState: boolean}>`
    border-radius: 100%;
    width: 10px;
    aspect-ratio: 1/1;
    ${({selectedState}) => (selectedState ? 'background-color: white;' : 'border: 1px solid white;')}
`;

export const ImageContainer = styled.View<{windowWidth: number}>`
    position: relative;
    width: ${({windowWidth}) => `${windowWidth}px`};
    height: 100%;
`;

export const ImageItem = styled.Image`
    width: 100%;
    aspect-ratio: 16/4;
    cursor: pointer;
`;

export const Filter = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    z-index: 1;
`;
