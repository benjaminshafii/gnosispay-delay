import { useAccount } from 'wagmi';
import { Account } from './components/Account';
import { Connect } from './components/Connect';
import { DelayModuleInterface } from './components/DelayModuleInterface';

export default function App() {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected ? <Account /> : <Connect />}

      {isConnected && <DelayModuleInterface />}
    </>
  );
}
