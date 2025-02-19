"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartProps {
  data?: Array<{
    date: string
    achieved: number
  }>
}

const chartConfig = {
  progress: {
    label: "Daily Progress",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const fillMissingDays = (data: Array<{ date: string; achieved: number }>) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(today.getDate() - 6)
  sevenDaysAgo.setHours(0, 0, 0, 0)

  const filteredData = data.filter(d => {
    const entryDate = new Date(d.date)
    entryDate.setHours(0, 0, 0, 0)
    return entryDate >= sevenDaysAgo && entryDate <= today
  })

  const filledData = Array.from({ length: 7 }, (_, i) => {
    const currentDate = new Date(sevenDaysAgo)
    currentDate.setDate(sevenDaysAgo.getDate() + i)
    return currentDate
  })

  return filledData.map(date => {
    const dateString = date.toISOString().split('T')[0]
    const entry = filteredData.find(d => {
      const entryDate = new Date(d.date)
      entryDate.setHours(0, 0, 0, 0)
      return entryDate.getTime() === date.getTime()
    })
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      progress: entry ? entry.achieved : 0
    }
  })
}

export function Chart({ data = [] }: ChartProps) {
  const formattedData = fillMissingDays(data)

  return (
        <div>
            {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            No data available yet
          </div>
            ) : (
          <ChartContainer config={chartConfig} className=" ">
            <ResponsiveContainer width="1000%" height="100%">
              <BarChart
                data={formattedData}
                margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
              >
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-1))" />
                    <stop offset="100%" stopColor="hsl(var(--chart-2))" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}

                  textAnchor="end"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
                  tick={{ fontSize: 12 }}
                  width={30}
                  domain={[0, 'auto']}
                  allowDecimals={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar 
                  dataKey="progress" 
                  fill="url(#progressGradient)" 
                  radius={[4, 4, 0, 0]}
                  barSize={64}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
        </div>
        
      
  )
}