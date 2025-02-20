import {View} from 'react-native';
import {CameraView, PermissionStatus, useCameraPermissions} from "expo-camera";
import {useEffect, useRef} from "react";

export default () => {
    const cameraRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        console.log(permission)
    }, []);

    return (
        <View className={'border w-full h-full'}>
            <CameraView ref={cameraRef} className={''} />
        </View>
    )
}
