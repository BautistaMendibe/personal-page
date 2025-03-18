---
title: "Security in Smart Contracts. Ethernet N0: Web3, ABI"
date: "19/01/2022"
img: "/blog/ethernaut1.jpeg"
---

<p><br /></p>
<div class="separator" style="clear: both; text-align: center;">
  <a href="https://blogger.googleusercontent.com/img/a/AVvXsEhmzBpeq7lZVSwmGhJp72dlVrWicI1bvt82ERW6oQCvfGduobT20hGhIGaK8E0imNjWcaE_qAU-BdgeyP1VTsoPL--5H__GMtFTKhEq8WepsHwKwN5NTPUMQReoACRg3Sq1LmNt8mgS6NTWaOi26QeG08tXNRADeQYb-QUOXP-lokC6dczvCpQQ7pT7=s753" style="margin-left: 1em; margin-right: 1em;"><img border="0" data-original-height="422" data-original-width="753" height="361" src="https://blogger.googleusercontent.com/img/a/AVvXsEhmzBpeq7lZVSwmGhJp72dlVrWicI1bvt82ERW6oQCvfGduobT20hGhIGaK8E0imNjWcaE_qAU-BdgeyP1VTsoPL--5H__GMtFTKhEq8WepsHwKwN5NTPUMQReoACRg3Sq1LmNt8mgS6NTWaOi26QeG08tXNRADeQYb-QUOXP-lokC6dczvCpQQ7pT7=w640-h361" width="640" /></a>
</div>
<div><br /></div><div style="text-align: left;"><br /></div><div style="text-align: left;">Security in Smart Contracts is a topic that I find passionate and that is very important in the blockchain ecosystem, at the time of writing this first entry on my blog, <a href="https://rekt.news/qubit-rekt/" rel="nofollow" target="_blank">80 million dollars have just been stolen from the Qubit protocol.</a></div><p style="text-align: left;">In this series of posts, we are going to be solving the security challenges in smart contracts posed in the <a href="https://ethernaut.openzeppelin.com/" rel="nofollow" target="_blank">Ethernaut</a> game, developed by the <a href="https://openzeppelin.com/" rel="nofollow" target="_blank">Open Zepellin</a> team, a world-renowned company in this area.</p>
<p style="text-align: left;">The idea of this series is to understand the concepts that each level requires us to understand in order to pass them correctly and not to simply decide what code to write to pass the level.</p><p style="text-align: left;"><br /></p>
<h3 style="text-align: left;">How we interact with the challenge contract</h3>
<div style="text-align: left;">Something to keep in mind is that the code of all smart contracts is compiled by the Ethereum Virtual Machine (EVM) in two different formats:</div>
<div style="text-align: left;"><br /></div>
<div>
  <ul style="text-align: left;">
    <li style="text-align: left;">
      <b>Aplication Binary Interface (ABI):</b>&nbsp;It is a layer in JSON format that gives us the way in which we will communicate with the contract (written in Solidity) with another language (Javascript or Python for example).</li>
  </ul>
  <ul style="text-align: left;">
    <li style="text-align: left;">
      <b>Bytecode:&nbsp;</b>Low-level binary code that is interpreted by the EVM.</li>
  </ul>
</div>
<p style="text-align: left;"><br /></p>
<p style="text-align: left;">When we create a new instance of the level, what is happening is that Ethernaut (Open Zeppelin) deploys the contract belonging to that level to a new address within the Ropsten testnet.</p>
<p style="text-align: left;">By having Metamask installed in our browser, by default we can use the Web3 library. What this does is allow us to interact with the ABI of the instance of the level that has just been deployed, allowing us to call functions and variables of the contract (as long as the visibility and access parameters of these allow us) from our console.</p>
<div class="separator" style="clear: both; text-align: center;">
  <a href="https://blogger.googleusercontent.com/img/a/AVvXsEgexHAnbQWEKoXi53PM4N3m9mk3ElXUr7CEuq_4VNGUKWty--rwi51Pq9LrITQktYDZu89UCSzh9Cs2NJA-4eUg4IsnEGMP6syRWw9BPEVJXjQHoGud9Q4uW1zWW9gUCcx8PSMMl6uRM6hVKEyU-XPJTHIYhrkvjnAYI2SpHOoeOrJIOhE2Z4xCxR68=s882" style="margin-left: 1em; margin-right: 1em;"><img border="0" data-original-height="738" data-original-width="882" height="268" src="https://blogger.googleusercontent.com/img/a/AVvXsEgexHAnbQWEKoXi53PM4N3m9mk3ElXUr7CEuq_4VNGUKWty--rwi51Pq9LrITQktYDZu89UCSzh9Cs2NJA-4eUg4IsnEGMP6syRWw9BPEVJXjQHoGud9Q4uW1zWW9gUCcx8PSMMl6uRM6hVKEyU-XPJTHIYhrkvjnAYI2SpHOoeOrJIOhE2Z4xCxR68=s320" width="320" /></a>
</div>
<div style="text-align: left;"><br /></div>
<h3 style="text-align: left;">Overcoming the challenge</h3>
<div style="text-align: left;">To pass this level, we are required to guess the password and be able to call the <span style="background-color: #f3f3f3;"><span style="font-family: courier;">authenticate</span></span> function correctly so that the boolean variable "clared" becomes true.</div>
<div style="text-align: left;"><br /></div>
<div style="text-align: left;">The password state variable is defined in the constructor (the constructor is a function that is executed only once at the time the contract is deployed):</div><div><br /></div>
<div style="background-color: #f2f2f2; padding: 10px;">
  <p><span style="font-family: courier;">constructor(string memory _password) public {</span></p><p><span style="font-family: courier;">&nbsp; password = _password;</span></p><p><span style="font-family: courier;">}</span></p>
</div>

<div><br /></div><div>This state variable is stored as a public string:</div><div><br /></div>
<div style="background-color: #f2f2f2; padding: 10px;"><span style="font-family: courier;">
  string public password;
</span></div>
<div><br /></div>
<div style="text-align: left;"><div>For all public variables, Solidity automatically generates the getter function with the same name ("nameVariable()"), that is, we can access the value of this variable inside and outside the contract.</div><div>In order to see its value, what we can do is call this getter function of the variable within our console:</div></div><div><br /></div>
<div style="background-color: #f2f2f2; padding: 10px;"><span style="font-family: courier;">await contract.password();</span></div>
<br /><div><i>We use await because this operation returns a promise.</i></div><div><br /></div><div>Now that we know the value of the password variable, what we do is call the authenticate function, passing this value as an argument.</div><div><br /></div>
<div style="background-color: #f2f2f2; padding: 10px;"><span style="font-family: courier;">await contract.authenticate("password-value");</span></div><div><br /></div><div style="text-align: left;"><b>Note: </b>Since we are changing the status of the contract with this function, we need to pay a commission (gas) for the transaction.</div><div style="text-align: left;"><br /></div><div style="text-align: left;">To be sure that the variable "clared" returned true, we cannot call the getter function of that variable, i.e. "contract.clared()", since the variable is declared private (later we will see that although the variables are private within the contract we can also know their value within the blockchain). To check that we passed the level we can call the getCleared function which returns the value of this variable.</div><div><br /></div>
<div style="background-color: #f2f2f2; padding: 10px;"><span style="font-family: courier;">await contract.getClared();</span></div>
<div></div>