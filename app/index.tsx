import {View, Text, TouchableOpacity} from 'react-native';
import {useRouter} from "expo-router";

export default () => {
    const router = useRouter();
    return (
        <View className={'items-center justify-center flex-1 gap-y-2'}>
            <Button title={'웹 슬라이드'} event={() => router.push('/web')} />
            <Button title={'비전 1'} event={() => router.push('/vision/old')} />
            <Button title={'비전 2'} event={() => router.push('/vision/new')} />
            <Button title={'onnx'} event={() => router.push('/vision/onnx')} />
        </View>
    )
}


const Button = ({title, event} : {title: string, event: () => void}) => {
    return (
        <TouchableOpacity onPress={event} className={'border border-gray-300 p-5'}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}
