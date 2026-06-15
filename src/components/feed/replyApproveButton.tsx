"use client"

import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { isReplyApproved, updataReplyApproveActionById } from '@/actions/user/userAction'
import { Check } from 'lucide-react'

interface props {
    replyId: string,
    initialApproved: boolean
}
export default function ReplyApproveButton({ replyId, initialApproved }: props) {
    const [isApproved, setIsApproved] = useState(initialApproved);
    const [isPending, startTransition] = useTransition();
    const handleToggle = () => {
        startTransition(async () => {
            const newState = !isApproved;
            setIsApproved(isApproved);

            try {
                const result = await updataReplyApproveActionById(replyId);
                if (!result.success) {
                    setIsApproved(!newState);
                }
            }
            catch (e) {
                console.log(e);
                setIsApproved(!newState);
            }
        })
    }
    return (
        <div>
            <Button
                onClick={handleToggle}
                disabled={isPending}
                variant={isApproved ? "default" : "outline"}
                className="flex gap-2"
            >
                {/* 3. Change text/UI based on the current state */}
                {isApproved ? (
                    <> <Check className="w-4 h-4" /> Approved </>
                ) : (
                    "Approve"
                )}
            </Button>
        </div>
    )
}
