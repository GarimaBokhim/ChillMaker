import type { MouseEvent } from 'react'
import './progressIndicator.css'

type ProgressIndicatorBarProps = {
	value: number
	onChange: (duration: number) => void
	steps?: number
	height?: number
	isVertical?: boolean
	color?: string
}

const ProgressIndicatorBar = ({
	value,
	onChange,
	steps = 1,
	isVertical = false,
	height = 12,
	color = 'black',
}: ProgressIndicatorBarProps) => {
	function handleClick(e: MouseEvent<HTMLDivElement>) {
		const duration = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * 100
		onChange(Math.ceil(duration / steps) * steps)
	}

	return (
		<div
			style={{
				rotate: isVertical ? '270deg' : '',
				height: `${height}px`,
			}}
			className="bg-[#aaaaaa]  rounded-md container w-full"
			onClick={handleClick}
		>
			<div
				id="progress"
				className="progress h-full w-full rounded-md"
				style={{ width: `${value}%`, background: color }}
			/>
		</div>
	)
}

export default ProgressIndicatorBar
