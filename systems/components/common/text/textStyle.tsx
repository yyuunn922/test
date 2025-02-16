import styled from "@emotion/native";
import {useWindowDimensions} from "react-native";

export const TitleTextBase = styled.Text<{ fontSize: number }>`
    color: white;
    font-size: ${({ fontSize }) => `${fontSize}px`};
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
