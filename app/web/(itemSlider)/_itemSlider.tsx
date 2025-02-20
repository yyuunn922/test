import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { LoremIpsum } from 'lorem-ipsum';
import {
    Container,
    Description,
    ItemCard,
    ProductImage,
    ScrollContainer,
    Title
} from "@/app/web/(itemSlider)/_itemSliderStyle";

const lorem = new LoremIpsum();

type ProductItemType = {
    image: string;
    title: string;
    description: string;
};

// 30개의 랜덤 상품 데이터 생성
const items: ProductItemType[] = Array.from({ length: 300 }, (_, i) => ({
    image: `https://picsum.photos/300/400?random=${i + 1}`,
    title: lorem.generateWords(3),
    description: lorem.generateSentences(1),
}));

const scrollSpeed = 20;
const step = 1;

export const ItemSlider = ({ direction = true }: { direction?: boolean }) => {
    const { width } = useWindowDimensions();
    const scrollViewRef = useRef<ScrollView>(null);
    const lastScrollX = useRef(0); // 현재 스크롤 위치 저장
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [itemWidth, setItemWidth] = useState(width > 2200 ? 350 : width > 600 ? 250 : 150);

    const startAutoScroll = () => {
        if (autoScrollRef.current) clearInterval(autoScrollRef.current);

        autoScrollRef.current = setInterval(() => {
            lastScrollX.current += direction ? step : -step;
            scrollViewRef.current?.scrollTo({
                x: lastScrollX.current,
                animated: false,
            });

            if (lastScrollX.current <= 0) {
                lastScrollX.current = (items.length - 1) * itemWidth;
                scrollViewRef.current?.scrollTo({
                    x: lastScrollX.current,
                    animated: false,
                });
            }
        }, scrollSpeed);
    };

    const stopAutoScroll = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
            autoScrollRef.current = null;
        }
    };

    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, [direction]);

    useEffect(() => {
        stopAutoScroll();
        setIsResizing(true);

        if (resizeTimeoutRef.current) {
            clearTimeout(resizeTimeoutRef.current);
        }

        resizeTimeoutRef.current = setTimeout(() => {
            setItemWidth(width);
            setIsResizing(false);
            startAutoScroll();
        }, 500);

        return () => {
            if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
        };
    }, [width]);

    return (
        <Container>
            <ScrollContainer ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false}>
                {items.map((item, index) => (
                    <ItemCard width={width} key={index}>
                        <ProductImage source={{ uri: item.image }} />
                        <Title>{item.title}</Title>
                        <Description>{item.description}</Description>
                    </ItemCard>
                ))}
            </ScrollContainer>
        </Container>
    );
};
