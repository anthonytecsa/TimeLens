// Avatar.js
import React, { useRef, useMemo, useEffect } from "react";
import { useAnimations, useGLTF, useFBX } from "@react-three/drei";
import { Suspense } from "react";
import { Asset } from "./Asset";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";

export const Avatar = ({ urls, ...props }) => {
  const default_character = [
    "https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Head.001.glb",
    "https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Eyes.001.glb",
    "https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Top.001.glb",
    "https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Bottom.002.glb",
    "https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Nose.002.glb",
    "https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Shoes.002.glb",
    "https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Hair.005.glb",
  ];
  const test_urls = urls ? urls : default_character;
  const group = useRef();
  const armature_url =
    "https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Armature.glb";
  const idle_url =
    "https://iwohhqwngzhfdetoybfw.supabase.co/storage/v1/object/public/avatar_customization/Idle.fbx";
  const { animations } = useFBX(idle_url);
  const { actions } = useAnimations(animations, group);
  const { scene } = useGLTF(armature_url);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  useEffect(() => {
    actions["mixamo.com"]?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {test_urls.map((url) => (
            <Suspense key={44}>
              <Asset url={url} skeleton={nodes.Plane.skeleton} />
            </Suspense>
          ))}
          ;
        </group>
      </group>
    </group>
  );
};
