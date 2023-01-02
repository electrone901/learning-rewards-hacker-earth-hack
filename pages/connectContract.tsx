import ethers from "ethers"
import ABI from "../abis/ABI";

export default function connectContract() {
    https://github.com/adrianmcli/web3-vs-ethers/blob/master/app-ethers/useCounterContract.js
    
    const provider = new ethers.providers.JsonRpcProvider();
    const network = await provider.getNetwork();
    const contractAddress = ABI.networks[network.chainId].address;
    if (network.chainId === 1001){

        const contractInstance = new ethers.Contract(
            contractAddress,
            ABI.abi,
            provider.getSigner(),
            );
        }
}