"use client";

import React, { useEffect, useRef, useState, Suspense, useMemo, useLayoutEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, Html, useProgress, Center, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';
import { OBJLoader } from 'three-stdlib';
import { RotateCw, Grid3X3, Box, Eye, AlertCircle } from 'lucide-react';
import { ModelFile } from '../types';

interface ModelViewerProps {
  modelFile: ModelFile | null;
  materialColor: string;
  onDimensionsCalculated?: (dimensions: { x: number; y: number; z: number }, volume: number) => void;
}

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center bg-white/90 px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm border border-neo-black/10">
        <div className="w-10 h-10 border-3 border-neo-black/10 border-t-neo-yellow rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm text-neo-black/60 font-medium">Loading Model... {progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

// Error Fallback
function ErrorFallback({ error }: { error: Error }) {
  return (
    <Html center>
      <div className="text-center bg-red-50 px-6 py-4 rounded-xl shadow-lg border border-red-100 max-w-xs">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-sm text-red-600 font-medium">Failed to load model</p>
        <p className="text-xs text-red-400 mt-1">{error.message}</p>
      </div>
    </Html>
  );
}

// STL Model Component
function STLModel({ 
  url, 
  color, 
  wireframe, 
  onLoaded 
}: { 
  url: string; 
  color: string; 
  wireframe: boolean;
  onLoaded: (dims: { x: number; y: number; z: number }, volume: number) => void;
}) {
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);

  useLayoutEffect(() => {
    if (geometry) {
      geometry.computeBoundingBox();
      const box = geometry.boundingBox;
      if (box) {
        const size = new THREE.Vector3();
        box.getSize(size);
        
        // Calculate volume using bounding box volume * 0.4 (approximate for typical prints)
        const volume = (size.x * size.y * size.z) / 1000 * 0.4; // cm3 approx
        
        onLoaded({ x: size.x, y: size.y, z: size.z }, volume);
      }
      geometry.center();
    }
  }, [geometry, onLoaded]);

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe}
        roughness={0.3}
        metalness={0.1}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

// OBJ Model Component
function OBJModel({ 
  url, 
  color, 
  wireframe, 
  onLoaded 
}: { 
  url: string; 
  color: string; 
  wireframe: boolean;
  onLoaded: (dims: { x: number; y: number; z: number }, volume: number) => void;
}) {
  const obj = useLoader(OBJLoader, url);
  
  useLayoutEffect(() => {
    if (obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);
      
      // Center the object
      obj.position.sub(center);
      
      const volume = (size.x * size.y * size.z) / 1000 * 0.4;
      onLoaded({ x: size.x, y: size.y, z: size.z }, volume);
    }
  }, [obj, onLoaded]);

  // Apply material to all meshes in the group
  useEffect(() => {
    obj.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: color,
          wireframe: wireframe,
          roughness: 0.3,
          metalness: 0.1,
          envMapIntensity: 0.5
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [obj, color, wireframe]);

  return <primitive object={obj} />;
}

// Fallback Box Model (for unsupported formats or while loading/error)
function FallbackModel({ 
  color, 
  wireframe,
  dimensions = { x: 50, y: 50, z: 50 }
}: { 
  color: string; 
  wireframe: boolean;
  dimensions?: { x: number; y: number; z: number };
}) {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[dimensions.x, dimensions.y, dimensions.z]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe}
        roughness={0.3}
        metalness={0.1}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

// Main Scene Content
function SceneContent({ 
  modelFile, 
  materialColor, 
  viewMode, 
  autoRotate,
  onDimensionsCalculated 
}: {
  modelFile: ModelFile | null;
  materialColor: string;
  viewMode: 'solid' | 'wireframe';
  autoRotate: boolean;
  onDimensionsCalculated?: (dims: { x: number; y: number; z: number }, volume: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [url, setUrl] = useState<string | null>(null);

  // Create object URL
  useEffect(() => {
    if (modelFile?.file) {
      const newUrl = URL.createObjectURL(modelFile.file);
      setUrl(newUrl);
      return () => URL.revokeObjectURL(newUrl);
    } else {
      setUrl(null);
    }
  }, [modelFile?.file]);

  // Auto-rotate
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleLoaded = React.useCallback((dims: { x: number; y: number; z: number }, volume: number) => {
    if (onDimensionsCalculated) {
      onDimensionsCalculated(dims, volume);
    }
  }, [onDimensionsCalculated]);

  if (!modelFile || !url) {
    return (
      <group ref={groupRef}>
        <FallbackModel color={materialColor} wireframe={viewMode === 'wireframe'} />
      </group>
    );
  }

  const ext = modelFile.name.split('.').pop()?.toLowerCase();

  return (
    <group ref={groupRef}>
      <Center>
        {ext === 'stl' ? (
          <STLModel 
            url={url} 
            color={materialColor} 
            wireframe={viewMode === 'wireframe'} 
            onLoaded={handleLoaded} 
          />
        ) : ext === 'obj' ? (
          <OBJModel 
            url={url} 
            color={materialColor} 
            wireframe={viewMode === 'wireframe'} 
            onLoaded={handleLoaded} 
          />
        ) : (
          <FallbackModel 
            color={materialColor} 
            wireframe={viewMode === 'wireframe'} 
            dimensions={{ x: 50, y: 50, z: 50 }} // Default for unsupported
          />
        )}
      </Center>
    </group>
  );
}

// Error Boundary Wrapper
class ErrorBoundaryWrapper extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) return <ErrorFallback error={this.state.error!} />;
    return this.props.children;
  }
}

export default function ModelViewer({ modelFile, materialColor, onDimensionsCalculated }: ModelViewerProps) {
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe'>('solid');
  const [showGrid, setShowGrid] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="w-full h-full bg-neo-white rounded-xl border-2 border-neo-black overflow-hidden relative flex flex-col">
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setViewMode(viewMode === 'solid' ? 'wireframe' : 'solid')}
          className="p-2 bg-white border-2 border-neo-black rounded-lg shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          title="Toggle Wireframe"
        >
          {viewMode === 'solid' ? <Box className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-2 border-2 border-neo-black rounded-lg shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${
            showGrid ? 'bg-neo-yellow' : 'bg-white'
          }`}
          title="Toggle Grid"
        >
          <Grid3X3 className="w-5 h-5" />
        </button>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 border-2 border-neo-black rounded-lg shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${
            autoRotate ? 'bg-neo-yellow' : 'bg-white'
          }`}
          title="Auto Rotate"
        >
          <RotateCw className={`w-5 h-5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 w-full h-full cursor-move">
        <Canvas shadows camera={{ position: [100, 100, 100], fov: 45 }}>
          <Suspense fallback={<Loader />}>
            <ErrorBoundaryWrapper>
              <Stage environment="city" intensity={0.5} adjustCamera={false}>
                <SceneContent 
                  modelFile={modelFile} 
                  materialColor={materialColor} 
                  viewMode={viewMode}
                  autoRotate={autoRotate}
                  onDimensionsCalculated={onDimensionsCalculated}
                />
              </Stage>
              
              {showGrid && <Grid infiniteGrid fadeDistance={200} sectionColor="#000000" cellColor="#aaaaaa" position={[0, -0.1, 0]} />}
              <OrbitControls makeDefault autoRotate={false} />
            </ErrorBoundaryWrapper>
          </Suspense>
        </Canvas>
      </div>

      {/* File Info Overlay */}
      {modelFile && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-4 rounded-xl border-2 border-neo-black shadow-neo-sm max-w-xs">
          <p className="font-bold text-neo-black truncate">{modelFile.name}</p>
          <p className="text-xs text-neo-black/60 mt-1">
            {(modelFile.size / (1024 * 1024)).toFixed(2)} MB • {modelFile.format}
          </p>
        </div>
      )}
    </div>
  );
}
