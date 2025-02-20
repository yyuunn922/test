import styled from '@emotion/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ImageProps, useWindowDimensions} from "react-native";
import {FC} from "react";

const mobileRatio = "16 / 10"
const defaultRatio = "16 / 4"
const wideRatio = "16 / 3"

// TODO:: 추후 컴포넌트와 스타일 분리 필요
const ContainerBase = styled(GestureHandlerRootView)<{ aspectRatio: string }>`
    aspect-ratio: ${({ aspectRatio }) => aspectRatio};
    cursor: grab;
`;

export const Container = ({ children, ...props }: { children: React.ReactNode }) => {
    const { width } = useWindowDimensions();
    const aspectRatio = width > 600 ? width > 2200 ? wideRatio : defaultRatio : mobileRatio;

    return (
        <ContainerBase aspectRatio={aspectRatio} {...props}>
            {children}
        </ContainerBase>
    );
};

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
    align-items: center;
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

export const ImageItemBase = styled.Image<{ size: string }>`
    width: 100%;
    aspect-ratio: ${({ size }) => size};
    cursor: pointer;
`;

export const ImageItem: FC<ImageProps> = ({...props}) => {
    const {width} = useWindowDimensions()
    const size = width > 600 ? width > 2200 ? wideRatio : defaultRatio : mobileRatio;
    return <ImageItemBase {...props} size={size} />
}



export const Filter = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    z-index: 1;
`;
