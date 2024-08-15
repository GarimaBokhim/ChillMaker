type Option = {
	a: string
	b?: string
}

function foo({ a, b = 'garima' }: Option) {
	console.log(a, b)
}

foo({ a: 'bar' })
