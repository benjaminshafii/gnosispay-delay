# Gnosis Pay Delay Module Demo

This repository contains a demonstration of how to interact with the Gnosis Pay Delay Module using a React application. The Gnosis Pay Delay Module is a smart contract that adds a delay to transactions.


## How to Run

```bash
npm install
npm dev
```


## Overview

The core functionality revolves around executing ERC20 token transfers through the Gnosis Pay Delay Module. This is achieved by first creating an unsigned transaction, queuing it in the delay module, and then executing it after a predefined delay period.

## Key Components

### Delay Module Detection and Interaction

The `gnosis-pay.js` file includes utility functions for detecting and interacting with the delay module in a Gnosis Safe. It identifies the delay module by its bytecode and retrieves its address for further interactions.

```javascript:src/components/gnosis-pay.js
export async function getDelayModule(address) {
  ...
  const delayMod = modules.find((module) =>
    isDelayModule(module.bytecode)
  )?.address;
  return delayMod;
}
```

### Executing ERC20 Transfers

The `GnosisPayErc20Transfer.jsx` component demonstrates how to execute an ERC20 transfer through the delay module. It involves creating an unsigned transaction data, queuing the transaction in the delay module, waiting for the delay period to elapse, and finally executing the transaction.

```javascript:src/components/GnosisPayErc20Transfer.jsx
const makeErc20TransferViaDelayModule = async () => {
  ...
  // Queue the transaction
  await queueWriteContract({
    address: delayModAddress,
    abi: DELAY_MOD_ABI,
    functionName: 'execTransactionFromModule',
    args: [erc20Address, 0, unsignedTxData, 0],
  });

  // Wait for the delay period
  await delay();

  // Execute the transaction
  await execWriteContract({
    address: delayModAddress,
    abi: DELAY_MOD_ABI,
    functionName: 'executeNextTx',
    args: [erc20Address, 0, unsignedTxData, 0],
  });
};
```

## Usage

To interact with the Gnosis Pay Delay Module:

1. Deploy a Gnosis Safe and set up the Delay Module.
2. Use the `getDelayModule` function to retrieve the address of the delay module associated with your Gnosis Safe.
3. In the `GnosisPayErc20Transfer` component, specify the recipient and amount for the ERC20 transfer.
4. Call the `makeErc20TransferViaDelayModule` function to queue and execute the transfer through the delay module.

## Conclusion

This repository showcases a practical example of enhancing transaction security in smart contracts by utilizing the Gnosis Pay Delay Module. By integrating these components into your project, you can leverage the added security layer provided by transaction delays.