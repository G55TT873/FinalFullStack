import React from "react";
import SmoothParallaxSection from "./components/SmoothParallaxSectio";
import Hero from "./components/Hero";
import Section1 from "./components/Section1";

export default function Home() {
  return (
    <main>
      {/* First section with hero inside description */}
      <SmoothParallaxSection
        title=""
        description=""
        bgImage="/img/background1.jpg"
      >
        {/* Pass Hero inside the description area */}
        <Hero 
          image="/img/Taco First.jpg"
          title="TacoLecious"
          description="Provident cupiditate voluptatem et in. Quaerat f."
          buttonText="Get Started"
        />
      </SmoothParallaxSection>
      <Section1/>
      
      <SmoothParallaxSection
        title=""
        description=""
        bgImage="/img/background3.png"
      />
    </main>
  );
}
