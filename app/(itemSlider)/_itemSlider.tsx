import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, PanResponder } from 'react-native';
import styled from '@emotion/native';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum();

type ProductItemType = {
    image: string;
    title: string;
    description: string;
};

// 30개의 랜덤 상품 데이터 생성
const items: ProductItemType[] = Array.from({ length: 30 }, (_, i) => ({
    image: `https://picsum.photos/300/400?random=${i + 1}`,
    title: lorem.generateWords(3),
    description: lorem.generateSentences(1),
}));

const ITEM_WIDTH = 227;
const SCROLL_SPEED = 20;
const AUTO_SCROLL_STEP = 1;

const Container = styled.View`
    align-items: center;
    justify-content: center;
`;

const ScrollContainer = styled(ScrollView)`
    padding: 10px 0;
    width: 100%;
`;

const ItemCard = styled.View`
    width: 250px;
    height: 350px;
    background-color: #fff;
    border-radius: 15px;
    padding: 15px;
    margin-right: 15px;
    align-items: center;
    justify-content: space-between;
    shadow-color: #000;
    shadow-opacity: 0.2;
    shadow-radius: 5px;
    elevation: 5;
`;

const ProductImage = styled.Image`
    width: 100%;
    height: 60%;
    border-radius: 10px;
`;

const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-top: 10px;
    text-align: center;
`;

const Description = styled.Text`
    font-size: 14px;
    color: #666;
    text-align: center;
`;

export const ItemSlider = ({direction = true} : {direction?: boolean}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const lastScrollX = useRef(0); // 현재 스크롤 위치 저장
    const [isDragging, setIsDragging] = useState(false);
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isDragging) {
            autoScrollRef.current = setInterval(() => {
                console.log(lastScrollX.current)
                console.log((items.length - 1) * ITEM_WIDTH)

                lastScrollX.current += direction ? AUTO_SCROLL_STEP : -AUTO_SCROLL_STEP; // 방향에 따라 이동
                scrollViewRef.current?.scrollTo({
                    x: lastScrollX.current,
                    animated: false,
                });

                if (lastScrollX.current >= (items.length - 1) * ITEM_WIDTH) {
                    lastScrollX.current = 0;
                    scrollViewRef.current?.scrollTo({
                        x: 0,
                        animated: false,
                    });
                }

                // **첫 번째 아이템을 지나면 마지막으로 이동**
                if (lastScrollX.current <= 0) {

                    lastScrollX.current = (items.length - 1) * ITEM_WIDTH;
                    scrollViewRef.current?.scrollTo({
                        x: lastScrollX.current,
                        animated: false,
                    });
                }
            }, SCROLL_SPEED);
        }
        return () => {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);
        };
    }, [isDragging, direction]);

    // **🔹 드래그 이벤트 감지**
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                setIsDragging(true);
                if (autoScrollRef.current) clearInterval(autoScrollRef.current);
            },
            onPanResponderMove: (_, gestureState) => {
                const newScrollX = lastScrollX.current - gestureState.dx;
                scrollViewRef.current?.scrollTo({
                    x: newScrollX,
                    animated: false,
                });
            },
            onPanResponderRelease: (_, gestureState) => {
                lastScrollX.current -= gestureState.dx;

                // **🔹 무한 루프 체크**
                if (lastScrollX.current >= (items.length - 1) * ITEM_WIDTH) {
                    lastScrollX.current = 0;
                    scrollViewRef.current?.scrollTo({
                        x: 0,
                        animated: false,
                    });
                }

                if (lastScrollX.current <= 0) {
                    lastScrollX.current = (items.length - 1) * ITEM_WIDTH; // **처음 도달 시 마지막으로 이동**
                    scrollViewRef.current?.scrollTo({
                        x: lastScrollX.current,
                        animated: false,
                    });
                }

                scrollViewRef.current?.scrollTo({
                    x: lastScrollX.current,
                    animated: true,
                });

                setTimeout(() => setIsDragging(false), 1000); // 드래그 후 1초 후 자동 스크롤 재개
            },
        })
    ).current;

    return (
        <Container>
            <ScrollContainer
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                {...panResponder.panHandlers} // **마우스 드래그 가능**
            >
                {items.map((item, index) => (
                    <ItemCard key={index}>
                        <ProductImage source={{ uri: item.image }} />
                        <Title>{item.title}</Title>
                        <Description>{item.description}</Description>
                    </ItemCard>
                ))}
            </ScrollContainer>
        </Container>
    );
};
