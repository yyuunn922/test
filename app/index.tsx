import React from "react";
import {Banner} from "@/app/(banner)/_banner";
import {TopView} from "@/systems/components/marginVIew";
import {HambugerMenu} from "@/app/(hamburgerMenu)/_hamburgerMenu";
import {ScrollView} from "react-native";
import {ItemSlider} from "@/app/(itemSlider)/_itemSlider";
import {Divider} from "@/systems/components/common/divider";

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
                    <ItemSlider direction={false} />
                </TopView>
            </ScrollView>
        </>
    );
}
