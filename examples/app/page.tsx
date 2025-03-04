"use client";

import React, { useState, useEffect } from "react";
import "react-enhanced-slider/dist/index.css";
import { Slider } from "react-enhanced-slider";

function Home() {
    const [value, setValue] = useState(0);
    const [inputValue, setInputValue] = useState("0");
    const [showBar, setShowBar] = useState(true);
    const [min, setMin] = useState(-100);
    const [max, setMax] = useState(100);
    const [step, setStep] = useState(100);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [thumbColor, setThumbColor] = useState("#3b82f6"); // 默认蓝色
    const [barColor, setBarColor] = useState("#3b82f6"); // 默认蓝色

    // 处理输入框变化
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        const numericValue = Number(newValue);
        if (!isNaN(numericValue)) {
            setValue(numericValue);
        }
    };

    // 处理输入框失焦
    const handleInputBlur = () => {
        const numericValue = Number(inputValue);
        if (isNaN(numericValue)) {
            setInputValue(value.toString());
        } else {
            setValue(numericValue);
        }
    };

    // 动态调整范围
    useEffect(() => {
        setValue((prev) => Math.min(Math.max(prev, min), max));
    }, [min, max]);

    // 切换主题
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    return (
        <div
            className={`h-screen flex flex-col items-center justify-center ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
                }`}
        >
            {/* 标题 */}
            <h1 className="text-3xl font-bold mb-8">StepSlider Demo</h1>

            {/* 当前值展示 */}
            <div className="text-lg font-semibold mb-4">
                Current Value: <span className="text-blue-600">{value}</span>
            </div>

            {/* StepSlider 组件 */}
            <Slider
                range={{ min, max, step }}
                value={value}
                onChange={setValue}
                className="mt-5 w-80"
                showBar={showBar}
                thumbColor={thumbColor}
                barColor={barColor}
            />

            {/* 控制面板 */}
            <div
                className={`mt-8 p-6 rounded-lg shadow-md w-96 ${isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
            >

                {/* 动态调整范围 */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Min Value:</label>
                        <input
                            type="number"
                            value={min}
                            onChange={(e) => setMin(Number(e.target.value))}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode
                                ? "bg-gray-700 border-gray-600 focus:ring-blue-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Max Value:</label>
                        <input
                            type="number"
                            value={max}
                            onChange={(e) => setMax(Number(e.target.value))}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode
                                ? "bg-gray-700 border-gray-600 focus:ring-blue-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Step:</label>
                        <input
                            type="number"
                            value={step}
                            onChange={(e) => setStep(Number(e.target.value))}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode
                                ? "bg-gray-700 border-gray-600 focus:ring-blue-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                        />
                    </div>
                </div>

                {/* 颜色选择 */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Thumb Color:</label>
                        <input
                            type="color"
                            value={thumbColor}
                            onChange={(e) => setThumbColor(e.target.value)}
                            className="w-full h-10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Bar Color:</label>
                        <input
                            type="color"
                            value={barColor}
                            onChange={(e) => setBarColor(e.target.value)}
                            className="w-full h-10"
                        />
                    </div>
                </div>

                {/* Toggle 开关 */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium">Show Progress Bar:</span>
                    <button
                        onClick={() => setShowBar(!showBar)}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${showBar ? "bg-blue-500" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${showBar ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>

                {/* 主题切换 */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dark Mode:</span>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isDarkMode ? "bg-blue-500" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isDarkMode ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;