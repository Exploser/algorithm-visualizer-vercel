'use client'

import { Select } from "@/components/Input/Select";
import { Slider } from "@/components/Input/Slider";
import { useSortingAlgorithmContext } from "@/context/Visualizer";
import { SortingAlgorithmType } from "@/lib/types";
import { generateAnimationArray, sortingAlgorithms } from "@/lib/utils";
import { useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { RxReset } from "react-icons/rx";

export default function Home() {
  const {
    arrayToSort,
    isSorting,
    animationSpeed,
    setAnimationSpeed,
    selectedAlgorithm,
    setSelectedAlgorithm,
    requireReset,
    resetArrayAndAnimation,
    runAnimation,
  } = useSortingAlgorithmContext();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlgorithmType);
  };

  const handlePlay = () => {
    if (requireReset) {
      resetArrayAndAnimation();
      return;
    }

    generateAnimationArray(
      selectedAlgorithm,
      isSorting,
      arrayToSort,
      runAnimation
    );
  };

  useEffect(() => {
    console.log(arrayToSort);
    console.log(isSorting);
    console.log(animationSpeed);
    console.log(selectedAlgorithm);
  });

  return (
    <main className="absolute top-0 h-screen w-screen z-[-2] px-4 py-8 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4"
        >
          <div className="h-[66px] relative flex items-center justify-between w-full">
            <h1 className="text-gray-300 text-4xl font-semibold hidden md:flex">
              Sorting Visulizer
            </h1>
            <div className="flex items-center justify-center gap-4">
              Controls
              <Slider
                isDisabled={isSorting}
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
              />
              <Select
                options={sortingAlgorithms}
                defaultValue={selectedAlgorithm}
                onChange={handleSelectChange}
                isDisabled={isSorting}
              />
              <button
                className="flex items-center justify-center"
                onClick={handlePlay}
              >
                {requireReset ? (
                  <RxReset className="text-gray-400 h-8 w-8" />
                ) : (
                  <FaPlayCircle className="text-system-green60 h-8 w-8" />
                )}
              </button>
            </div>
            <div className="hidden sm:flex absolute top-[120%] left-0 w-full">
              <div className="flex w-full text-gray-400 p-4 rounded border border-system-purple20 bg-system-purple80 bg-opacity-10 gap-6">
                <div className="flex flex-col items-start justify-start w-3/4">
                  <h3 className="text-lg">
                    Algorithm Name
                  </h3>
                  <p className="text-sm text-grey-500 pt-2">
                    Algorithm Description
                  </p>
                </div>

                <div className="flex flex-col items-start justify-start w-1/4 gap-2">
                  <h3 className="text-lg">Time Complexity</h3>
                  <div className="flex flex-col gap-2">
                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Worst Case:</span>
                      <span>
                        Worst Case Time Complexity
                      </span>
                    </p>
                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Average Case:</span>
                      <span>
                        Average Case Time Complexity
                      </span>
                    </p>
                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Best Case:</span>
                      <span>
                        Best Case Time Complexity
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
