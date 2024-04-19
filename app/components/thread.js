export default function Thread({user, index, threads}) {
    return (
      <div>
        <div className="text-4xl mb-4">{user.name}</div>
        {threads.map((thread, threadIndex) => (
            <div 
                className={`flex items-center gap-2 ${thread.sender ? 'justify-start' : 'justify-end'}`} 
                key={threadIndex}
            >
                {thread.sender ? null : <div className="py-1 px-2 bg-gray-900 text-white rounded-lg">{thread.message}</div>}
                <img 
                    className="w-10" 
                    src={thread.sender? `/images/pp${index + 1}.png` : `/images/pp0.png`}
                    alt={`Profile Picture`}
                />
                {thread.sender ? <div className="py-1 px-2 bg-gray-200 rounded-lg">{thread.message}</div> : null}
            </div>
            ))}
      </div>
    )
}
