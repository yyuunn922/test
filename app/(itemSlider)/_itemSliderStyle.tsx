import styled from "@emotion/native";
import {ScrollView} from "react-native";

export const Container = styled.View`
    align-items: center;
    justify-content: center;
`;

export const ScrollContainer = styled(ScrollView)`
    padding: 10px 0;
    width: 100%;
`;

export const ItemCard = styled.View<{ width: number }>`
    width: ${({ width }) => (width > 2200 ? '350px' : width > 600 ? '250px' : '150px')};
    aspect-ratio: 1/1.5;
    background-color: #fff;
    border-radius: 15px;
    padding: 15px;
    margin-right: 15px;
    align-items: center;
    justify-content: space-between;
    shadow-color: #000;
    shadow-opacity: 0.2;
    shadow-radius: 5px;
    overflow: hidden;
`;

export const ProductImage = styled.Image`
    width: 100%;
    height: 60%;
    border-radius: 10px;
`;

export const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-top: 10px;
    text-align: center;
`;

export const Description = styled.Text`
    font-size: 14px;
    color: #666;
    text-align: center;
`;
