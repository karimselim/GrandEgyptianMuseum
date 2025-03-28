import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/Tutankhamun.glb");

  return (
    <group {...props} dispose={null} scale={3.6} position={[0, -180, 0]}>
      <mesh
        geometry={nodes.Default_150150150.geometry}
        material={materials["Default 150:150:150"]}
        position={[-122.626, -1.19, 35.504]}
        rotation={[-1.626, 0.008, 0.021]}
      />
      <mesh
        geometry={nodes.tut_mask_back.geometry}
        material={materials["tut mask back"]}
        position={[-122.626, -1.19, 35.504]}
        rotation={[-1.626, 0.008, 0.021]}
      />
      <mesh
        geometry={nodes.tutmask_bearded.geometry}
        material={materials["tutmask bearded"]}
        position={[-122.626, -1.19, 35.504]}
        rotation={[-1.626, 0.008, 0.021]}
      />
      <mesh
        geometry={nodes.tutmask_bigears.geometry}
        material={materials["tutmask bigears"]}
        position={[-122.626, -1.19, 35.504]}
        rotation={[-1.626, 0.008, 0.021]}
      />
      <mesh
        geometry={nodes.tutmask_front_and_side_no_beard.geometry}
        material={materials["tutmask front and side no beard"]}
        position={[-122.626, -1.19, 35.504]}
        rotation={[-1.626, 0.008, 0.021]}
      />
      <mesh
        geometry={nodes.tutmask_front_no_beard_ears_or_snake.geometry}
        material={materials["tutmask front no beard ears or snake"]}
        position={[-122.626, -1.19, 35.504]}
        rotation={[-1.626, 0.008, 0.021]}
      />
    </group>
  );
}

useGLTF.preload("/models/Tutankhamun.glb");
