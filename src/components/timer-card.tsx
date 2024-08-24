"use client";

import { useState } from "react";
import CardWrapper from "./card-wrapper";
import TimerForm from "./timer-form";
import { z } from "zod";
import { targetToSingleSchema } from "@/schemas/target-to-single-schema";

type Result = {
  minutes: number;
  seconds: number;
};

const getTargetToSingle = (
  hours: number,
  minutes: number,
  distance: number
): Result => {
  const totalMinutes = hours * 60 + minutes;
  const timePerKm = totalMinutes / distance;
  const min = Math.floor(timePerKm);
  const seconds = Math.round((timePerKm - min) * 60);

  return { minutes: min, seconds };
};

const formatResult = (result: Result) => {
  const seconds = result.seconds < 10 ? `0${result.seconds}` : result.seconds;
  return `${result.minutes}:${seconds}`;
};

export default function TimerCard() {
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (data: z.infer<typeof targetToSingleSchema>) => {
    const result = getTargetToSingle(data.hours, data.minutes, data.distance);
    setResult(result);
  };

  return (
    <CardWrapper
      title="Get your running time"
      description="Convert between target time and timer per km"
    >
      <TimerForm onSubmit={handleSubmit} />
      {result && (
        <div className="mt-4 flex justify-center">
          <div className="text-4xl font-bold text-green-600">
            {formatResult(result)}
          </div>
        </div>
      )}
    </CardWrapper>
  );
}
