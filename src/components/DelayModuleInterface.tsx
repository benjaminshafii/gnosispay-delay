import { useState } from 'react';

import { getDelayModule } from './gnosis-pay.js';
import GnosisPayErc20Transfer from './GnosisPayErc20Transfer';

export function DelayModuleInterface() {
  const [address, setAddress] = useState('');
  const [delayModAddress, setDelayModAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const delayMod = await getDelayModule(address);
      setDelayModAddress(delayMod || 'Not found');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Gnosis Safe Delay Module Finder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Gnosis Safe Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <button type="submit">Find Delay Module</button>
      </form>
      <div>
        <p>Delay Module Address: {delayModAddress}</p>
      </div>
      {delayModAddress && (
        <GnosisPayErc20Transfer delayModAddress={delayModAddress} />
      )}
    </div>
  );
}
