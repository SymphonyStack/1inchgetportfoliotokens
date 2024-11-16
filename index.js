import dotenv from 'dotenv';
dotenv.config();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getCurrentValue(walletAddress, chainId, apiKey) {
    const endpoint = `https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/current_value?addresses=${walletAddress}&chain_id=${chainId}`;
    const data = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${apiKey}` }
    }).then((res) => res.json());
    return data;
}

const [, , walletAddress, chainId, apiKey] = process.argv;

(async() => {
    try {
        const res = await getCurrentValue(walletAddress, chainId, apiKey);
        let total = 0;
        const size = res.result[0].result.length; // Get the length of the array
        for (let i = 0; i < size; i++) {
            total += Number(res.result[0].result[i].value_usd);
        }
        console.log("##" + JSON.stringify({ status: 200, message: "Portfolio value received", portfolio_value: total }) + "##");
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();