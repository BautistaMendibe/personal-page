---
title: "Decentralized Notes Application (DApp) with Solidity and Trufffle - Step by Step 📝"
date: "27/05/2022"
img: "/blog/typewrite.jpg"
---

<p><br /></p>
<div class="separator" style="clear: both; text-align: center;">
  <a href="https://blogger.googleusercontent.com/img/a/AVvXsEgo2Vv3v-XA4qkn1r_Bxgopv2lb8INy4ymInd2XFppzG840R0aUEdP6uJxgQv1blIaJicouWoNtZfW8mai5pOcwNOFnWIzf4eNJ9EKfdzgUrf94K6pf6OjZc6E7Yl0AvqrH4ZQKZjE5gyP0jg3HnqGHafjh0cz8FEs45DbRlChcDPSJ7uil9eADDsit=s480" style="margin-left: 1em; margin-right: 1em;"><img border="0" data-original-height="360" data-original-width="480" height="499" src="https://blogger.googleusercontent.com/img/a/AVvXsEgo2Vv3v-XA4qkn1r_Bxgopv2lb8INy4ymInd2XFppzG840R0aUEdP6uJxgQv1blIaJicouWoNtZfW8mai5pOcwNOFnWIzf4eNJ9EKfdzgUrf94K6pf6OjZc6E7Yl0AvqrH4ZQKZjE5gyP0jg3HnqGHafjh0cz8FEs45DbRlChcDPSJ7uil9eADDsit=w640-h499" width="640" /></a>
</div>
<br />
<p></p>
<p><b>What are we going to build?</b></p>
<p>
  We are going to create the typical notes app, but in a decentralized way,
  where each note is stored in the blockchain. Beyond the 0 practical utility
  that this application would have (since for the fee of each transaction,
  annotating each note would cost us approximately $10, it would be the most
  expensive notes application in the world :P), this will allow us to learn how
  to create a simple project with Truffle, create, deploy and test the smart
  contract, connect this smart contract with the front end of the application,
  use the metamask API, among other things. I hope you find it
  useful!&nbsp;<span style="font-size: 20px;">💪</span>
</p>
<div style="text-align: center;">
  <iframe allowfullscreen="" class="giphy-embed" frameborder="0" height="270" src="https://giphy.com/embed/mdbUGtaJ93ehTzLjvO" width="480"></iframe>
</div>
<div style="text-align: center;"><br /></div>
<p><b>Let's start!</b></p>
<p>
  To make this project we'll use
  <a href="https://trufflesuite.com/" rel="nofollow" target="_blank">Truffle</a>
  as framework, although
  <a href="https://hardhat.org/" rel="nofollow" target="_blank">Hardhat </a>can
  be used as well.&nbsp;We'll use
  <a href="https://www.npmjs.com/package/ganache-cli" rel="nofollow" target="_blank">Ganache </a>to create a local blockchain to deploy and test our code.
</p>
<p>
  We'll start the project with the command <b>truffle init </b>inside the folder
  we created for the project.This will create a small initial structure that
  we'll use to create the project.
</p>
<p>
  We'll begin by creating a contract called <b>TasksContract.sol</b> that we'll
  use to manage the notes.&nbsp;
</p>
<p>
  For this, what we'll&nbsp;do is to create a new data structure that represents
  each task, Solidity facilitates this to us with the <b>struct </b>data type.
  Each task will contain an id, a title, a description, a variable indicating
  whether it is done or not and a creation date.&nbsp;
</p>

<div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
  <p style="padding: 10px; text-align: left;">
    <span style="font-family: courier;">struct Task {<br />&nbsp; &nbsp; uint256 id;<br />&nbsp; &nbsp; string
      title;<br />&nbsp; &nbsp; string description;<br />&nbsp; &nbsp; bool
      done;<br />&nbsp; &nbsp; uint256 createdAt;<br />}</span>
  </p>
</div>
<p>
  We'll use the variable "createdAt" to store the date and time when the task
  was created. Despite it is a time variable Solidity takes it as an integer
  (since from that integer it calculates the date and time, we will see it
  later).
</p>
<p>
  We need a way to be able to access each task according to its id, in any other
  web2 language we would use an array, but in Ethereum traversing an array is
  very expensive, so we opt for the mapping datatype. Mapping is a "key-value"
  data type (dictionary style), where the key can be any data type and the value
  can be any other. In our case it will be the Task object we created earlier.
</p>
<p>The way to denote the mapping is the following:&nbsp;</p>
<p>mapping (KeyDataType =&gt; ValueDataType) visibility mappingName;</p>
<p>In our case:</p>
<div style="background-color: #f2f2f2; padding: 10px;">
  <span style="font-family: courier;">mapping ( uint256 =&gt; Task ) public tasks;
  </span>
</div>

<h3 style="text-align: left;">
  <span face="-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif" style="background-color: white; font-size: 20px;"><br /></span>
</h3>
<h3 style="text-align: left;">
  <span face="-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif" style="font-size: x-large;">Creating CRUD&nbsp;</span>🔨
</h3>
<p>
  We are going to create the different functions that allow us to interact with
  this data (create a task and mark it as done).
</p>
<p>
  <span style="font-size: medium;"><i><span><b><u>Create - Task Function</u>&nbsp;</b></span></i><span>✏️</span>
  </span>
</p>
<p>
  To create this function the only parameters we must pass to it will be the
  title of the task we want to create and the description, since the other
  parameters can be made to take values by default, generating a value for the
  id, false for the done variable and the current time for the createdAt
  parameter (which we'll&nbsp;obtain from the block where our contract is being
  executed).
</p>

<p>
  <i> Note:</i> memory&nbsp;variables in Solidity can only be declared within
  methods and are usually used in method parameters. It's a short term variable
  that cannot be saved on the blockchain; it holds the value only during the
  execution of a function and its value is destroyed after execution.
</p>
<p>
  The function will be public, because after we'll need call this fuction from
  de frontend.
</p>
<div style="background-color: #f2f2f2; padding: 10px;">
  <p style="padding: 10px; text-align: left;">
    <span style="font-family: courier;">uint256 taskCounter = 0;</span>
  </p>
  <p style="padding: 10px; text-align: left;">
    <span style="font-family: courier;">function createTask(string memory _title, string memory _description)
      public {<br />&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<br />&nbsp; &nbsp;
      tasks[taskCounter] = Task(<br />&nbsp; &nbsp; &nbsp; &nbsp;taskCounter,<br />&nbsp;
      &nbsp; &nbsp; &nbsp;_title,<br />&nbsp; &nbsp; &nbsp;
      &nbsp;_description,<br />&nbsp; &nbsp; &nbsp; &nbsp;false,<br />&nbsp;
      &nbsp; &nbsp; &nbsp;block.timestamp<br />&nbsp; &nbsp; );<br />&nbsp;
      &nbsp; &nbsp; &nbsp;&nbsp;<br />&nbsp; &nbsp; taskCounter++;<br />}&nbsp;&nbsp;</span>
  </p>
</div>
<h4 style="text-align: left;">
  <i><span style="font-size: large;"><u><br /></u></span></i>
</h4>
<h4 style="text-align: left;">
  <span style="font-size: large;"><i><u>Deploying and Interacting with</u></i></span><i><span style="font-size: large;"><u>&nbsp;the Contract&nbsp;</u></span></i><span style="font-size: 20px;">🧪</span>
</h4>
<p>
  It is advisable to test each function to make sure everything is working
  properly, because once the smart contract is deployed on the blockchain it is
  very difficult to update it. Two ways to test the contract functions are
  manually from the Truffle console (less recommended path) and automatically
  using another language such as JavaScript. We'll&nbsp;look at both.
</p>
<p>
  The first thing we'll&nbsp;do is create the environtment for the test.&nbsp;
  Open Ganache app and select Workspace Quickystart, this open the follow window
  (this it's possible to do in the terminal also):&nbsp;
</p>
<p></p>
<div class="separator" style="clear: both; text-align: center;">
  <a href="https://blogger.googleusercontent.com/img/a/AVvXsEj93O0ZV_q_EMlaPTGGYYLPGnc-74_XbYLkVOzCNPfQXJs-VNpBg0lROkTBEybbWRwxNGLdJylahr3Ou5bAyLH8mAAQntPbVAGreX0qGpbFUaWmn0atrgNJV2hWHAcllNg1KRg0sgDCPgICEQgZB_GqmHU9o5mwtJv8cXhtqyBkdNL1fMBDLjfsY80p" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="716" data-original-width="1187" height="241" src="https://blogger.googleusercontent.com/img/a/AVvXsEj93O0ZV_q_EMlaPTGGYYLPGnc-74_XbYLkVOzCNPfQXJs-VNpBg0lROkTBEybbWRwxNGLdJylahr3Ou5bAyLH8mAAQntPbVAGreX0qGpbFUaWmn0atrgNJV2hWHAcllNg1KRg0sgDCPgICEQgZB_GqmHU9o5mwtJv8cXhtqyBkdNL1fMBDLjfsY80p=w400-h241" width="400" /></a>
</div>
<br />Ganache creates a private blockchain where we can deploy and test our
dapps. Also, Ganache offers us 10 account with 100 test ethers (each
one)&nbsp;&nbsp;that we will use it for deploy our smart contract and interact
with him.&nbsp;
<p></p>
<p>
  For connect our proyect in Truffle with Ganache and use its blockchain that
  offers us, we should config the file named "truffle_config.js" into the VS
  code. Into the part of networks, un-comment the lines of "development" and
  complete this with the correct data (in my case, Ganache tells me that the RPC
  SERVER is "http://127.0.0.1:7545", so I'd put 127.0.0.1 in host parameter and
  7545 in the port parameter, the network_id parameter can be left at
  "*").&nbsp;Then, in the compilers part we indicate the version of Solidity
  that we will use for the proyect (in my case 0.8.7).
</p>
<h4 style="text-align: left;">
  <i><u>Deploy Contract to the local Blockchain&nbsp;</u></i><span style="font-size: 20px;">⛓️</span>
</h4>
<p>
  Now we need to create a file that we use for the contract deploy, into de
  migration folder, we'll create a file .js named
  "<b>2_deploy_taskContract.js</b>" (this is an example, you can use the name
  you want), in this file, we'll write the following:&nbsp;
</p>
<div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
  <p style="padding: 10px;">
    <span style="font-family: courier;">const TaskContract = artifacts.require("TasksContract");<br /></span>
  </p>
  <p style="padding: 10px;">
    <span style="font-family: courier;">module.exports = function (deployer) {<br />&nbsp; &nbsp;
      deployer.deploy(TaskContract);<br />};</span>
  </p>
</div>
<p style="text-align: left;">
  The&nbsp;explanation of this code is
  <a href="https://trufflesuite.com/docs/truffle/getting-started/running-migrations.html" rel="nofollow" target="_blank">here</a>.&nbsp;Basically, at the beginning of the migration, we tell Truffle which
  contracts we'd like to interact with via the artifacts.require() method, in
  our case, our contract name is TasksContract. After that, we deploy the
  contract with the module exports.
</p>
<p style="text-align: left;">
  To deploy the contract we'll use the comand <b>truffle deploy</b>, this
  command compile the contracts and deploy this. If we just want to compile the
  contracts, use the command <b>truffle compile</b>.&nbsp;This create a folder
  named "build", and inside it a file with the name <b>TaskContract.json</b>.
  This file is very important, it's the contract ABI and it's what we use to
  communicate with the methods and variables of our contract (for more
  information about the ABI of a contract check<a href="https://www.quicknode.com/guides/solidity/what-is-an-abi" rel="nofollow" target="_blank">
    this page</a>).
</p>
<p style="text-align: left;">
  In the window of Ganache, we see that the first account doesn't have 100 ether
  like before (now we have 99.98 ether), this is because we spend 0.02 ethers in
  the contract deploy. Truffle takes the first account as default, unless
  otherwise stated.
</p>
<p style="text-align: left;"></p>
<div class="separator" style="clear: both; text-align: center;">
  <a href="https://blogger.googleusercontent.com/img/a/AVvXsEj7z1HTV9Ej6mgLpKOo3P9MNaiUZELBpN6ZgBZOPqpZhi0IBRZ56yVsOk8--I6eDkyoufiYW9GWD35yydsBslt5sjSmim-7eB1SWBCUJWufka6TNpXLAGmCa6WqtadQJNIBOOQmeKmyFVCCkzKhy9gYR4fYHMq6xWxRj4oQb_sRdKwcaVqpxrL4W53q" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="79" data-original-width="1175" height="45" src="https://blogger.googleusercontent.com/img/a/AVvXsEj7z1HTV9Ej6mgLpKOo3P9MNaiUZELBpN6ZgBZOPqpZhi0IBRZ56yVsOk8--I6eDkyoufiYW9GWD35yydsBslt5sjSmim-7eB1SWBCUJWufka6TNpXLAGmCa6WqtadQJNIBOOQmeKmyFVCCkzKhy9gYR4fYHMq6xWxRj4oQb_sRdKwcaVqpxrL4W53q=w640-h45" width="640" /></a>
</div>
<br />
<p></p>
<p style="text-align: left;"></p>
<div class="separator" style="clear: both; text-align: center;">
  <div style="text-align: left;">
    In the terminal, we can see the transaction summary of the displayed
    contract:
  </div>
  <div style="text-align: left;"><br /></div>
  <a href="https://blogger.googleusercontent.com/img/a/AVvXsEgA4_ZUjnFPb-M_BdDC_VF0gXD29kmQAkcKXzq2mUIniwWaEtmrWS-DG8NujRAMQ93DtX1w6Fizu81Kk-_hl-SRnSTw9rJMQh5xXhdrx2nHTcIpKMiPQE7J_p3XfSJgfa95MXj1Bf0nAcvAS4Ndvx3o_wFUGm8Jf9U9Ufg_2unsKPQhQBfDaN3-tJd6" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="364" data-original-width="688" height="211" src="https://blogger.googleusercontent.com/img/a/AVvXsEgA4_ZUjnFPb-M_BdDC_VF0gXD29kmQAkcKXzq2mUIniwWaEtmrWS-DG8NujRAMQ93DtX1w6Fizu81Kk-_hl-SRnSTw9rJMQh5xXhdrx2nHTcIpKMiPQE7J_p3XfSJgfa95MXj1Bf0nAcvAS4Ndvx3o_wFUGm8Jf9U9Ufg_2unsKPQhQBfDaN3-tJd6=w400-h211" width="400" /></a>
</div>
<br /><i>Note: </i>Every time we make a change to the smart contract and want to
test it, we must deploy it again.<br />
<div>
  <i><u><br /></u></i>
</div>
<div>
  <h4 style="text-align: left;">
    <i><u>Interacting with the contract from Console Truffle</u></i>
  </h4>
  <p></p>
  <p style="text-align: left;">
    To access the console, type the command <b>truffle console.</b>
  </p>
  <p style="text-align: left;">
    We need to declare a variable containing the information of the deployed
    contract. We do this as follows:
  </p>
  <div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
    <p style="padding: 10px;">
      <span class="notion-enable-hover" data-reactroot="" data-token-index="0"><span style="font-family: courier;">TasksContract = await TasksContract.depoyed()</span></span>
    </p>
  </div>
  <p style="text-align: left;">
    We use this variable to interacting with the contract from the console. For
    example, <b>TasksContract.address</b>&nbsp;indicates the address where the
    contract is displayed.
  </p>
  <p style="text-align: left;">
    To create a task from the console, we can use the public method named
    "createTask" that we defined earlier in the contract, this
    method&nbsp;receives as argument the title and description of the task:
  </p>
  <p style="text-align: left;">
    <span style="font-family: courier;"><span style="background-color: #f2f2f2;">await TasksContract.createTask("My first task", "I have to do
        something")</span></span>
  </p>
  <p style="text-align: left;">
    <b>Important: </b>Every time we call a public function or variable in the
    smart contract, we are interacting with this contract, every interaction
    with a smart contract is a <b>transaction</b>.&nbsp;So, truffle shows us the
    summary of this transaction in the console (such as gas used, transaction
    ID, etc.):
  </p>
  <p style="text-align: left;"></p>
  <div class="separator" style="clear: both; text-align: center;">
    <a href="https://blogger.googleusercontent.com/img/a/AVvXsEg5Sn-FMnPnfSpdBoDuYULk-oEmQUPZExuS6ReijNG0tUWenLz1OqaoZ-On8sGdX8DjkrvVWG4rDNvK4dWqWsLH6wzQ8GLYPqKhLSzTFHvscjO4-Fpv1uKm_PpKX35ftubbZgwEMoq9wrJLC92g0YCgx1BS5CjrcQ0RNRFC8xXojGNfeRj9dvCa5TKK" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="414" data-original-width="870" height="190" src="https://blogger.googleusercontent.com/img/a/AVvXsEg5Sn-FMnPnfSpdBoDuYULk-oEmQUPZExuS6ReijNG0tUWenLz1OqaoZ-On8sGdX8DjkrvVWG4rDNvK4dWqWsLH6wzQ8GLYPqKhLSzTFHvscjO4-Fpv1uKm_PpKX35ftubbZgwEMoq9wrJLC92g0YCgx1BS5CjrcQ0RNRFC8xXojGNfeRj9dvCa5TKK=w400-h190" width="400" /></a>
  </div>
  <br />Then to see the task we can use the mapping tasks we defined earlier
  (named tasks). Since it's the first task and we define the counter as 0, we
  pass 0 as the key value of the mapping:
  <p></p>
  <p style="text-align: left;">
    <span style="background-color: #f2f2f2; font-family: courier;">await TasksContract.tasks(0)</span>
  </p>
  <p style="text-align: left;">
    This shows us the information (title, description, done, etc.) of the task
    we just created.&nbsp;In this way we see if the function correctly fulfills
    its purpose&nbsp;
  </p>
  <p style="text-align: left;"><br /></p>
  <p style="text-align: left;">
    <span style="font-size: large;"><b><i><u>Done task function</u>&nbsp;</i></b></span><span style="font-size: 20px;">✔️</span>
  </p>
  <p>
    Now we'll create a function that changes the state of a task, from not done
    to done, and vice versa.
  </p>
  <p>
    First we need the id of the task we want to change the status of. When we
    already identify the task within the mapping with its id, we change its
    state to the opposite of what it had, then we'll store the task with the new
    state. The code in Solidity should be something like:
  </p>
  <div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
    <div style="padding: 10px; text-align: left;">
      <span style="font-family: courier;">function toggleDone(uint256 _id) public {<br /></span><span style="font-family: courier;">&nbsp; &nbsp; Task memory _task = tasks[_id];<br /></span><span style="font-family: courier;">&nbsp; &nbsp; _task.done = !_task.done;<br /></span><span style="font-family: courier;">&nbsp; &nbsp; tasks[_id] = _task;<br /></span><span style="font-family: courier;">}&nbsp;</span>
    </div>
  </div>
  <p>
    <i>Note</i>:&nbsp;When we change the state of the task, we are changing the
    state of the smart contract, this is why this action (change the task as
    completed) is a transaction and we have to pay a fee to do it (in case this
    project is deployed in a main network).
  </p>
  <p><br /></p>
  <h4>
    <i><u>Testing Contract with JavaScript&nbsp;</u></i>🔬
  </h4>
  <p>
    We'll test the contract with JavaScript, this gives us the flexibility to
    test multiple functions without having to do it manually from the
    console.&nbsp;Truffle uses the
    <a href="https://mochajs.org/" rel="nofollow" target="_blank">Mocha</a>
    testing framework and
    <a href="https://www.chaijs.com/" rel="nofollow" target="_blank">Chai</a>
    for assertions to provide you with a solid framework from which to write
    your JavaScript tests (for more information about writing test in JS check
    <a href="https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript.html" rel="nofollow" target="_blank">here</a>).
  </p>
  <p>
    The first thing we do is create a .js file inside the test folder,&nbsp;in
    my case I named TaskContract_test.js.&nbsp;
  </p>
  <p>
    We start by declaring a variable that contains the contract information (as
    we did in the implementation file), that's the variable that we'll use to
    interact with the contract inside the file test.
  </p>
  <p>
    <span style="background-color: #f3f3f3; font-family: courier;">const TaskContract = artifacts.require("TaskContract");</span>
  </p>
  <p>
    If you have experience with tests in applications with JS you know about
    describe() , this allows us to group a series of common tests common to
    something we define (for example a function), here the describe() function
    is called contract() and it works the same way, group tests of the same
    contract.&nbsp;
  </p>
  <p>
    When we interact with the contract in the Truffle console, we need to define
    a variable that contains the disployed contract information, this variable
    is the one we use to interact with the contract functions.&nbsp;We define
    this variable within the before() function, which is executed before each
    test (that is, what we are doing here is generating the contract deployment
    before each test):
  </p>
  <div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
    <div style="padding: 10px;">
      <span style="font-family: courier;">const TaskContract = artifacts.require("TaskContract");</span><span style="font-family: courier;"><br /></span>
    </div>
    <div style="padding: 10px;">
      <span style="font-family: courier;">contract("TaskContract", () =&gt;{</span><span style="font-family: courier;">&nbsp;&nbsp;</span>
    </div>
    <div style="padding: 10px;">
      <span style="font-family: courier;"><span>&nbsp;&nbsp; &nbsp;</span>before(async() =&gt; {<br /></span><span style="font-family: courier;">&nbsp; &nbsp; &nbsp; &nbsp; this.taskContract = await
        TaskContract.deployed();<br /></span><span style="font-family: courier;">&nbsp; &nbsp; })</span><span style="font-family: courier;"><br /></span>
    </div>
    <div style="padding: 10px;">
      <span style="font-family: courier;">});</span>
    </div>
  </div>
  <p style="text-align: left;">
    Note: We use "this" before the name variable to use it outside of the before
    function.
  </p>
  <p style="text-align: left;">
    For each test inside the "contract()" function we use the "it" notation,
    where we indicate:
  </p>
  <p>it("test name" ; function to do the test()=&gt;{});</p>
  <p>
    We start by testing if the contract deployment is successful, we can verify
    this by checking if the contract address is different from null, undefined,
    0x0 or an empty string.
  </p>
  <div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
    <div style="padding: 10px;">
      <p style="padding: 10px;">
        <span style="font-family: courier;">it("contract deployment successfully", async() =&gt; {<br /></span><span style="font-family: courier;">&nbsp; &nbsp;address = await this.taskContract.address;</span><span style="font-family: courier;"><br /></span><span style="font-family: courier;">&nbsp; &nbsp;assert.notEqual(address, null);<br /></span><span style="font-family: courier;">&nbsp; &nbsp;assert.notEqual(address, undefined);<br /></span><span style="font-family: courier;">&nbsp; &nbsp;assert.notEqual(address, 0x0);<br /></span><span style="font-family: courier;">&nbsp; &nbsp;assert.notEqual(address, "");<br /></span><span style="font-family: courier;">});</span>
      </p>
    </div>
  </div>
  <p style="text-align: left;">
    To run the tests, we type the command <b>truffle test</b> in the
    terminal.&nbsp;If the contract was successfully deployed, we would see a
    green tick in the terminal next to the test name.
  </p>
  <p style="text-align: left;">
    Ok, but now, how to test the creation of a task or the toggle done?
  </p>
  <p>
    We could use
    <a href="https://docs.soliditylang.org/en/v0.8.12/contracts.html#events" rel="nofollow" target="_blank">events</a>. Basically, we use events to signal that something has happened. In our
    case, we can emit an event when a task is created.&nbsp;For this case we'll
    create an event that contains all the parameters of the Task data structure
    that we created earlier:
  </p>
  <div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
    <div style="padding: 10px; text-align: left;">
      <p style="padding: 10px; text-align: left;">
        <span style="font-family: courier;">event TaskCreated(<br />&nbsp; &nbsp; uint256 id,<br />&nbsp; &nbsp;
          string title,<br />&nbsp; &nbsp; string description,<br />&nbsp;
          &nbsp; bool done,<br />&nbsp; &nbsp; uint256 createdAt<br />);</span>
      </p>
    </div>
  </div>
  <p>Note that the syntax is like a function, not a struct.&nbsp;</p>
  <p>
    Then, the moment a task is created, we emit this event with the emit
    keyword, passing the values of the created task as arguments:
  </p>
  <div style="background-color: #f2f2f2; padding: 10px; text-align: left;">
    <div style="padding: 10px; text-align: left;">
      <div style="padding: 10px; text-align: left;">
        <span style="font-family: courier;">function createTask(string memory _title, string memory _description)
          public {<br />&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<br />&nbsp;
          &nbsp;tasks[taskCounter] = Task(<br />&nbsp; &nbsp; &nbsp; &nbsp;
          taskCounter,<br />&nbsp; &nbsp; &nbsp; &nbsp; _title,<br />&nbsp;
          &nbsp; &nbsp; &nbsp; _description,<br />&nbsp; &nbsp; &nbsp; &nbsp;
          false,<br />&nbsp; &nbsp; &nbsp; &nbsp; block.timestamp<br />&nbsp;
          &nbsp; );</span>
      </div>
      <div style="padding: 10px; text-align: left;">
        <span style="font-family: courier;">&nbsp; &nbsp; <b>emit</b> TaskCreated(taskCounter, _title,
          _description, false, block.timestamp);</span>
      </div>
      <div style="padding: 10px; text-align: left;">
        <span style="font-family: courier;">&nbsp; &nbsp; taskCounter++;<br />}</span>
      </div>
    </div>
  </div>
  <p>
    The events are stored in the logs[] array of the transaction,&nbsp;If we
    deploy the contract again and create a new task, we can see in this
    transaction that the logs part contains an object:
  </p>
  <p></p>
  <div class="separator" style="clear: both; text-align: center;">
    <div class="separator" style="clear: both; text-align: center;">
      <a href="https://blogger.googleusercontent.com/img/a/AVvXsEgHqiR0iejq5V9xbInkqufnc1Ul8hdyB1YLQgE9gqzp_-_NjVkUtmHbV0XHRibzcJI88F-ebLQnbr4-sPdkeruoodkRFEgREiaKE2cfmn6W3eqjq9d6DVUjV3IYkvH8KweRCUH5BkzB7PqwwiRml_Hmvpb6tijEv7z01R20vjfpmS1IjtgaOJrlHII1" style="margin-left: 1em; margin-right: 1em;"><img alt="" data-original-height="618" data-original-width="991" height="250" src="https://blogger.googleusercontent.com/img/a/AVvXsEgHqiR0iejq5V9xbInkqufnc1Ul8hdyB1YLQgE9gqzp_-_NjVkUtmHbV0XHRibzcJI88F-ebLQnbr4-sPdkeruoodkRFEgREiaKE2cfmn6W3eqjq9d6DVUjV3IYkvH8KweRCUH5BkzB7PqwwiRml_Hmvpb6tijEv7z01R20vjfpmS1IjtgaOJrlHII1=w400-h250" width="400" /></a>
    </div>
  </div>
  <p></p>
  <p>
    In fact, we can see that the event is "Task Created", which is the event we
    just created.&nbsp;The results or values of this event are in the "args"
    (marked with the yellow arrow).&nbsp;
  </p>
  <p><br /></p>
  <p>CONTINUAR - FALTA TEST DE CREATED TASK Y TEST DE TOGGLE DONE</p>
  <p><br /></p>
  <h3 style="text-align: left;">
    <span style="font-size: 28px;"><span face="-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif">Frontend&nbsp;</span>🏠</span>
  </h3>
  <p>Ok, we have the smart contract and we already tested that it works as it should.&nbsp;Now we need to create an interface so that people can interact with the notes app in their browser without necessarily having a technical understanding of what's going on (in terms of the smarts contracts).</p><p><br /></p>
  <p><br /></p>
  <p><br /></p>
</div>
