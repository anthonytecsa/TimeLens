// Avatar.js
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { Asset } from './Asset';

export const Avatar = ({ ...props }) => {
  const test_url = 'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Head.001.glb';
  const asset_id = 41;
  const group = useRef();
  const armature_url = 'https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Armature.glb';
  const { nodes } = useGLTF(armature_url);
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
