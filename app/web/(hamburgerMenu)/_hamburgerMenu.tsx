import {AntDesign} from '@expo/vector-icons'
import {TouchableOpacity, useWindowDimensions} from "react-native";
import React, {useState} from "react";
import {MenuModal} from "@/app/web/(hamburgerMenu)/_menuModal";
import {FlexRow, Logo, MaxWidthLayout, Container} from "@/app/web/(hamburgerMenu)/_hamburgerStyle";

export const HambugerMenu = () => {
    const {width} = useWindowDimensions();
    const [menuShow, setMenuShow] = useState(false);
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
