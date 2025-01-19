// Avatar.js
import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { Asset } from './Asset';
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";

export const Avatar = ({ ...props }) => {
  const test_url = 'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Head.001.glb';
  const asset_id = 41;
  const group = useRef();
  const armature_url = 'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Armature.glb';
  
  const { scene } = useGLTF(armature_url);
  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  // useGraph creates two flat object collections for nodes and materials
  const { nodes } = useGraph(clone)
  // console.log(nodes);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <Suspense key={asset_id}>
            <Asset
              // categoryName={'head'}
              url={test_url}
              skeleton={nodes.Plane.skeleton}
            />
          </Suspense>
        </group>
      </group>
    </group>
  );
};
