import React, {FC, ReactNode, useRef, useState} from "react";
import styled from '@emotion/native'
import {Dimensions, FlatList, Text, View, ViewProps} from "react-native";
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {number} from "prop-types";
import {topBoolOrEmptySchema} from "ajv/lib/compile/validate/boolSchema";

const windowWidth = Dimensions.get('window').width
// 아이템 요소 더미 데이터
const items: React.ReactNode[] = [
    'https://picsum.photos/1200/600?random=1',
    'https://picsum.photos/1200/600?random=2',
    'https://picsum.photos/1200/600?random=3',
    'https://picsum.photos/1200/600?random=4'
]

// TODO:: 공통 CSS 분리
type Position = {
    top: number,
    bottom: number,
    right: number,
    left: number,
}
const AbsoluteVIew = styled.View<Partial<Position>> `
    top: ${(props) => props.top ? `${`${props.top}`}` : null};
    bottom: ${(props) => props.bottom ? `${`${props.bottom}`}` : null};
    left: ${(props) => props.left ? `${`${props.left}`}` : null};
    right: ${(props) => props.right ? `${`${props.right}`}` : null};
    position: absolute;
    z-index: 3;
`

const TitleText = styled.Text `
    color: white;
    font-size: 33px;
    font-weight: bold;
`


// TODO:: 추후 외부 CSS로
const Container = styled(GestureHandlerRootView) `
    aspect-ratio: 16/4;
    cursor: grab;
    
`
const FlatContainer = styled.FlatList `
    position: relative;
    width:100%;
    height: 100%;
`
export const Banner = () => {
    const flatListRef = useRef<FlatList>(null);
    const [isDrag, setIsDrag] = useState(false);
    const scrollOffsetX = useRef(0);
    const startOffsetX = useRef(0);
    const scrollStartOffset = useRef(0); // 마우스 클릭 시점의 스크롤 위치

    const pointerDownEvent = (e: any) => {
        setIsDrag(true);
        startOffsetX.current = e.nativeEvent.pageX; // 클릭한 순간 X 좌표
        scrollStartOffset.current = scrollOffsetX.current; // 현재 스크롤 위치 저장
    };

    const pointerMoveEvent = (e: any) => {
        if (isDrag && flatListRef.current) {
            const deltaX = startOffsetX.current - e.nativeEvent.pageX; // 마우스 이동 거리
            const newOffset = scrollStartOffset.current + (deltaX * 5); // 기존 위치 + 이동 거리

            flatListRef.current.scrollToOffset({
                offset: Math.max(0, newOffset), // 음수 방지
                animated: true, // 즉시 이동 (부드러운 반응성)
            });
        }
    };

    const pointerUpEvent = () => {
        setIsDrag(false);
    }

    return (
        <>
            <Container
                onPointerDown={pointerDownEvent}
                onPointerUp={pointerUpEvent}
                onPointerMove={pointerMoveEvent}
            >
                <AbsoluteVIew>
                    <Text>123123</Text>
                </AbsoluteVIew>
                <FlatContainer
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    onScroll={e => {
                        scrollOffsetX.current = e.nativeEvent.contentOffset.x;
                    }}
                    getItemLayout={(_, index) =>({
                        length: windowWidth,
                        offset: windowWidth * index,
                        index
                    })}
                    showsHorizontalScrollIndicator={true}
                    pagingEnabled={true}
                    horizontal={true}
                    data={items}
                    renderItem={({ item }: { item: any }) => <Item url={item} />}
                />
            </Container>
        </>
    )
}

// TODO:: 추후 외부 CSS로
const ImageContainer = styled.View `
    position: relative;
    width:${`${windowWidth}px`};
    height: 100%;
`
const ImageItem = styled.Image `
    width: 100%;
    aspect-ratio: 16/4;
    cursor: pointer;
`
const Filter = styled.View `
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    z-index: 1;
`

const Item = ({url} : {url: string}) => {
    return <ImageContainer>
        <Filter />
        <Center>
            <TitleText>Lorem ipsum dolor sit amet.</TitleText>
        </Center>
        <ImageItem source={{uri: url}}/>
    </ImageContainer>
}


// Transform, late 불가능으로 구현
const CenterContainer = styled.View<{width: number, height: number}> `
    position: absolute;
    left: 50%;
    bottom: 50%;
    ${({ width, height }) => `
        margin-left: -${width / 2}px;
        margin-top: -${height / 2}px;
    `}
    z-index: 2;
`
const Center: FC<ViewProps> = ({children, ...props}) => {
    const viewRef = useRef<View>(null);
    const [size, setSize] = useState({width: 0, height: 0});
    return (
        <CenterContainer width={size.width} height={size.width} ref={viewRef} {...props} onLayout={e => {
            setSize({width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height})
        }}>
            {children}
        </CenterContainer>
    )
}
