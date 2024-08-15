import { useEffect, useState } from 'react'
import { IoIosSkipForward, IoIosSkipBackward } from 'react-icons/io'

import Player from './Player'
import Abhiman from '../assets/music/Abhiman - Albatross (Barahsinghe Acoustic Sessions).mp3'
import Narisauna from '../assets/music/Narisawna-Tribal Rain(Official).mp3'
import SparshaSangeet from '../assets/music/Sparsha Sangeet.mp3'
import MusicItem, { type Music } from './MusicItem'
import AbhimanPic from '../assets/pictures/abhiman.jpg'
import NarisaunaPic from '../assets/pictures/narisauna.jpg'
import SparsaSangeetPic from '../assets/pictures/sparsha.jpg'
import ProgressIndicatorBar from './ProgrssIndicatorBar'

const musicList: Music[] = [
	{
		audio: new Audio(Abhiman),
		title: 'Abhiman',
		cover: AbhimanPic,
	},
	{
		audio: new Audio(Narisauna),
		title: 'Narisauna',
		cover: NarisaunaPic,
	},
	{
		audio: new Audio(SparshaSangeet),
		title: 'SparshaSangeet',
		cover: SparsaSangeetPic,
	},
]

function formatTime(seconds: number): string {
	const minutes = seconds / 60
	const decimalSeconds = minutes % 1
	const decimalSecondsHandle = Math.trunc(decimalSeconds * 60)
	let newDecimalSeconds = String(decimalSecondsHandle)
	if (String(decimalSecondsHandle).length < 2) {
		newDecimalSeconds = `0${decimalSecondsHandle}`
	}
	return `${Math.trunc(minutes)}:${newDecimalSeconds}`
}

export default function MusicPlayer() {
	const [progress, setProgress] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [music, setMusic] = useState(musicList[0])
	const [playedTime, setPlayedTime] = useState('0:00')
	const [songDuration, setSongDuration] = useState('0:00')

	useEffect(() => {
		setSongDuration(formatTime(music.audio.duration))
		music.audio.addEventListener('loadeddata', handleAudioLoaded)
		music.audio.addEventListener('timeupdate', handleAudioTimeUpdate)
		music.audio.addEventListener('ended', handleNextSong)
		return () => {
			music.audio.removeEventListener('ended', handleNextSong)
			music.audio.removeEventListener('timeupdate', handleAudioTimeUpdate)
			music.audio.removeEventListener('loadeddata', handleAudioLoaded)
		}
	}, [music])

	function handleAudioLoaded() {
		setSongDuration(formatTime(music.audio.duration))
	}

	function handleAudioTimeUpdate() {
		const currentAudio = music.audio
		setProgress((currentAudio.currentTime * 100) / currentAudio.duration)
		setPlayedTime(formatTime(currentAudio.currentTime))
	}

	function onDurationChange(value: number) {
		setProgress(value)
		music.audio.currentTime = (music.audio.duration * value) / 100
	}

	function changeMusic(nextMusic: Music) {
		music.audio.pause()
		music.audio.currentTime = 0
		nextMusic.audio.play()
		setMusic(nextMusic)
		setSongDuration(formatTime(nextMusic.audio.duration))
		setIsPlaying(true)
	}

	function togglePlayPause(isPlaying: boolean) {
		setIsPlaying(isPlaying)
		if (isPlaying) {
			music.audio.play()
		} else {
			music.audio.pause()
		}
	}

	function handleNextSong() {
		const currentMusicIndex = musicList.findIndex(
			(m) => m.title === music.title,
		)
		const nextMusicIndex =
			musicList.length > currentMusicIndex + 1 ? currentMusicIndex + 1 : 0
		const nextMusic = musicList[nextMusicIndex]
		changeMusic(nextMusic)
	}

	function handlePreviousSong() {
		const currentMusicIndex = musicList.findIndex(
			(m) => m.title === music.title,
		)
		const nextMusicIndex =
			currentMusicIndex === 0 ? musicList.length - 1 : currentMusicIndex - 1
		const nextMusic = musicList[nextMusicIndex]
		changeMusic(nextMusic)
	}

	return (
		<div className="flex">
			<div className="w-[500px]">
				<div
					style={{ backgroundImage: `url(${music.cover})` }}
					className="w-[500px] h-[450px] bg-cover bg-center bg-no-repeat"
				/>
				<h1 className="flex justify-center text-xl mt-5">{music.title}</h1>

				<div className="m-4">
					<div>
						{playedTime} / {songDuration}
					</div>
					<ProgressIndicatorBar
						onChange={onDurationChange}
						value={progress}
						steps={2}
					/>
				</div>

				<div className="flex justify-around mt-6">
					<button onClick={handlePreviousSong}>
						<IoIosSkipBackward size={'22px'} />
					</button>
					<Player
						color="black"
						isPlaying={isPlaying}
						onChange={togglePlayPause}
					/>
					<button onClick={handleNextSong}>
						<IoIosSkipForward size={'22px'} />
					</button>
				</div>
			</div>
			<div className="flex justify-center m-10">
				<div>
					<h1 className="">Songs</h1>
					<div className=" w-full">
						{musicList.map((music) => (
							<MusicItem
								key={music.title}
								music={music}
								onChange={changeMusic}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
