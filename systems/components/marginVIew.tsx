import {FC} from "react";
import {View, ViewProps} from "react-native";
import styled from "@emotion/native";
import values from "ajv/lib/vocabularies/jtd/values";

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
