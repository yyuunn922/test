import styled from '@emotion/native';
import {AntDesign, Feather} from '@expo/vector-icons'
import {Modal, TouchableOpacity, useWindowDimensions} from "react-native";
import React, {useState} from "react";
import {Text} from 'react-native';
import {MenuModal} from "@/app/(hamburgerMenu)/_menuModal";
import slugify from "slugify";

const MaxWidthLayout = styled.View `
    display: flex;
    align-items: center;
`

const Container = styled.View<{width: number}> `
    width: ${({ width }) => (width === 0 ? '100%' : `${width}px`)};
    border: 1px solid #ddd;
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

const FlexRow = styled.View `
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`

export const HambugerMenu = () => {
    const {width} = useWindowDimensions();
    const [menuShow, setMenuShow] = useState(true);
    return (
        <>
            <MenuModal show={menuShow} setShow={setMenuShow}/>
            <MaxWidthLayout>
                <Container width={width > 900 ? 1100 : 0}>
                    <Logo
                        source={{ uri: "https://pds.saramin.co.kr/company/logo/202209/29/riyb05_dhbv-1coices_logo.png" }}
                        resizeMode="contain"
                    />
                    <FlexRow>
                        <TouchableOpacity onPress={() => setMenuShow(!menuShow)}>
                            <AntDesign name={menuShow ? 'close' : 'bars'} size={34} />
                        </TouchableOpacity>
                    </FlexRow>
                </Container>
            </MaxWidthLayout>
        </>
    )
}
