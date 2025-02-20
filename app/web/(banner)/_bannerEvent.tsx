import {NativeSyntheticEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {NativeScrollEvent} from "react-native/Libraries/Components/ScrollView/ScrollView";
import React, {SetStateAction} from "react";

export const pointerDownEvent = (e: any, setRollingState: (state: boolean) => void, setIsDrag: (state: boolean) => void, startOffsetX: any) => {
    setRollingState(false);
    setIsDrag(true);
    startOffsetX.current = e.nativeEvent.pageX; // 클릭한 순간 X 좌표
};

export const pointerMoveEvent = (e: any, isDrag: boolean, flatListRef: any, startOffsetX: any, scrollOffsetX: any) => {
    if (isDrag && flatListRef.current) {
        const deltaX = startOffsetX.current - e.nativeEvent.pageX; // 마우스 이동 거리
        const newOffset = scrollOffsetX.current + (deltaX * 2); // 기존 위치 + 이동 거리

        flatListRef.current.scrollToOffset({
            offset: Math.max(0, newOffset), // 음수 방지
            animated: true, // 즉시 이동 (부드러운 반응성)
        });
    }
};

export const pointerUpEvent = (setIsDrag: (state: boolean) => void, setRollingState: (state: boolean) => void) => {
    setIsDrag(false);
    setRollingState(true);
};

export const indicatorEvent = (index: number, flatListRef: any, setRollingState: React.Dispatch<SetStateAction<boolean>>) => {
    setRollingState(false);
    if (flatListRef.current) {
        flatListRef.current.scrollToIndex({index: index, animated: true})
    }
    setTimeout(()=> {
        setRollingState(true);
    }, 500)
}

export const onscroll = (e: NativeSyntheticEvent<NativeScrollEvent>, scrollOffsetX: any, windowWidth: number, setCurrentIndex: React.Dispatch<React.SetStateAction<number>>) => {
    scrollOffsetX.current = e.nativeEvent.contentOffset.x;
    setCurrentIndex(Math.floor(e.nativeEvent.contentOffset.x / windowWidth))
}
