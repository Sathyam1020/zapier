
'use client'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL, HOOKS_URL } from '../config'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        const fetchZaps = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/v1/zap`, {
                    headers: {
                        "Authorization": localStorage.getItem("token") || ""
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setZaps(data.zaps);
                } else {
                    console.error("Failed to fetch zaps:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching zaps:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchZaps();
    }, []);

    return {
        loading,
        zaps
    };
}

const Dashboard = () => {
    const { loading, zaps } = useZaps();
    const router = useRouter();
  return (
    <div className=''>
        <div className='mb-10'>
            {
                zaps.length > 0 ? <div className='w-full text-center font-semibold mb-10'>
                    You have {zaps.length} {zaps.length > 1 ? "zaps" : "zap"} active.
                </div> : <div className='h-full  flex justify-center items-center'>
                    <Button onClick={() => router.push('dashboard/zap/create')}>Create your first zap</Button>
                </div>
            }
        </div>
        {loading ? "Loading..." : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}
    </div>
  )
}

export default Dashboard;

function ZapTable({ zaps }: {zaps: Zap[]}) {
    const router = useRouter();

    return (
        <div className='w-full px-10'>
            <Table>
                <TableCaption>A list of your recent zaps.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Id</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Webhook URL</TableHead>
                        <TableHead>Go</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                        {
                            zaps.map((zap, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                    <div className="flex overflow-x-scroll scrollbar-none">
                                        <img
                                        alt="image"
                                        src={zap.trigger.type.image}
                                        className="w-[30px] h-[30px] rounded-full"
                                        />
                                        {zap.actions.slice(0, 3).map((x, index) => (
                                        <img
                                            key={index}
                                            alt="image"
                                            src={x.type.image}
                                            className="w-[30px] h-[30px] rounded-full"
                                        />
                                        ))}
                                        {zap.actions.length > 3 && (
                                        <div className="flex">
                                            {zap.actions.slice(3).map((x, index) => (
                                            <img
                                                key={index}
                                                alt="image"
                                                src={x.type.image}
                                                className="w-[30px] h-[30px] rounded-full"
                                            />
                                            ))}
                                        </div>
                                        )}
                                    </div>
                                    </TableCell>
                                    <TableCell>
                                        {zap.id}
                                    </TableCell>
                                    <TableCell>
                                        March 16 2005
                                    </TableCell>
                                    <TableCell>
                                        {`${HOOKS_URL}/hooks/catch/1/${zap.id}`}
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => (
                                            router.push("/zap/" + zap.id)
                                        )}>
                                            Go
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                </TableBody>
            </Table>
        </div>
    )
}
