"use client";

import React from "react";
import StepSlider from "../components/Slider";

function Home() {
    return (
        <div className="h-screen flex items-center justify-center">

            <StepSlider
                range={{ min: -100, max: 100, step: 5 }}
                showBar
            />

        </div>

    );
}

export default Home;