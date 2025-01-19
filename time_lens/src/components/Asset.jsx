import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

export const Asset = ({ url, skeleton, categoryName }) => {
    const { scene } = useGLTF(url);
    const attachedItems = useMemo(() => {
        const items = []
        scene.traverse((child) => {
            if (child.isMesh) {
                console.log(child)
                items.push({
                    geometry: child.geometry,
                    material: child.material,
                    name: child.name,
                    morphTargetDictionary: child.morphTargetDictionary,
                    morphTargetInfluences: child.morphTargetInfluences,
                });
            }
        });
        return items;
    }, [scene]);

    return attachedItems.map((item, index) => (
        <skinnedMesh
            key={index}
            geometry={item.geometry} // this line? gpt said smt
            material={item.material}
            skeleton={skeleton}
            morphTargetDictionary={item.morphTargetDictionary}
            morphTargetInfluences={item.morphTargetInfluences}
            castShadow
            receiveShadow
        />
    ));
}