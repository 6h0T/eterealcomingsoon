"use client"

import { useState, useEffect } from "react"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

type CountdownLabels = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

export default function CountdownTimer({
  targetDate,
  labels,
}: {
  targetDate: string
  labels: CountdownLabels
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-4 text-center">
        <TimeUnit value={timeLeft.days} label={labels.days} />
        <TimeUnit value={timeLeft.hours} label={labels.hours} />
        <TimeUnit value={timeLeft.minutes} label={labels.minutes} />
        <TimeUnit value={timeLeft.seconds} label={labels.seconds} />
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-bunker-800/70 backdrop-blur-sm border-2 border-gold-500 rounded-lg p-3 w-full h-24 flex items-center justify-center">
        <div className="font-trade-winds text-2xl md:text-3xl font-bold text-gold-400">
          {value.toString().padStart(2, "0")}
        </div>
      </div>
      <div className="mt-2 text-bunker-100 text-sm">{label}</div>
    </div>
  )
}
