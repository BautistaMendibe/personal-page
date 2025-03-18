---
title: "Decentralized Notes Application (DApp) with Solidity and Trufffle - Step by Step 📝"
date: "27/05/2022"
img: "/blog/typewrite.jpg"
---

<style>
  /* Evitar el desbordamiento horizontal */
  body {
    overflow-x: hidden;
  }

  /* Asegurar que los contenedores no generen scroll lateral */
  div, p, img, iframe {
    max-width: 100%;
    box-sizing: border-box;
  }

  /* Hacer que las imágenes sean más pequeñas en pantallas pequeñas */
  img {
    max-width: 100%;
    height: auto;
  }
  
  @media (max-width: 768px) {
    img {
      max-width: 80%;
      display: block;
      margin: 0 auto;
    }
  }
</style>

<br />

<div class="separator" style="clear: both; text-align: center;">
  <a href="https://blogger.googleusercontent.com/img/a/AVvXsEgo2Vv3v-XA4qkn1r_Bxgopv2lb8INy4ymInd2XFppzG840R0aUEdP6uJxgQv1blIaJicouWoNtZfW8mai5pOcwNOFnWIzf4eNJ9EKfdzgUrf94K6pf6OjZc6E7Yl0AvqrH4ZQKZjE5gyP0jg3HnqGHafjh0cz8FEs45DbRlChcDPSJ7uil9eADDsit=s480">
    <img border="0" data-original-height="360" data-original-width="480" src="https://blogger.googleusercontent.com/img/a/AVvXsEgo2Vv3v-XA4qkn1r_Bxgopv2lb8INy4ymInd2XFppzG840R0aUEdP6uJxgQv1blIaJicouWoNtZfW8mai5pOcwNOFnWIzf4eNJ9EKfdzgUrf94K6pf6OjZc6E7Yl0AvqrH4ZQKZjE5gyP0jg3HnqGHafjh0cz8FEs45DbRlChcDPSJ7uil9eADDsit=w640-h499" />
  </a>
</div>

<br />

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
  <iframe allowfullscreen class="giphy-embed" frameborder="0" height="270" src="https://giphy.com/embed/mdbUGtaJ93ehTzLjvO" width="480"></iframe>
</div>

<p><b>Let's start!</b></p>

<p>
  To make this project we'll use
  <a href="https://trufflesuite.com/" rel="nofollow" target="_blank">Truffle</a>
  as framework, although
  <a href="https://hardhat.org/" rel="nofollow" target="_blank">Hardhat</a> can
  be used as well.&nbsp;We'll use
  <a href="https://www.npmjs.com/package/ganache-cli" rel="nofollow" target="_blank">Ganache</a> to create a local blockchain to deploy and test our code.
</p>

<p>
  We'll start the project with the command <b>truffle init</b> inside the folder
  we created for the project. This will create a small initial structure that
  we'll use to create the project.
</p>

<p>
  We'll begin by creating a contract called <b>TasksContract.sol</b> that we'll
  use to manage the notes.
</p>

<p>
  For this, what we'll&nbsp;do is to create a new data structure that represents
  each task, Solidity facilitates this to us with the <b>struct</b> data type.
  Each task will contain an id, a title, a description, a variable indicating
  whether it is done or not and a creation date.
</p>

<div class="separator" style="clear: both; text-align: center;">
  <a href="https://blogger.googleusercontent.com/img/a/AVvXsEj93O0ZV_q_EMlaPTGGYYLPGnc-74_XbYLkVOzCNPfQXJs-VNpBg0lROkTBEybbWRwxNGLdJylahr3Ou5bAyLH8mAAQntPbVAGreX0qGpbFUaWmn0atrgNJV2hWHAcllNg1KRg0sgDCPgICEQgZB_GqmHU9o5mwtJv8cXhtqyBkdNL1fMBDLjfsY80p">
    <img alt="" data-original-height="716" data-original-width="1187" src="https://blogger.googleusercontent.com/img/a/AVvXsEj93O0ZV_q_EMlaPTGGYYLPGnc-74_XbYLkVOzCNPfQXJs-VNpBg0lROkTBEybbWRwxNGLdJylahr3Ou5bAyLH8mAAQntPbVAGreX0qGpbFUaWmn0atrgNJV2hWHAcllNg1KRg0sgDCPgICEQgZB_GqmHU9o5mwtJv8cXhtqyBkdNL1fMBDLjfsY80p" />
  </a>
</div>

<p>
  We'll use the variable "createdAt" to store the date and time when the task
  was created. Despite it is a time variable, Solidity takes it as an integer
  (since from that integer it calculates the date and time, we will see it
  later).
</p>

