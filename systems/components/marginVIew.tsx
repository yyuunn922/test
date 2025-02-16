import {FC} from "react";
import {ViewProps} from "react-native";
import styled from "@emotion/native";

const Container = styled.View<{value: number}> `
    margin-top: ${({ value }) => `${value}px`};
`

export const TopView: FC<ViewProps & {value: number}> = ({children, value, ...props}) => {
    return (
        <Container value={value} {...props}>
            {children}
        </Container>
    )
}
