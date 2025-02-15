import React from "react";
import {Banner} from "@/app/(banner)/_banner";
import {TopView} from "@/systems/components/marginVIew";
import {TitleTextB} from "@/app/(banner)/_bannerStyles";

export default function Index() {
    return (
        <>
            <TopView value={10}>
                <TitleTextB>배너</TitleTextB>
                <Banner />
            </TopView>
            <TopView value={10}>
                <TitleTextB>햄버거 메뉴</TitleTextB>
            </TopView>
        </>
    );
}
