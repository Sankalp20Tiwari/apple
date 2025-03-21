import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import React, { useEffect, useRef, useState } from 'react'
import ModelView from './ModelView'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { models, sizes } from '../constants'
import { blackImg, yellowImg } from '../utils'
import { animateWithGsapTimeline } from '../constants/animations'

const Model = () => {

    const [size, setSize] = useState('small');

    const [model, setModel] = useState({
        title:  "iPhone 15 Pro in Black Titanium",
        color:["#454749", "#3b3b3b", "#181819"],
        img: blackImg,
    })

    //camera contol for the model view
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    //model
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    //rotation
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    const tl  = gsap.timeline()

    useEffect(()=>{
        if(size === 'large'){
            animateWithGsapTimeline(tl,small,smallRotation, '#view1','#view2',{
                transform: 'translateX(-100%)',
                duration:2
            })
        }
        if(size === 'small'){
            animateWithGsapTimeline(tl,large,largeRotation, '#view2','#view1',{
                transform: 'translateX(0)',
                duration:2
            })
        }
    },[size])


    useGSAP(()=> {
        gsap.to("#heading",{
            opacity:1,
            y:0,
            scrollTrigger:{
                trigger:"#heading"
            }
        })

        gsap.fromTo("#model-title",{
            opacity:0,
        },{
            opacity:1,
            duration:2
        })
    },[])


  return (
    <section className='common-padding'>
        <div className='screen-max-width'>
            <h1 
                id='heading'
                className='section-heading'    
            >
                Take a closer look.
            </h1>

            <div className='flex flex-col items-center mt-5'>
                <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
                    <ModelView 
                        index={1}
                        groupRef = {small}
                        gsapType="view1"
                        controlRef= {cameraControlSmall}
                        setRotationState={setSmallRotation}
                        item={model}
                        size={size}
                    />

                    <ModelView 
                        index={2}
                        groupRef = {large}
                        gsapType="view2"
                        controlRef= {cameraControlLarge}
                        setRotationState={setLargeRotation}
                        item={model}
                        size={size}
                    />
                    <Canvas
                        className='w-full h-full'
                        style={{
                            position:'fixed',
                            top:0,
                            left:0,
                            bottom:0,
                            right:0,
                            overflow: 'hidden'
                        }}
                        eventSource={document.getElementById('root')}
                    >
                        <View.Port />
                    </Canvas>
                </div>
                <div className='mx-auto w-full'>
                        <p id='model-title' className='text-xl font-light text-center mb-5'>
                            {model.title}
                        </p>
                        <div className='flex-center'>
                            <ul className='color-container'>
                                {models.map((item,index)=>(
                                    <li key={index}
                                        className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                                        style={{
                                            backgroundColor: item.color[0]
                                        }}
                                        onClick={()=> setModel(item)}
                                    />
                                ))}
                            </ul>

                            <button className='size-btn-container'>
                                {sizes.map(({label,value})=>(
                                    <span key={label}
                                          className='size-btn cursor-pointer'
                                          style={{
                                            backgroundColor: size === value ? 'white' : 'transparent',
                                            color: size === value ? 'black' : 'white'
                                          }}
                                          onClick={() => setSize(value)}  
                                    >
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Model
