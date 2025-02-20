import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import {FilesetResolver, FaceLandmarker, HandLandmarker, DrawingUtils, PoseLandmarker} from "@mediapipe/tasks-vision";

export default () => {
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
    const handLandmarkerRef = useRef<HandLandmarker | null>(null);
    const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    function drawLandmarks(faceResults: any, handResults: any, poseResults: any) {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvasRef.current.width, 0);

        const drawingUtils = new DrawingUtils(ctx);

        if (faceResults.faceLandmarks) {
            faceResults.faceLandmarks.forEach((landmarks: any) => {
                drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "#FF0000", lineWidth: 1 });
                drawingUtils.drawLandmarks(landmarks, { color: "#00FF00", radius: 0.1 });
            });
        }

        if (handResults.landmarks) {
            handResults.landmarks.forEach((landmarks: any) => {
                drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, { color: "#0000FF", lineWidth: 1 });
                drawingUtils.drawLandmarks(landmarks, { color: "#FFFF00", radius: 0.1 });
            });
        }

        if (poseResults && poseResults.poseLandmarks && poseResults.poseLandmarks.length > 0) {
            console.log("Pose Landmarks:", poseResults.poseLandmarks);
            poseResults.poseLandmarks.forEach((landmarks: any) => {
                drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, { color: "#00FF00", lineWidth: 2 });
                drawingUtils.drawLandmarks(landmarks, { color: "#FF00FF", radius: 3 });
            });
        } else {
            console.warn("No Pose Landmarks detected.");
        }

        ctx.restore();
    }

    useEffect(() => {
        FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
        ).then(data => {
            Promise.all([
                FaceLandmarker.createFromOptions(data, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
                    },
                    runningMode: "VIDEO",
                    numFaces: 1
                }),
                HandLandmarker.createFromOptions(data, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task"
                    },
                    numHands: 2
                }),
                PoseLandmarker.createFromOptions(data, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task"
                    },
                    runningMode: "VIDEO",
                    numPoses: 1
                })
            ]).then(([faceLandmarker, handLandmarker, poseLandmarker]) => {
                faceLandmarkerRef.current = faceLandmarker;
                handLandmarkerRef.current = handLandmarker;
                poseLandmarkerRef.current = poseLandmarker;
                setIsLoaded(true);
            });
        });

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isLoaded) {
            intervalRef.current = setInterval(async () => {
                if (cameraRef.current && faceLandmarkerRef.current && handLandmarkerRef.current && poseLandmarkerRef.current) {
                    cameraRef.current.takePictureAsync({ base64: true }).then(picture => {
                        fetch(picture!.uri).then(p => {
                            p.blob().then(b => {
                                createImageBitmap(b).then(imageBitmap => {
                                    const timestamp = performance.now();
                                    const poseResults = poseLandmarkerRef.current!.detectForVideo(imageBitmap, timestamp);
                                    const faceResults = faceLandmarkerRef.current!.detectForVideo(imageBitmap, timestamp);
                                    const handResults = handLandmarkerRef.current!.detect(imageBitmap);

                                    drawLandmarks(faceResults, handResults, poseResults);
                                });
                            });
                        });
                    });
                }
            }, 100);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isLoaded]);

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} facing={facing} style={styles.camera} />
            <canvas ref={canvasRef} width={640} height={480} style={styles.canvas} />
        </View>
    );
};

const styles = StyleSheet.create({
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
