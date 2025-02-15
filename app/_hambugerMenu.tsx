import {Text} from 'react-native'
import React from "react";
import styled from "@emotion/native";
import {LineCenter} from "@/systems/components/lineCenter";

type Menu = {
    title: string,
    icon: React.ReactNode,
}

const Container = styled.View `
    border: 1px solid red;
`

export const HambugerMenu = () => {
    return (
        <LineCenter>
            <Text></Text>
        </LineCenter>
    )
}
