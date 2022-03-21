import React, { useRef, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { VideoTexture, UniformsUtils } from "three/src/Three";

import "./styles.css";
import { MinimumShader } from "./resources";

const url =
  "https://pmdvod.nationalgeographic.com/NG_Video/596/311/1370718787631_1542234923394_1370715715931_mp4_video_1024x576_1632000_primary_audio_eng_3.mp4";

const Texture = ({ texture }) => {
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[16, 9]} />
      <shaderMaterial
        attach="material"
        transparent
        args={[
          {
            ...MinimumShader,
            uniforms: UniformsUtils.clone(MinimumShader.uniforms)
          }
        ]}
        uniforms-texture-value={texture}
      />
    </mesh>
  );
};
const Video = ({ video }) => {
  const front = new VideoTexture(video.current);
  return <Texture texture={front} />;
};

export default function App() {
  const videoRef = useRef(null);
  useEffect(() => {
    videoRef.current.play();
  }, [videoRef]);
  return (
    <div className="App">
      <video
        ref={videoRef}
        autoPlay={true}
        muted={true}
        loop={true}
        crossOrigin="anonymous"
        src={url}
        style={{
          position: "absolute",
          top: "-100%",
          left: "-100%",
          width: "640px",
          height: "360px"
        }}
      />
      <Canvas>
        <Video video={videoRef} />
      </Canvas>
    </div>
  );
}
