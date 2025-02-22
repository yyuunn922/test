import React, {useEffect, useRef, useState} from 'react';
import {FlatList, TouchableOpacity, useWindowDimensions} from 'react-native';
import {AbsoluteView} from '@/systems/components/absoluteView';
import {AntDesign} from '@expo/vector-icons';
import {LineCenter} from '@/systems/components/lineCenter';
import {
    Container,
    FlatContainer,
    Layer,
    FlexRow,
    IndicatorItem, ImageContainer, Filter, ImageItem,
} from '@/app/web/(banner)/_bannerStyles';
import {
    pointerDownEvent,
    pointerMoveEvent,
    pointerUpEvent,
    indicatorEvent, onscroll,
} from '@/app/web/(banner)/_bannerEvent';
import {CenterView} from "@/systems/components/centerView";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SmallText} from "@/systems/components/common/text/textStyle";
import {TitleText} from "@/systems/components/common/text/text";

// 기본 데이터를 정의합니다.
const items: React.ReactNode[] = Array.from({length: 10}, (_, i) => `https://picsum.photos/1200/600?random=${i + 1}`)

// 컴포넌트 시작
const Banner = () => {
    const {width: windowWidth} = useWindowDimensions();
    const flatListRef = useRef<FlatList>(null);
    const [isDrag, setIsDrag] = useState(false);
    const scrollOffsetX = useRef(0);
    const startOffsetX = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rollingState, setRollingState] = useState(false);
    const rollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const stopRef = useRef(false);

    // 롤링 상태가 변경되면
    useEffect(() => {
        clearInterval(rollingIntervalRef.current!)
        if (rollingState) {
            rollingIntervalRef.current = setInterval(() => {
                if (flatListRef.current) {
                    let targetIndex = Math.floor(scrollOffsetX.current / windowWidth) + 1
                    if (items.length === targetIndex) {
                        targetIndex = 0
                    }
                    flatListRef.current.scrollToIndex({index: targetIndex, animated: true})
                }
            }, 2000)
        }
        return () => {
            if (rollingIntervalRef.current) {
                clearInterval(rollingIntervalRef.current)
            }
        }
    }, [rollingState]);

    useEffect(() => {
        setRollingState(false);
        setInterval(() => {
            if (stopRef.current) {
                setRollingState(true);
            } else {
                stopRef.current = false;
            }
        }, 1000)
    }, [windowWidth]);


    // 렌더링시 초기화
    useEffect(() => setRollingState(true), []);

    return (
        <>
            <Container>
                <AbsoluteView left={20} top={20}>
                    <Layer>
                        <SmallText>{currentIndex + 1} / {items.length}</SmallText>
                    </Layer>
                </AbsoluteView>
                <AbsoluteView bottom={10} width={100}>
                    <LineCenter>
                        <Layer>
                            <FlexRow>
                                {items.map((_, index) => (
                                    <IndicatorItem key={index} onPress={() => indicatorEvent(index, flatListRef, setRollingState)} selectedState={currentIndex === index} />
                                ))}
                            </FlexRow>
                        </Layer>
                    </LineCenter>
                </AbsoluteView>
                <AbsoluteView bottom={20} right={20}>
                    <TouchableOpacity onPress={(e) => setRollingState(!rollingState)}>
                        <Layer>
                            <AntDesign name={rollingState ? 'pause' : 'caretright'} color={'white'} />
                        </Layer>
                    </TouchableOpacity>
                </AbsoluteView>
                <GestureHandlerRootView
                    onPointerDown={(e) => pointerDownEvent(e, setRollingState, setIsDrag, startOffsetX)}
                    onPointerUp={() => pointerUpEvent(setIsDrag, setRollingState)}
                    onPointerMove={(e) => pointerMoveEvent(e, isDrag, flatListRef, startOffsetX, scrollOffsetX)}>
                    <FlatContainer
                        ref={flatListRef}
                        showsVerticalScrollIndicator={false}
                        onScroll={e => onscroll(e, scrollOffsetX, windowWidth, setCurrentIndex)}
                        getItemLayout={(_, index) => ({
                            length: windowWidth,
                            offset: windowWidth * index,
                            index,
                        })}
                        showsHorizontalScrollIndicator={true}
                        pagingEnabled={true}
                        horizontal={true}
                        data={items}
                        renderItem={({item}: {item: any}) => <BannerItem url={item} windowWidth={windowWidth} />}
                    />
                </GestureHandlerRootView>

            </Container>
        </>

    );
};

export const BannerItem = ({url, windowWidth}: {url: string, windowWidth: number}) => {
    return (
        <ImageContainer windowWidth={windowWidth}>
            <Filter />
            <CenterView>
                <TitleText>Lorem ipsum dolor sit amet.</TitleText>
            </CenterView>
            <ImageItem source={{uri: url}} />
        </ImageContainer>
    );
};

export default Banner
