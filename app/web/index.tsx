import React from "react";
import Banner from "@/app/web/(banner)/_banner";
import {TopView} from "@/systems/components/marginVIew";
import {HambugerMenu} from "@/app/web/(hamburgerMenu)/_hamburgerMenu";
import {ScrollView} from "react-native";
import {ItemSlider} from "@/app/web/(itemSlider)/_itemSlider";

export default function Index() {
    return (
        <>
            <ScrollView>
                <Banner />
                <TopView value={20}>
                    <HambugerMenu />
                </TopView>
                <TopView value={10}>
                    <ItemSlider />
                    <ItemSlider direction={false} />
                    <ItemSlider />
                </TopView>
            </ScrollView>
        </>
    );
}
