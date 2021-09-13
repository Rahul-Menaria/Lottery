import React, { useEffect, useState } from "react";
import web3 from "./Web3";
import lottery from "./lottery";

export default function Manager() {
  const [manager, setManager] = useState("");
  const [balance, setBalance] = useState("");
  const [players, setPlayers] = useState("");
  const [ether, setEther] = useState("");
  const [status, setStatus] = useState("");
  useEffect(async () => {
    const managerAddress = await lottery.methods.manager().call();
    const accountBalance = await web3.eth.getBalance(lottery.options.address);
    const playersArray = await lottery.methods.playerList().call();
    setManager(managerAddress);
    setBalance(accountBalance);
    setPlayers(playersArray);
  }, []);

  const enterLottery = async (e) =>{
    e.preventDefault();
    setStatus('Wait till transaction is confirmed...');
    const accounts= await web3.eth.getAccounts();
    await lottery.methods.enter().send({
        from:accounts[0],
        value: web3.utils.toWei(ether, 'ether')
    });
       setStatus('Transaction is confirmed,Congratulations You have entered in Lottery');
    }
    const onClick = async (e) =>{
        e.preventDefault();
        const accounts= await web3.eth.getAccounts();
        await lottery.methods.pickWinner().send({
            from:accounts[0]
        });

    }

  return (
    <div>
      <h2>The Adddress which manage the lottery is {manager}</h2>
      <p>
        There are {players.length} people enterd in lottery and total winning
        is {web3.utils.fromWei(balance, 'ether')}
      </p>
      <form onSubmit={enterLottery}>
          <h5>Enter the amount of ether </h5>
          <input type="text" name="" id="" onChange={(e)=>{
              setEther(e.target.value);
          }}/>
          <button type="submit">Enter</button>
      </form>
      <hr />
      <h3>Pick A winner?</h3>
      <button onClick={onClick}>Pick A winner</button>
      <hr />
      <h3>{status}</h3>
    </div>
  );
}
