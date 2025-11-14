import React from 'react'
import { Button } from './ui/button'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation';

function EndCallButton() {
    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const router = useRouter();

    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

    if(!isMeetingOwner) return;

  return (
    <Button onClick={async () => {
        await call.endCall();
        router.push('/')
    }} className='bg-red-500'>
        End Meeting
    </Button>
  )
}

export default EndCallButton