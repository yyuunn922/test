import {TextProps, useWindowDimensions} from "react-native";
import {TitleTextBase} from "@/systems/components/common/text/textStyle";
import {FC} from "react";

export const TitleText: FC<TextProps> = ({children}) => {
    const { width } = useWindowDimensions();
    const fontSize = width > 600 ? 33 : 24; // 화면 너비에 따른 동적 폰트 크기

    return <TitleTextBase fontSize={fontSize}>{children}</TitleTextBase>;
};
