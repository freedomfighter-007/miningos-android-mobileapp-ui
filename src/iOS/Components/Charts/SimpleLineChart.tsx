/**
 * iOS Simple Line Chart Component
 * Lightweight chart component for iOS app
 */

import React, { useMemo } from 'react'
import styled from 'styled-components'

import { iOS_COLOR } from '../../Theme/iOSColors'

interface DataPoint {
  value: number
  label?: string
}

interface SimpleLineChartProps {
  data: DataPoint[]
  height?: number
  showArea?: boolean
  color?: string
  areaColor?: string
  showGrid?: boolean
  showLabels?: boolean
  animate?: boolean
}

const ChartContainer = styled.div<{ $height: number }>`
  width: 100%;
  height: ${(props) => props.$height}px;
  position: relative;
`

const SVGContainer = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`

const GridLine = styled.line`
  stroke: ${iOS_COLOR.CHART_GRID};
  stroke-width: 0.5;
  stroke-dasharray: 4, 4;
`

const ChartPath = styled.path<{ $animate: boolean }>`
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;

  ${(props) =>
    props.$animate &&
    `
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 1.5s ease-out forwards;

    @keyframes draw {
      to {
        stroke-dashoffset: 0;
      }
    }
  `}
`

const AreaPath = styled.path<{ $animate: boolean }>`
  ${(props) =>
    props.$animate &&
    `
    opacity: 0;
    animation: fadeIn 0.5s ease-out 0.5s forwards;

    @keyframes fadeIn {
      to {
        opacity: 1;
      }
    }
  `}
`

const LabelText = styled.text`
  font-size: 10px;
  fill: ${iOS_COLOR.LABEL_TERTIARY};
  text-anchor: middle;
`

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data,
  height = 150,
  showArea = true,
  color = iOS_COLOR.CHART_LINE_PRIMARY,
  areaColor,
  showGrid = true,
  showLabels = false,
  animate = true,
}) => {
  const padding = { top: 10, right: 10, bottom: showLabels ? 20 : 10, left: 10 }

  const chartDimensions = useMemo(() => {
    const chartHeight = height - padding.top - padding.bottom
    return { chartHeight }
  }, [height, padding])

  const { pathD, areaD, points } = useMemo(() => {
    if (data.length === 0) return { pathD: '', areaD: '', points: [] }

    const values = data.map((d) => d.value)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const range = maxValue - minValue || 1

    const pointsArray = data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1 || 1)) * (100 - padding.left - padding.right)
      const y =
        padding.top +
        (1 - (d.value - minValue) / range) * chartDimensions.chartHeight
      return { x: `${x}%`, y, value: d.value, label: d.label }
    })

    // Generate smooth curve path using Catmull-Rom spline
    const pathPoints = pointsArray.map((p, i) => {
      const xPercent = parseFloat(p.x)
      return { x: xPercent, y: p.y }
    })

    let pathD = ''
    let areaD = ''

    if (pathPoints.length > 1) {
      // Simple line path
      pathD = pathPoints
        .map((p, i) => {
          const cmd = i === 0 ? 'M' : 'L'
          return `${cmd} ${p.x}% ${p.y}`
        })
        .join(' ')

      // Area path
      const chartBottom = height - padding.bottom
      areaD = `${pathD} L ${pathPoints[pathPoints.length - 1].x}% ${chartBottom} L ${pathPoints[0].x}% ${chartBottom} Z`
    }

    return { pathD, areaD, points: pointsArray }
  }, [data, chartDimensions, height, padding])

  const gradientId = useMemo(() => `gradient-${Math.random().toString(36).substr(2, 9)}`, [])

  return (
    <ChartContainer $height={height}>
      <SVGContainer viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={areaColor || color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={areaColor || color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {showGrid && (
          <>
            <GridLine x1="0" y1={height / 3} x2="100%" y2={height / 3} />
            <GridLine x1="0" y1={(height * 2) / 3} x2="100%" y2={(height * 2) / 3} />
          </>
        )}

        {/* Area fill */}
        {showArea && areaD && (
          <AreaPath d={areaD} fill={`url(#${gradientId})`} $animate={animate} />
        )}

        {/* Line */}
        {pathD && (
          <ChartPath d={pathD} stroke={color} strokeWidth="2" $animate={animate} />
        )}

        {/* Data point dots */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={iOS_COLOR.BACKGROUND_PRIMARY}
            stroke={color}
            strokeWidth="2"
            style={{
              opacity: animate ? 0 : 1,
              animation: animate ? `fadeIn 0.3s ease-out ${0.5 + i * 0.05}s forwards` : 'none',
            }}
          />
        ))}

        {/* Labels */}
        {showLabels &&
          points.map(
            (point, i) =>
              point.label && (
                <LabelText key={i} x={point.x} y={height - 5}>
                  {point.label}
                </LabelText>
              ),
          )}
      </SVGContainer>
    </ChartContainer>
  )
}

// Mini Sparkline Chart
interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
}

const SparklineContainer = styled.div<{ $width: number; $height: number }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  display: inline-flex;
  align-items: center;
`

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 60,
  height = 24,
  color = iOS_COLOR.CHART_LINE_PRIMARY,
}) => {
  const pathD = useMemo(() => {
    if (data.length < 2) return ''

    const minVal = Math.min(...data)
    const maxVal = Math.max(...data)
    const range = maxVal - minVal || 1

    const points = data.map((value, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((value - minVal) / range) * height * 0.8 - height * 0.1
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })

    return points.join(' ')
  }, [data, width, height])

  return (
    <SparklineContainer $width={width} $height={height}>
      <svg width={width} height={height}>
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </SparklineContainer>
  )
}

export default SimpleLineChart
