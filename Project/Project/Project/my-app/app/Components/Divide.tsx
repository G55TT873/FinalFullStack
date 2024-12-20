import React from 'react';
import styles from './component.module.css';
import Image from 'next/image';

const Divide = () => {
    return (
        <div>
            <div className="md:flex w-full flex-col lg:grid grid-cols-2 h-screen text-myDarkGreen font-semibold">
                <div className="md:grid md:h-20 md:place-items-center">
                    {/* Ensure parent container stretches vertically */}
                    <div className="relative w-full h-101 ">
                        <Image 
                            src="/img/tacoImage.jpg" // Points to your image in the `public` folder
                            alt="" 
                            layout="fill" // Makes the image fill its parent container
                            objectFit="cover" // Ensures the image covers the container without distortion
                            className="p-4 rounded-3xl"
                        />
                    </div>
                </div>
                <div className="p-6 md:grid md:h-20">
                    <p className={styles.divideText}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, eaque libero corporis sunt dum a, officia ea facere repudiandae
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Divide;
