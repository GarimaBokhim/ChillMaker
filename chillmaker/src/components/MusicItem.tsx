export type Music = {
	audio: HTMLAudioElement
	title: string
	cover: string
}

type MusicItemProps = {
	music: Music
	onChange: (music: Music) => void
}

const MusicItem = ({ music, onChange }: MusicItemProps) => {
	function playAudio() {
		onChange(music)
	}

	return (
		<div
			onClick={playAudio}
			style={{ cursor: 'pointer' }}
			className=" w-content mb-1 p-2 px-4 flex w-full h-16"
		>
			<img
				src={music.cover}
				style={{ height: '45px', width: '4 5px' }}
				className="rounded mr-4"
			/>
			<h1 className="pl-2 text-lg">{music.title}</h1>
		</div>
	)
}
export default MusicItem
