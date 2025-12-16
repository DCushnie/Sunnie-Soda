// OrbitControlsWithPointerEvents.jsx

import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

// This component wraps the Drei `OrbitControls` and temporarily enables
// pointer events on the Three.js canvas while the user is interacting.
// Why: Because the canvas sits on top of other HTML elements and blocks page
// interactions. We only want pointer events on the canvas while the user
// is actively dragging/using the controls.
export default function OrbitControlsWithPointerEvents(props) {
  // A ref is used to access the controls instance if needed later.
  const controlsRef = useRef();

  // `useThree` gives access to the renderer, scene and camera. We grab
  // the WebGL canvas element so we can change its CSS `pointer-events`.
  const { gl } = useThree();
  const canvas = gl.domElement;

  // Helpful debug: shows which canvas element we're working with.
  // You can remove this console.log when you're comfortable with behavior.
  console.log("Canvas element:", canvas);

  useEffect(() => {
    // Start with pointer events disabled so the page behind the canvas
    // can receive clicks when the user is not interacting with the 3D view.
    canvas.style.pointerEvents = "none";

    // When the user presses down on the canvas, enable pointer events so
    // OrbitControls can receive pointer movements and drags.
    const handleStart = () => {
      canvas.style.pointerEvents = "auto";
      console.log("Pointer events enabled on canvas");
    };

    // When the pointer is released (anywhere on the window), disable
    // pointer events again so other page elements can be interacted with.
    const handleEnd = () => {
      canvas.style.pointerEvents = "none";
      console.log("Pointer events disabled on canvas");
    };

    // Listen for pointerdown on the canvas and pointerup on the window.
    canvas.addEventListener("pointerdown", handleStart);
    window.addEventListener("pointerup", handleEnd);

    // Cleanup listeners when the component unmounts or when `canvas`
    // changes. This prevents memory leaks and duplicate handlers.
    return () => {
      canvas.removeEventListener("pointerdown", handleStart);
      window.removeEventListener("pointerup", handleEnd);
    };
  }, [canvas]); // NOTE: `canvas` comes from `gl.domElement` and is used above.

  // Render the OrbitControls and forward any props. The `ref` is available
  // if you later want to call methods on the controls (e.g., `controlsRef.current.reset()`).
  return <OrbitControls ref={controlsRef} {...props} />;
}


