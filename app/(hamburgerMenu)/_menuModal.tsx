import {
    Modal,
    Animated,
    useWindowDimensions,
    TouchableWithoutFeedback,
    ScrollView,
    View,
    TouchableOpacity
} from "react-native";
import React, {SetStateAction, useEffect, useRef, useState} from "react";
import {LineCenter} from "@/systems/components/lineCenter";
import {TopView} from "@/systems/components/marginVIew";
import {AntDesign} from '@expo/vector-icons';
import {FlexRow} from "@/app/(banner)/_bannerStyles";
import {ItemCategory, ItemContainer, Logo, MenuContainer, MenuView} from "@/app/(hamburgerMenu)/_hamburgerStyle";

export const MenuModal = ({show, setShow}: {show: boolean; setShow: React.Dispatch<SetStateAction<boolean>>}) => {
    const {width} = useWindowDimensions()
    const slideAnim = useRef(new Animated.Value(-width)).current; // 초기값: 왼쪽 화면 바깥
    const [inShow, setInShow] = useState(false); // 실제 모달 표시 상태

    useEffect(() => {
        if (show) {
            setInShow(true); // 모달 먼저 표시
            setTimeout(() => {
                Animated.timing(slideAnim, {
                    toValue: 0, // 화면 안으로 이동
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }, 200)
        } else {
            Animated.timing(slideAnim, {
                toValue: -width, // 다시 왼쪽으로 이동
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setInShow(false); // 애니메이션 완료 후 모달 닫기
            });
        }
    }, [show]);

    return (
        <Modal visible={inShow} transparent={true} animationType="slide">
            <MenuView activeOpacity={1} onPress={() => setShow(false)}>
                <TouchableWithoutFeedback>
                    <MenuContainer style={{ transform: [{ translateX: slideAnim }] }}>
                        <TopView value={10} />
                        <LineCenter>
                            <Logo
                                source={{ uri: "https://pds.saramin.co.kr/company/logo/202209/29/riyb05_dhbv-1coices_logo.png" }}
                                resizeMode="contain"
                            />
                        </LineCenter>
                        <TopView value={30} />
                        <ScrollView>
                            <MenuItem title={'여성'} items={['의류', '아우터', '블라우스', '원피스', '베스트', '니트']} />
                            <MenuItem title={'남성'} items={['의류', '아우터', '블라우스', '원피스', '베스트', '니트']} />
                            <MenuItem title={'뷰티'} items={[]} />
                            <MenuItem title={'라이프'} items={[]} />
                            <MenuItem title={'키즈'} items={['의류', '아우터', '블라우스', '원피스', '베스트', '니트']} />
                        </ScrollView>
                    </MenuContainer>
                </TouchableWithoutFeedback>
            </MenuView>
        </Modal>
    );
};


const MenuItem = ({title, items}:{title: string, items: string[]}) => {
    const [open, setOpen] = useState(false);
    return (
        <ItemContainer>
            <ItemCategory activeOpacity={1} onPress={() => setOpen(!open)}>
                <FlexRow>
                    <AntDesign style={{marginRight:10}} name={'folder1'} size={24} />
                    {title}
                    <View style={{flex:1}} />
                    {items.length !== 0 && (
                        <AntDesign name={open ? 'minus' : 'plus'} size={24} />
                    )}
                </FlexRow>
                {open && items.length !==0 && (
                    <>
                        <TopView value={10} />
                        {items.map(item => (
                            <TouchableWithoutFeedback>
                                <TouchableOpacity onPress={() => console.log(item)}>
                                    <FlexRow>
                                        <AntDesign style={{marginRight:10}} name={'file1'} size={15} />
                                        {item}
                                    </FlexRow>
                                    <TopView value={10} />
                                </TouchableOpacity>
                            </TouchableWithoutFeedback>
                        ))}
                    </>
                )}
            </ItemCategory>
        </ItemContainer>
    )
}
