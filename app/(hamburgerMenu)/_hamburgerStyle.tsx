import styled from "@emotion/native";
import {Animated} from "react-native";

export const Container = styled.View<{width: number}> `
    width: ${({ width }) => (width === 0 ? '100%' : `${width}px`)};
    border: ${({ width }) => (width !== 0 && `1px solid #ddd`)};
    box-shadow: 1px 1px 1px #ddd;
    padding: 4px 20px;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const Logo = styled.Image `
    width: 100px;
    aspect-ratio: 16/9;
`

export const FlexRow = styled.View `
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`

export const MaxWidthLayout = styled.View `
    display: flex;
    align-items: center;
`

// 카테고리

export const MenuView = styled.TouchableOpacity`
    background-color: #00000080;
    width: 100%;
    height: 100%;
    position: absolute;
`;

export const MenuContainer = styled(Animated.View)`
    position: absolute;
    left: 0;
    width: 300px;  /* 너비 조정 */
    height: 100%;
    background-color: white;
`;

// 카테고리 아이템

export const ItemContainer = styled.View `
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
`

export const ItemCategory = styled.TouchableOpacity `
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 10px;
`
