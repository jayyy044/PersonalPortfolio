import React, { useState, useRef, useEffect } from 'react';
import TooltipCard from './TooltipCard';
import { Text3D } from '@react-three/drei';
import gsap from "gsap";


const Tooltip = ({
    cardScale,
    cardPosition,
    cardRotation,
    tooltipData, 
    tooltipPosition1,
    tooltipRotation1,
    tooltipPosition2,
    tooltipRotation2,
    visible,
    onClick, 
    onHoverChange // Hover change handler
    }) => {
    // Determine the tooltip text based on the first element of the array
    let tooltipText = '';
    if (Array.isArray(tooltipData) && tooltipData.length > 0) {
        switch (tooltipData[0]) {
            case 1:
                tooltipText = 'Skills';
                break;
            case 2:
                tooltipText = 'About';
                break;
            case 3:
                tooltipText = 'Projects';
                break;
            case 4:
                tooltipText = 'Contact';
        }
    }

    // Local hover state
    const [isHovered, setIsHovered] = useState(false);

    const handlePointerOver = () => {
        setIsHovered(true);
        if (onHoverChange) onHoverChange(true);
    };

    const handlePointerOut = () => {
        setIsHovered(false);
        if (onHoverChange) onHoverChange(false);
    };

    const textRef = useRef()
    const text2Ref = useRef()

    useEffect(() => {
        if (textRef.current) {
          gsap.to(textRef.current.material, {
            opacity: visible ? 1 : 0,
            duration: 0.1,
            ease: 'power2.inOut',
          });
        }
      }, [visible]);

    useEffect(() => {
        if (text2Ref.current) {
          gsap.to(text2Ref.current.material, {
            opacity: visible ? 1 : 0,
            duration: 0.1,
            ease: 'power2.inOut',
          });
        }
      }, [visible]);

    return (
        <group
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={onClick}
        >
            <TooltipCard
                scale={cardScale}
                position={cardPosition}
                rotation={cardRotation}
                visible={visible}
                color={isHovered ? 'black' : 'white'} // Change color on hover
            />
            <Text3D
                font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
                size={0.324}
                height={0.045}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                position={tooltipPosition1}
                rotation={tooltipRotation1}
                ref={textRef}
            >
                {tooltipText}
                <meshStandardMaterial                     
                    color="rgb(26, 114, 143)"
                    emissive="rgb(32, 143, 180)"
                    emissiveIntensity={1}
                    transparent={true}
                    opacity={1}
                     />
            </Text3D>
            <Text3D
                font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
                size={0.324}
                height={0.045}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                position={tooltipPosition2}
                rotation={tooltipRotation2}
                ref={text2Ref}
            >
                {tooltipText}
                <meshStandardMaterial
                    color="rgb(26, 114, 143)"
                    emissive="rgb(32, 143, 180)"
                    emissiveIntensity={1}
                    transparent={true}
                    opacity={1}
                />
            </Text3D>
        </group>
    );
};

export default Tooltip;
