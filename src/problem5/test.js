const { ethers } = require('ethers')

const ADDR = '…' // your contract address
const ABI = [] // your contract ABI

const ADDRESS = '…' // some wallet address with token balance
const TOKENS = [
	// token contract addresses
	'…',
	'…'
]

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = ethers.providers.getDefaultProvider()

const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider)

	const balances = await contract.getBalances(ADDRESS, tokens)

	return balances
}

test().then(console.log)
