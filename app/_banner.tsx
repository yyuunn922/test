import React, {useRef, useState} from "react";
import styled from '@emotion/native'
import {Dimensions, FlatList, Text} from "react-native";
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {CenterView} from "@/systems/components/centerView";
import {AbsoluteView} from "@/systems/components/absoluteView";

const windowWidth = Dimensions.get('window').width
// 아이템 요소 더미 데이터
const items: React.ReactNode[] = [
    'https://picsum.photos/1200/600?random=1',
    'https://picsum.photos/1200/600?random=2',
    'https://picsum.photos/1200/600?random=3',
    'https://picsum.photos/1200/600?random=4'
]

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
    const [currentIndex, setCurrentIndex] = useState(1);


    // 마우스 클릭시
    const pointerDownEvent = (e: any) => {
        setIsDrag(true);
        startOffsetX.current = e.nativeEvent.pageX; // 클릭한 순간 X 좌표
        scrollStartOffset.current = scrollOffsetX.current; // 현재 스크롤 위치 저장
    };

    // 마우스 무브시
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

    // 마우스 땠음
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
                {/*현재*/}
                <AbsoluteView>
                    <Text>123123</Text>
                </AbsoluteView>
                <FlatContainer
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    onScroll={e => {
                        scrollOffsetX.current = e.nativeEvent.contentOffset.x;
                        console.log(scrollOffsetX.current)
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
                    renderItem={({ item }: { item: any }) => <BannerItem url={item} />}
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

const BannerItem = ({url} : {url: string}) => {
    return <ImageContainer>
        <Filter />
        <CenterView>
            <TitleText>Lorem ipsum dolor sit amet.</TitleText>
        </CenterView>
        <ImageItem source={{uri: url}}/>
    </ImageContainer>
}


