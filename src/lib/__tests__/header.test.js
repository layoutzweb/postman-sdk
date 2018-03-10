import Collection from './../collection'

export const METHODS = [
	'add',
	'findIndex',
	'findWith',
	'findBy',
	'find',
	'has',
	'remove'
]

const HEADER_1 = {
	key: 'Content-Type',
	value: 'application/json'
}

const HEADER_2 = {
	key: 'Accept',
	value: 'application/json'
}

const HEADER_3 = {
	key: 'Authorization',
	value: 'Bearer {{TOKEN}}'
}

const DUMMY_HEADER = {
	key: 'Fake Header',
	value: 'Fake value'
}

describe('Request Headers:', () => {
	const collection = Collection('Test Collection', '1.0.0')
	collection.item.add('/test-endpoint', 'GET')
	const item = collection.item.find('/test-endpoint')
	const headers = collection.item.request.headers(item)

	describe('Create New Item with Headers', () => {
		expect(Object.keys(headers)).toMatchObject(METHODS)
		expect(Object.keys(headers)).toHaveLength(7)
	})

	describe('Operations: ', () => {
		it('Should add new headers', () => {
			headers.add(HEADER_1)
			headers.add(HEADER_2)
			headers.add(HEADER_3.key, HEADER_3.value)
			expect(item.request.headers).toHaveLength(3)
		})

		it('Should find a header', () => {
			console.info(item.request.headers)
			expect(headers.find(HEADER_2)).toMatchObject(HEADER_2)
		})

		it('Should NOT find a variable', () => {
			expect(headers.find(DUMMY_HEADER)).toBeNull()
		})

		it('Should remove variables to the environment', () => {
			headers.remove(HEADER_1)
			headers.remove(HEADER_2)
			expect(item.request.headers).toHaveLength(1)
			expect(headers.find(HEADER_2)).toBeNull()
			expect(headers.find(HEADER_1)).toBeNull()
			expect(headers.find(HEADER_3)).toMatchObject(HEADER_3)
		})
	})
})