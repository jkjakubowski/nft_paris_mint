/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react"
import { css } from "@emotion/react"
import video from "./video.mp4"
import { ethers } from "ethers"
// import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js"
import "./App.css"
import NFTParisArtifact from "./abi/NFTParis.json"

const style = css`
  color: #5835e9;
  margin-top: 30px;
  font-size: 5rem;
  @media (max-width: 420px) {
    font-size: 2rem;
  }
`
const NFTPaddress = "0xe669a996d30bbc001006e071c3043d715229b03a"

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [connButtonText, setConnButtonText] = useState("Connect Wallet")

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0])
          setConnButtonText("Wallet Connected")
        })
    } else {
      setErrorMessage("Please install MetaMask")
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount)
    updateEthers()
  }

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    let tempSigner = tempProvider.getSigner()
    setSigner(tempSigner)

    let tempContract = new ethers.Contract(
      NFTPaddress,
      NFTParisArtifact,
      tempSigner
    )
    setContract(tempContract)
  }

  const safeMint = async () => {
    await contract.safeMint(0, "0x00")
  }

  return (
    <div className="App">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <p css={style}>SPECIAL GIFT</p>
        <div
          css={css`
            width: 50vw;
            @media (max-width: 420px) {
              width: 80vw;
            }
          `}
        >
          <h2
            css={css`
              font-size: 1.5rem;
              color: #ffffff;
              margin-top: 30px;
              margin-bottom: 30px;
              line-height: 1.5;
              @media (max-width: 420px) {
                font-size: 1rem;
                line-height: 1.5rem;
              }
            `}
          >
            Thanks for attending the first edition of NFT Paris! Here's a proof
            of attendance NFT, made by {" "}
            <a
              css={css`
                color: #38e5fc;
              `}
              href="https://obvious-art.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Obvious
            </a>
            .
          </h2>

          <div
            css={css`
              background-color: #5835e9;
              border: none;
              cursor: pointer;
              color: white;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin-bottom: 30px;
              margin-right: 10px;
              :hover {
                background-color: #27166f;
              }
              ${defaultAccount &&
              `background-color: #3d3659;
              pointer-events: none;`}
            `}
            onClick={connectWalletHandler}
            disabled={defaultAccount}
          >
            {connButtonText}
          </div>
          {defaultAccount && (
            <div
              css={css`
                background-color: #5835e9;
                border: none;
                cursor: pointer;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin-bottom: 30px;
                margin-left: 10px;
                :hover {
                  background-color: #27166f;
                }
              `}
              onClick={safeMint}
            >
              Mint
            </div>
          )}
          {errorMessage && (
            <p
              css={css`
                color: red;
                margin-bottom: 10px;
              `}
            >
              The minting is over, or you already have minted one. Please
              contact the NFT Paris team.
              {errorMessage}
            </p>
          )}
        </div>
        <div
          css={css`
            display: block;
            border: 1px solid #fff;
          `}
        >
          <video controls={false} width="300" autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}

export default App
