import { FaPause, FaPlay } from 'react-icons/fa'
type PlayerProps = {
	isPlaying: boolean
	onChange: (isPlaying: boolean) => void
	color: string
}
export default function Player({ isPlaying, onChange, color }: PlayerProps) {
	function toggle() {
		onChange(!isPlaying)
	}
	return (
		<div>
			<button onClick={toggle}>
				{isPlaying ? (
					<FaPause color={color} size={'22px'} />
				) : (
					<FaPlay color={color} size={'22px'} />
				)}
			</button>
		</div>
	)
}
