const Status = ({ status }: { status: string }) => {
    return (
        <div className="absolute bottom-3">
            {status !== 'open' && (
                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
                    {status === 'connecting' ? 'Connecting to terminal backend...' : 'Connection closed. Is the server running?'}
                </div>
            )}
        </div>
    )
}

export default Status