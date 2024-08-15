import './index.css'
import Rain from './assets/sounds/rain-sound-188158.mp3'
import Fire from './assets/sounds/fire-sound-222359.mp3'

import Sfx from './components/sfx'
import MusicPlayer from './components/MusicPlayer'

type SFX = {
	title: string
	audio: HTMLAudioElement
}

const sfxList: SFX[] = [
	{
		title: 'Rain',
		audio: new Audio(Rain),
	},
	{
		title: 'Fire',
		audio: new Audio(Fire),
	},
]

function App() {
	return (
		<div className="bg-[#e4e4e4] h-[full]c ">
			<div className="flex flex-col items-center  bg-[#e4e4e4]">
				<div className="">
					<h1 className="text-2xl ml-4">Sfx</h1>
					<div className="flex mb-10  bg-[#ececec]  justify-center w-full  px-20 justify-evenly border-2 rounded">
						{sfxList.map((sfx) => (
							<div className="py-4" key={sfx.title}>
								<h1 className="mb-14 flex justify-center text-lg">
									{sfx.title}
								</h1>
								<Sfx audio={sfx.audio} />
							</div>
						))}
					</div>
				</div>
				<div className="mb-10">
					<MusicPlayer />
				</div>
			</div>
		</div>
	)
}

export default App
