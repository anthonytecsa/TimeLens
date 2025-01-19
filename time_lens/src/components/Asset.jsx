import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";

export const Asset = ({ url, skeleton }) => {
  const { scene } = useGLTF(url);
  const attachedItems = useMemo(() => {
    const items = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        const meshClone = child.clone();
        meshClone.material = child.material.clone();
        if (meshClone.material?.name.includes("Color_")) {
          meshClone.material.color.set("#4f2703");
        }
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
};
