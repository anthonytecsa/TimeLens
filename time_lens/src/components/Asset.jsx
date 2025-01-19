import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

export const Asset = ({ url, skeleton, categoryName }) => {
    const { scene } = useGLTF(url);
    const attachedItems = useMemo(() => {
        const items = []
        scene.traverse((child) => {
            if (child.isMesh) {
                const meshClone = child.clone();
                meshClone.material = child.material.clone();
                items.push({
                    geometry: meshClone.geometry,
                    material: meshClone.material,
                    name: meshClone.name,
                    morphTargetDictionary: meshClone.morphTargetDictionary,
                    morphTargetInfluences: meshClone.morphTargetInfluences,
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