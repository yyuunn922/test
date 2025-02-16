import React from "react";
import {Banner} from "@/app/(banner)/_banner";
import {TopView} from "@/systems/components/marginVIew";
import {TitleTextB} from "@/systems/components/common/text/textStyle";
import {HambugerMenu} from "@/app/(hamburgerMenu)/_hamburgerMenu";
import {ScrollView} from "react-native";

export default function Index() {
    return (
        <>
            <ScrollView>
                <TopView value={0}>
                    <TitleTextB>슬라이드 배너</TitleTextB>
                    <Banner />
                </TopView>
                <TopView value={30}>
                    <TitleTextB>햄버거 메뉴</TitleTextB>
                    <HambugerMenu />
                </TopView>
            </ScrollView>
        </>
    );
}
