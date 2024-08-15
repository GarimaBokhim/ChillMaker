import Player from './Player'
import { useState } from 'react'
import ProgressIndicatorBar from './ProgrssIndicatorBar'
import { IoVolumeHigh, IoVolumeMute } from 'react-icons/io5'

type SfxProps = {
	audio: HTMLAudioElement
}

const Sfx = ({ audio }: SfxProps) => {
	const [isMute, setIsMute] = useState(false)
	const [volume, setVolume] = useState(100)
	const [isPlaying, setIsPlaying] = useState(false)

	function toggleMute() {
		if (!isMute) {
			audio.muted = true
			setVolume(0)
			setIsMute(true)
		} else {
			audio.muted = false
			setIsMute(false)
			setVolume(audio.volume * 100)
		}
	}

	function togglePlaying(isPlaying: boolean) {
		if (isPlaying) {
			audio.play()
			audio.loop = true
		} else {
			audio.pause()
		}
		setIsPlaying(isPlaying)
	}

	function onVolumeChange(value: number) {
		setVolume(value)
		audio.volume = value / 100
	}

	return (
		<div className="flex justify-center m-1">
			<div>
				<div className="w-[100px]">
					<ProgressIndicatorBar
						value={volume}
						onChange={onVolumeChange}
						color="black"
						isVertical
						steps={5}
					/>
				</div>
				<div className="mt-16 ml-11 flex">
					<Player
						isPlaying={isPlaying}
						onChange={togglePlaying}
						color="black"
					/>

					<button onClick={toggleMute} className="mx-6">
						{isMute ? (
							<IoVolumeMute size={'22px'} />
						) : (
							<IoVolumeHigh size={'22px'} />
						)}
					</button>
				</div>
			</div>
		</div>
	)
}
export default Sfx
