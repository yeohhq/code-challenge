import { ethers } from 'ethers';

const ADDR = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468"; // SWTH contract address

const HOLDERS = [    // holders addresses
"0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
"0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
"0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392"
];

const test = async () => {
    try {
        const abiJSON = (await fetch(`https://api.bscscan.com/api?module=contract&action=getabi&address=${ADDR}`).then(res => res.json())).result;

        const provider = new ethers.providers.JsonRpcProvider(
            "https://bsc-dataseed.binance.org/"
        );
        const contract = new ethers.Contract(ADDR, abiJSON, provider);

        let balances = [];

        await Promise.all(
            HOLDERS.map(async (holder) => {
                const res = await contract.balanceOf(holder);
                balances.push({
                    address: holder, 
                    amount: res.toNumber()
                });
            }
        ));
        
        return balances;
    } catch (err) {
        console.error(err);
    }
    
};

test().then((res) => {
    res.forEach((holder) => {
        console.log(holder.address, holder.amount);
    })
});