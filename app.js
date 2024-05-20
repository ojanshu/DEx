const express= require("express");

const app = express();
app.use(express.json());

let ETH_BALANCE = 200;
let USDC_BALANCE = 700000; //this results in impermanent loss


app.post("/add-liquidity", (req,res) => {})

app.post("/buy-asset", (req,res) => {
    const quantity = req.body.quantity;
    const updatedEthQuantity = ETH_BALANCE - quantity;
    const updatedUsdcBalance = ETH_BALANCE * USDC_BALANCE / updatedEthQuantity;
    const paidAmount = updatedUsdcBalance - USDC_BALANCE;

    ETH_BALANCE = updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;

    res.json({message: `You paid ${paidAmount} USDC for ${quantity} ETH`});
})

app.post("/sell-asset", (req,res) => {
    const quantity = req.body.quantity;
    // const updatedEthQuantity = ETH_BALANCE + quantity;
    // const updatedUsdcBalance = (ETH_BALANCE * USDC_BALANCE) / updatedEthQuantity;
    // const gottenUsdc = USDC_BALANCE - updatedUsdcBalance;

    // ETH_BALANCE = updatedEthQuantity;
    // USDC_BALANCE = updatedUsdcBalance;

    // console.log(`Initial ETH_BALANCE: ${ETH_BALANCE}`);
    // console.log(`Initial USDC_BALANCE: ${USDC_BALANCE}`);
    // console.log(`Quantity of ETH to sell: ${quantity}`);

    const updatedEthQuantity = ETH_BALANCE - quantity; // Subtract sold ETH quantity from the balance
    // console.log(`Updated ETH quantity: ${updatedEthQuantity}`);

    const updatedUsdcBalance = USDC_BALANCE + (quantity * (USDC_BALANCE / ETH_BALANCE)); // Calculate the new USDC balance
    // console.log(`Updated USDC balance: ${updatedUsdcBalance}`);

    const gottenUsdc = updatedUsdcBalance - USDC_BALANCE; // Calculate the USDC received
    // console.log(`USDC received: ${gottenUsdc}`);

    ETH_BALANCE = updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;

    // console.log(`New ETH_BALANCE: ${ETH_BALANCE}`);
    // console.log(`New USDC_BALANCE: ${USDC_BALANCE}`);

    res.json({message: `You got ${gottenUsdc} USDC for ${quantity} ETH`});

    // res.json({message: `You got ${gottenUsdc} USDC for ${quantity} ETH`});
})

app.post("/quote", (req,res) => {})

const port = 3000;

app.listen( port, () => console.log(`server is up and running on port 3k`));