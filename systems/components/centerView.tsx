// Transform, late 불가능으로 구현
import styled from "@emotion/native";
import {FC, useRef, useState} from "react";
import {View, ViewProps} from "react-native";

const CenterContainer = styled.View<{width: number, height: number}> `
    position: absolute;
    left: 50%;
    top: 50%;
    ${({ width, height }) => `
        margin-left: -${width / 2}px;
        margin-top: -${height / 2}px;
    `}
    z-index: 2;
`
export const CenterView: FC<ViewProps> = ({children, ...props}) => {
    const viewRef = useRef<View>(null);
    const [size, setSize] = useState({width: 0, height: 0});
    return (
        <CenterContainer width={size.width} height={size.height} ref={viewRef} {...props} onLayout={e => {
            setSize({width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height})
        }}>
            {children}
        </CenterContainer>
    )
}
