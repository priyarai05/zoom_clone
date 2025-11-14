'use client'

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Table = ({title, description}: { title: string, description: string}) => (
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-[105px]'>{title}:</h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{description}</h1>
  </div>
)

function PersonalRoom() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const meetingid = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingid}?personal=true`

  const { call } = useGetCallById(meetingid!);
  const client = useStreamVideoClient();

  const startRoom = async () => {
    if(!client || !user) return;

    if(!call){
      const newCall = client.call('default',meetingid!)
      await newCall.getOrCreate({
        data: {
            starts_at: new Date().toISOString(),
        }
      })
    }
    router.push(`/meeting/${meetingid}?personal=true`)
  }

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
        <h1 className='text-3xl font-bold'>
            Personal Room
        </h1>
        <div className='flex flex-col gap-8 w-full xl:max-w-[900px]'>
          <Table title='Topic' description={`${user?.username}'s meeting room`} />
          <Table title='Meeting Id' description={meetingid!} />
          <Table title='Invite Link' description={meetingLink} />
        </div>
        <div className='flex gap-5'>
          <Button className='bg-blue-1' onClick={startRoom}>Start Meeting</Button>
          <Button className='bg-dark-3' onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });}}>
            <Image src='/icons/copy.svg' alt='feature' width={20} height={20} />&nbsp;
            Copy Invitation</Button>
        </div>
    </section>
  )
}

export default PersonalRoom