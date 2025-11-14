import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

function MeetingSetup({ setIsSetupComplete }: {setIsSetupComplete: (value: boolean) => void}) {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

    const call = useCall();

    if(!call){
        throw new Error('useCall must be used within streamCall component')
    }

    useEffect(() => {
      if(isMicCamToggledOn){
        call?.camera.disable();
        call?.microphone.disable();
      }else{
        call?.camera.enable();
        call?.microphone.enable();
      }
    }, [isMicCamToggledOn,call?.camera, call?.microphone])
    
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <VideoPreview className='w-[500px]' />
        <div>
            <label className='flex items-center justify-center gap-2 font-medium'>
                <input type="checkbox" checked={isMicCamToggledOn} onChange={(e) => setIsMicCamToggledOn(e.target.checked)} />
                Join with mic and camera off
            </label>
            <DeviceSettings />
        </div>
        <Button className='rounded-md bg-green-500 text-white px-4 py-2.5' onClick={() => {
            call.join();
            setIsSetupComplete(true)}}>
            Join
        </Button>
    </div>
  )
}

export default MeetingSetup