import React from "react";
import {Banner} from "@/app/(banner)/_banner";
import {HambugerMenu} from "@/app/_hambugerMenu";
import {TopView} from "@/systems/components/marginVIew";
import {TitleText, TitleTextB} from "@/app/(banner)/_bannerStyles";

export default function Index() {
    return (
        <>
            <TitleTextB>배너</TitleTextB>
            <Banner />
            <TopView value={10}>
                <TitleTextB>햄버거 메뉴</TitleTextB>
                <HambugerMenu />
            </TopView>
        </>
    );
}
