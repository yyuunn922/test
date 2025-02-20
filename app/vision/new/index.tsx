import { useEffect, useRef, useState } from "react";
import {View, StyleSheet, ImageBackground} from "react-native";
import { CameraView } from "expo-camera";
import {
    FilesetResolver,
    PoseLandmarker,
    DrawingUtils,
    HandLandmarker,
    FaceLandmarker
} from "@mediapipe/tasks-vision";

export default () => {
    const cameraRef = useRef<CameraView | null>(null);
    const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
    const handLandmarkerRef = useRef<HandLandmarker | null>(null);
    const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [loading, setLoading] = useState(false);
    const animationRef = useRef<number | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false); // ✅ 카메라 준비 상태 추가

    function drawLandmarks(poseResults: any, handResults: any, faceResults: any) {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvasRef.current.width, 0);

        const drawingUtils = new DrawingUtils(ctx);

        // ✅ 얼굴 랜드마크 그리기
        if (faceResults?.faceLandmarks) {
            faceResults.faceLandmarks.forEach((landmarks: any) => {
                drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "white", lineWidth: 0.5 });
                drawingUtils.drawLandmarks(landmarks, { color: "#ddd", radius: 0.1 });
            });
        }

        // ✅ 손 랜드마크 그리기
        if (handResults?.landmarks) {
            handResults.landmarks.forEach((landmarks: any) => {
                drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, { color: "blue", lineWidth: 2 });
                drawingUtils.drawLandmarks(landmarks, { color: "red", radius: 2 });
            });
        }

        // ✅ 포즈 랜드마크 그리기
        if (poseResults?.landmarks) {
            poseResults.landmarks.forEach((landmarks: any) => {
                drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, { color: "#00FF00", lineWidth: 0.5 });
                drawingUtils.drawLandmarks(landmarks, { color: "red", radius: 2 });
            });
        }

        ctx.restore();
    }

    let runningMode: "IMAGE" | "VIDEO" = "VIDEO";

    // ✅ Mediapipe Face, Hand, Pose 모델 로드
    useEffect(() => {
        async function loadModel() {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );

            poseLandmarkerRef.current = await PoseLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task`,
                    delegate: "GPU"
                },
                runningMode: 'VIDEO',
                numPoses: 1
            });

            handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: "GPU"
                },
                runningMode: 'VIDEO',
                numHands: 2
            });

            faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                    delegate: "GPU"
                },
                outputFaceBlendshapes: true,
                runningMode,
                numFaces: 1
            });

            setLoading(true);
        }

        loadModel();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // ✅ 실시간 감지 (카메라가 준비되면 실행)
    async function processFrame() {
        if (!isCameraReady || !cameraRef.current || !poseLandmarkerRef.current || !handLandmarkerRef.current || !faceLandmarkerRef.current) return;

        const photo = await cameraRef.current.takePictureAsync({ base64: false });
        if (!photo?.uri) return; // ✅ 사진이 정상적으로 캡처되었는지 확인

        const response = await fetch(photo.uri);
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);

        const timestamp = performance.now();
        const poseResults = poseLandmarkerRef.current.detectForVideo(imageBitmap, timestamp);
        const handResults = handLandmarkerRef.current.detectForVideo(imageBitmap, timestamp);
        const faceResults = faceLandmarkerRef.current.detectForVideo(imageBitmap, timestamp);

        drawLandmarks(poseResults, handResults, faceResults);
        animationRef.current = requestAnimationFrame(processFrame);
    }

    useEffect(() => {
        if (loading && isCameraReady) { // ✅ 카메라가 준비된 후 실행
            setTimeout(() => { // ✅ 500ms 대기 후 실행
                animationRef.current = requestAnimationFrame(processFrame);
            }, 500);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [loading, isCameraReady]); // ✅ 카메라 준비 상태 추가

    return (
        <ImageBackground
            // source={require("@/assets/images/rooms/room.jpg")} // ✅ 배경 이미지 경로
            style={styles.background}
            resizeMode="cover" // ✅
        >
            <View style={styles.container}>
                <CameraView
                    ref={cameraRef}
                    facing="front"
                    style={styles.camera}
                    onCameraReady={() => setIsCameraReady(true)} // ✅ 카메라 준비 완료 체크
                />
                <canvas ref={canvasRef} width={640} height={480} style={styles.canvas} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1, // ✅ 화면을 가득 채우도록 설정
        width: "100%", // ✅ 배경 이미지가 전체 화면을 덮도록 설정
        height: "100%",
        backgroundColor:'black'
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    camera: {
        width: "100%",
        height: "100%",
        position: "absolute",
        opacity: 0,
    },
    canvas: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
    },
});
