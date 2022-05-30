import React,{ useEffect, useState } from 'react'
import {ethers} from 'ethers';
import waveImg from '../static/waving-hand.png'
import abi from '../utils/WavePortal.json'

const Wave = () => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [showButton, setShowButton] = useState(false);
    const contractAddress = "0x5e09Ae5397cd120C144Dd6E9059BF5F59aF69e88";
    const contractABI = abi.abi;

    const waving = async() => {
        try{
            const {ethereum} = window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let totalWaves = await wavePortalContract.getTotalWaves();
                console.log("[Before]Total Waves : ", totalWaves.toNumber());

                let waveTxn = await wavePortalContract.wave();
                console.log("Mining : ", waveTxn.hash);
                console.log("::::::",waveTxn);
                await waveTxn.wait();
                console.log("Mined : ", waveTxn.hash);

                totalWaves = await wavePortalContract.getTotalWaves();
                console.log("[After]Total Waves : ", totalWaves.toNumber());

            }else{
                console.log("Ethereum object doesn't exist!")
            }
        }
        catch(err){
            console.log("Error: ", err);
        }
    }

    const checkIfWalletConnected = async() => {
        try{
            const { ethereum } = window;
            ethereum ? console.log("Wallet Connected : ", ethereum) : console.log("Wallet not connected!")
            /* Check if we're authorized to access the user's wallet */
            const accounts = await ethereum.request({method: "eth_accounts"});
            if(accounts.length){
                const account = accounts[0];
                console.log("Acccount : ", account);
                setCurrentAccount(account);
                setShowButton(false);
            }
            else{
                console.log("No authorized account found");
                setShowButton(true);
            }
        }
        catch(e){
            console.log("Ooops!! Error: ", e);
        }
    }

    /* Implement your connectWallet method here */
    const connectWallet = async() => {
        try{
            const {ethereum} = window;
            if(!ethereum){
                alert("Get Metamask account to continue.");
                return
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Account Connected: ", accounts[0]);
            setCurrentAccount(accounts[0]);
        }
        catch(e){
            console.log("Error: ",e)
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    },[])

    return (
        <div style={{ width: "50%", margin: "5% auto", fontFamily: "monospace"}}>
            <div style={{ fontSize: "24px", textAlign: "center", marginBottom:"10%"}}>
                <img src={waveImg} alt="" width={22} height={22}/>
                &nbsp;
                <p style={{ display: "inline" }}>
                    Hello Stranger! Welcome to this page. If you want to wave at me, please click below button.
                </p>
            </div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap:"10px"}}>
                <button style={styles.myButton} onClick={waving} >
                    Wave
                </button>
                {
                    !currentAccount && showButton && (
                    <button style={styles.myButton} onClick={connectWallet} >
                        Connect to MetaMask
                    </button>
                )}
            </div>
        </div>
  )
}

const styles = {
    myButton:{
        backgroundColor: "#519aff", 
        padding: "10px 12px", 
        fontSize: "16px",
        borderRadius:"10px", 
        color:"#fff", 
        border:"none" ,
        cursor:"pointer",
        width:"100%",
        maxWidth:"400px",
    }
}

export default Wave