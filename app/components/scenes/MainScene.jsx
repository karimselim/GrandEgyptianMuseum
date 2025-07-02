import React, { useState, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { Model } from "../models/Tutankhamun";
import { useProgress } from "@react-three/drei";

// Linear interpolation
const lerp = (a, b, t) => a + (b - a) * t;

const HoverControls = ({
  minPolarAngle,
  maxPolarAngle,
  minAzimuthAngle,
  maxAzimuthAngle,
  radius = 700,
  damping = 0.1,
}) => {
  const { camera, gl } = useThree();
  const [desiredAngles, setDesiredAngles] = useState({
    polar: (minPolarAngle + maxPolarAngle) / 2,
    azimuth: (minAzimuthAngle + maxAzimuthAngle) / 2,
  });
  const currentAngles = useRef({ ...desiredAngles });
  const isHovered = useRef(false);
  let lastMove = 0;

  const onPointerMove = (event) => {
    const now = performance.now();
    if (now - lastMove < 50) return;
    lastMove = now;

    if (!isHovered.current) return;

    const { clientX, clientY } = event;
    const rect = gl.domElement.getBoundingClientRect();
    const xRel = (clientX - rect.left) / rect.width;
    const yRel = (clientY - rect.top) / rect.height;

    const azimuth =
      minAzimuthAngle + xRel * (maxAzimuthAngle - minAzimuthAngle);
    const polar = maxPolarAngle - yRel * (maxPolarAngle - minPolarAngle);

    setDesiredAngles({ polar, azimuth });
  };

  useEffect(() => {
    const domElement = gl.domElement;
    const handlePointerEnter = () => (isHovered.current = true);
    const handlePointerLeave = () => (isHovered.current = false);

    domElement.addEventListener("pointerenter", handlePointerEnter);
    domElement.addEventListener("pointerleave", handlePointerLeave);
    domElement.addEventListener("pointermove", onPointerMove);

    return () => {
      domElement.removeEventListener("pointerenter", handlePointerEnter);
      domElement.removeEventListener("pointerleave", handlePointerLeave);
      domElement.removeEventListener("pointermove", onPointerMove);
    };
  }, [gl, minAzimuthAngle, maxAzimuthAngle, minPolarAngle, maxPolarAngle]);

  useFrame(() => {
    currentAngles.current.polar = lerp(
      currentAngles.current.polar,
      desiredAngles.polar,
      damping
    );
    currentAngles.current.azimuth = lerp(
      currentAngles.current.azimuth,
      desiredAngles.azimuth,
      damping
    );

    const { polar, azimuth } = currentAngles.current;

    camera.position.x = radius * Math.sin(polar) * Math.sin(azimuth);
    camera.position.y = radius * Math.cos(polar);
    camera.position.z = radius * Math.sin(polar) * Math.cos(azimuth);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// ✅ Accept props: disableInteraction and modelScale
const Scene = ({ disableInteraction = false, modelScale = 3 }) => {
  const progress = useProgress();

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 250, 700], fov: 45 }}>
      <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
        <ambientLight intensity={4} />
        <directionalLight position={[5, 10, 5]} intensity={8} castShadow />

        {/* ❌ Disable hover on mobile for performance */}
        {!disableInteraction && (
          <HoverControls
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.5}
            minAzimuthAngle={-Math.PI / 12}
            maxAzimuthAngle={Math.PI / 12}
            radius={700}
            damping={0.1}
          />
        )}

        <Model scale={modelScale} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
