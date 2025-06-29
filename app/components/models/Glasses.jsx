import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export function Glasses(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/models/glasses.glb");

  return (
    <group
      ref={groupRef}
      {...props}
      dispose={null}
      position={[0, -300, 0]}
      scale={2.5}
    >
      <mesh
        geometry={nodes.defaultMaterial.geometry}
        material={materials["VR_Glas.display"]}
      />
      <mesh
        geometry={nodes.defaultMaterial_1.geometry}
        material={materials.VR_Glas}
      />
      <mesh
        geometry={nodes.defaultMaterial_2.geometry}
        material={materials["VR_Glas.front"]}
      />
      <mesh
        geometry={nodes.defaultMaterial_3.geometry}
        material={materials.GlowInTheDark}
      />
    </group>
  );
}

useGLTF.preload("/models/glasses.glb");
