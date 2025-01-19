import { Canvas } from "@react-three/fiber";
import { Avatar } from '../components/Avatar';

export default function TestPage() {
    return (
        <Canvas
            camera={{ position: [5, 5, 5] }}
        >
            <color attach="background" args={["#f0f0f0"]} />
            <fog attach="fog" args={["#555", 15, 25]} />
            <group position={[0, 0, 0]}>
                <Avatar />
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </group>
        </Canvas>
    );
};
