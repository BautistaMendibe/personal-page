---
title: "Ethernaut L1: Fallback Function"
date: "30/01/2022"
img: "/blog/fallback.jpg"
---

<div class="separator" style="clear: both; text-align: center;"><br /></div>
<div class="separator" style="clear: both; text-align: center;">
  <a href="https://blogger.googleusercontent.com/img/a/AVvXsEjms0tRQz6iCW6E3xmBZw51Jx8LKKTjzGpHacDVOnJid6F1_pqCqIQOZqqqx3UYnlvNpgk6Fm7PyAp1M0RamyC2OdahwTjT7gpLw5cQIgcnbGc6h5wLpKUUvXjDeeJIAPLMpkxUflZwb0dIKptXmy-B5bwqYy9Hy-tgqiDHTqFWBIUIzMxuN3PgHuwf=s1024" style="margin-left: 1em; margin-right: 1em;"><img border="0" data-original-height="576" data-original-width="1024" height="360" src="https://blogger.googleusercontent.com/img/a/AVvXsEjms0tRQz6iCW6E3xmBZw51Jx8LKKTjzGpHacDVOnJid6F1_pqCqIQOZqqqx3UYnlvNpgk6Fm7PyAp1M0RamyC2OdahwTjT7gpLw5cQIgcnbGc6h5wLpKUUvXjDeeJIAPLMpkxUflZwb0dIKptXmy-B5bwqYy9Hy-tgqiDHTqFWBIUIzMxuN3PgHuwf=w640-h360" width="640" /></a>
</div>
<div class="separator" style="clear: both; text-align: center;"><br /></div>
<p style="clear: both; text-align: left;"><i>To overcome this challenge, what we must do are two things:</i></p><p style="clear: both; text-align: left;"><i>&nbsp; &nbsp; &nbsp;1. Make us the owner of the contract.</i></p><p style="clear: both; text-align: left;"><i>&nbsp; &nbsp; &nbsp;2. Reduce the contract balance to 0.</i></p><p style="clear: both; text-align: left;"><i>To do this, we are going to make use of the contract's fallback function.</i></p>
<h3 style="text-align: left;"><br /></h3>
<h3 style="text-align: left;">What is the fallback function</h3>
<div><div>The fallback function of a contract gives it the inherent ability to act as a wallet, meaning that other wallets or contracts can send you ether&nbsp;knowing only his public address (and without knowing his ABI or methods to receive ethers).</div><div>(We'll see later that a contract without a backup feature can still receive ethers if another contract makes use of a feature called self-destruct.)</div></div>
<div><br /></div>
<div><b>Fallback fuction properties:</b></div><div><b><br /></b></div><div><b>1.&nbsp;</b>Has no name or arguments.</div><div><b>2. </b>If it is not marked payable, the contract will throw an exception if it receives plain ether without data.</div><div><b>3. </b>Can not return anything.</div><div><b>4. </b>Can be defined once per contract.</div><div><b>5. </b>It is also executed if the caller meant to call a function that is not available.</div><div><b>6. </b>It is mandatory to mark it external.</div><div><b>7. </b>It is limited to 2300 gas when called by another function. It is so for as to make this function call as cheap as possible.</div>
<div><br /></div>
<div><br /></div>
<div>A good development and security practice is to keep this function as simple as possible.</div>
<div><br /></div>
<h3 style="text-align: left;">Reading the challenge contract</h3>
<div>
  The purpose of the contract is to define the owner as the address that deposited the most ethers in it.
</div>
<div><br /></div>
<div>Throughout this series of posts we are going to read the code of the proposed contract line by line, trying to understand what it does and how it does it to detect existing vulnerabilities.</div>
<div><br /></div>
<div>The first thing we find when we read the FallBack contract are 2 public state variables, one called "contributions", which is a mapping (it can be seen as a key-value dictionary data type), where for each address there corresponds a quantity in uint, and another of type address called "owner", which refers to the owner of the contract.</div>
<div><br /></div>
<div>Since the owner variable is public, we can use its getter function to find out its value from the console:</div><div><br /></div>
<div>
  <div class="separator" style="clear: both; text-align: center;">
    <a href="https://blogger.googleusercontent.com/img/a/AVvXsEjPSVzNtPNRdFqkwYpudYoddgtotAVBMxt4oMAHECxi1tzpWu7KAwfF6Q85R1y_AoNk9fR599yzPQcaWiK9P4nVRbvcFf92y3y7HiLbbfwEFM83xPeWR0ldZZ-HrvEsni7NX-Km06UztKbFLpvY4AAmxvOS0MqUHGqyzvvcWQUSAR2_4yzKGTiC2g5n" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="34" data-original-width="327" height="33" src="https://blogger.googleusercontent.com/img/a/AVvXsEjPSVzNtPNRdFqkwYpudYoddgtotAVBMxt4oMAHECxi1tzpWu7KAwfF6Q85R1y_AoNk9fR599yzPQcaWiK9P4nVRbvcFf92y3y7HiLbbfwEFM83xPeWR0ldZZ-HrvEsni7NX-Km06UztKbFLpvY4AAmxvOS0MqUHGqyzvvcWQUSAR2_4yzKGTiC2g5n" width="320" /></a>
  </div>
  <br />We can know that this owner is the one who deployed the contract, since the owner variable is defined in the constructor as the msg.sender:</div>
<div><br /></div>
<div style="background-color: #f2f2f2; padding: 10px;">
  <p style="padding: 10px; text-align: left;">
    <span style="font-family: courier;">constructor() public {<br /></span><span style="font-family: courier;">&nbsp; owner = msg.sender;<br /></span><span style="font-family: courier;">&nbsp; ontributions[msg.sender] = 1000 * (1 ether);<br /></span><span style="font-family: courier;">}</span>
  </p>
</div>
<div><br /></div>
<div>We also see that an amount of 1000 ethers is assigned to the owner.</div>
<div><br /></div>
<div>As we can see, we have two ways to become the owner of the contract: One is by calling the <span style="background-color: #f3f3f3;">contribute()</span> function and sending more than 1000000000000000000000 wei = 1000 ethers. The other way is by using the fallback function.</div>
<div><br /></div>
<div><b>Analyzing the fallback function of the contract</b></div>
<div>
  <b><br /></b>
</div>
<div>At the beginning of the function we find the following line:</div>
<div><br /></div>
<div style="background-color: #f2f2f2; padding: 10px;">
  <span style="font-family: courier;">require(msg.value &gt; 0 &amp;&amp; contributions[msg.sender] &gt; 0);
  </span>
</div>
<div><br /></div>
<div>
  This means that the fallback function needs two things to happen in order not to revert:
</div>
<div>
  <b>1.&nbsp;</b>That the amount we send to the contract (msg.value) is greater than 0.
</div>
<div>
  <b>2.</b> That the address that sends the ethers (msg.sender) already has ethers previously deposited in the contract.
</div>
<div><br /></div>
<div>
  Then, if these requirements are exceeded, the following line is executed:
</div>
<div><br /></div>
<div style="background-color: #f2f2f2; padding: 10px;">
  <span style="font-family: courier;">owner = msg.sender; </span>
</div>

<div><br /></div>
<div>
  That is, it defines the owner as the address that called the fallback function.
</div>
<div><br /></div>
<div><b>Solving the challenge</b></div>
<div><br /></div>
<div>
  Con esto vemos que para superar el desafío lo que debemos hacer es lo
  siguiente:
</div>
<div><br /></div>
<div>
  <b>1.</b>&nbsp;We send ethers to the contract (any amount) to satisfy the requirement of contributions[msg.sender] &gt; 0, we can do this by calling the <span style="background-color: #f3f3f3;"><span style="font-family: courier;">contribute()</span></span> function, which is public and payable. It is important to send an amount less than 0.001 ether, otherwise the function will revert (since it is coded that way).</div><div><br /></div>
<div style="background-color: #f2f2f2; padding: 10px;"><span style="font-family: courier;">await contract.contribute({value: 1});

</span></div>


<div><br /></div><div style="text-align: left;">We can see that we actually deposited the ether by calling the <span style="background-color: #f3f3f3;">getContribution()</span> function&nbsp;&nbsp;</div><div><br /></div>
<div><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEguvsWOQEmTYVvYS1CU8_mgPqebKpQdvsSzVfE8bVEPLDTVCdKnQrMO2AeGr_TLdeCW0uGveB9nDL0Kt8dfUkIgXDcJdFqv17FFnfot0TB5nhnxOO5rKvP3zVLtTOFtxCJJsUCHepvnqPD8u3zSLaBLo0guDqgss3Kxaxjr54HY_CKqm1vivzKF_OGw" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="180" data-original-width="383" height="150" src="https://blogger.googleusercontent.com/img/a/AVvXsEguvsWOQEmTYVvYS1CU8_mgPqebKpQdvsSzVfE8bVEPLDTVCdKnQrMO2AeGr_TLdeCW0uGveB9nDL0Kt8dfUkIgXDcJdFqv17FFnfot0TB5nhnxOO5rKvP3zVLtTOFtxCJJsUCHepvnqPD8u3zSLaBLo0guDqgss3Kxaxjr54HY_CKqm1vivzKF_OGw" width="320" /></a></div><br /><br /></div>
<div><b>2. </b>Now what we can do is send an amount greater than 0 ethers to the contract, we can use the function of the Web3 library called <span style="background-color: #f3f3f3;">sendTransaction()</span>, which by having metamask we can use it in our browser console.</div><div><br /></div>
<div><span style="background-color: #f2f2f2; font-family: courier;">await contract.sendTransaction({value: 1});</span></div>
<div><br /></div>
<div>What this does, as we have seen, is to execute the fallback function of the contract, this function verifies that the amount we send is greater than 0 (it is) and that our address already has ethers deposited (we already have it, in the previous function we send 1 gwei).</div><div><br /></div><div>As we can see, we are now the owner of the contract:</div><div><br /></div><div><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEhO5SHzDYysvttX1RpOI4lB4Y3C8H4syxXs0gzBPjzv8qgV1_rCEzX-oVs53r7lYtbP4qeLqiMt4O0kJXRFYI1nX2ZK-cIxRdrFm6EqJTwsDHNIXLivZJGlZdvA4I343xkZ2_TQ48X_Sb6rZMcnw2LxRY3kqWquG5SABsWRQlvX1UNeHVtA2bBFUuc0" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="84" data-original-width="335" height="80" src="https://blogger.googleusercontent.com/img/a/AVvXsEhO5SHzDYysvttX1RpOI4lB4Y3C8H4syxXs0gzBPjzv8qgV1_rCEzX-oVs53r7lYtbP4qeLqiMt4O0kJXRFYI1nX2ZK-cIxRdrFm6EqJTwsDHNIXLivZJGlZdvA4I343xkZ2_TQ48X_Sb6rZMcnw2LxRY3kqWquG5SABsWRQlvX1UNeHVtA2bBFUuc0" width="320" /></a></div><br /><b>3.&nbsp;</b>The last thing we must do is leave the contract balance at 0, for this we can call the <span style="background-color: #f3f3f3;"><span style="font-family: courier;">withdraw()</span></span> function which will be executed only if it is called by the owner of the contract (which we are now). What this function does is transfer the entire balance of the contract address to the address of the contract owner.</div><div><br /></div><div>We can see the balance of the contract address using the <span style="background-color: #f3f3f3;">getBalance</span> method:&nbsp;</div><div><div class="separator" style="clear: both; text-align: left;"><span style="background-color: #f2f2f2; font-family: courier;">await getBalance(contract.address);</span></div><div><br /></div><b>And ready! </b>If the transactions were verified correctly, we are now the owner of the contract and the balance of the contract has been transferred to our address.</div><div><br /><br /></div><div><br /></div>
