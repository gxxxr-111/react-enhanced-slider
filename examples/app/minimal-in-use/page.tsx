"use client";

import React, { useState } from "react";
import { Slider } from "../../../src/components";

function Home() {

    const [value, setValue] = useState(0);

    return (
        <div className="h-screen flex flex-col items-center justify-center">

            <div>Value: {value}</div>

            <Slider
                range={{ min: -100, max: 100, step: 100 }}
                value={value}
                onChange={setValue}
                className="mt-5"
                showBar
            />

        </div>

    );
}

export default Home;