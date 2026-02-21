import TerminalLayout from '@/layouts/terminal-layout'
import { Terminal } from '@/components/terminal/terminal'
import { useTerminalSocket } from '@/hooks/use-terminal-socket'
import Status from './components/shared/Status'

function App() {
  const { data, send, status } = useTerminalSocket('ws://localhost:3001/ws')

  return (
    <TerminalLayout>
      <div className="flex flex-1 flex-col h-full min-h-0">
        <Terminal data={data} onData={send} />
        <Status status={status} />
      </div>
    </TerminalLayout>
  )
}

export default App
