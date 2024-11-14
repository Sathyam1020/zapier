"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Feature } from "./Feature";
import { useEffect, useState } from "react";

export const Hero = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if token is present in localStorage
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set to true if token exists
    }, []);

    return (
        <div className="overflow-hidden p-4">
            <div className="flex justify-center">
                <div className="text-7xl font-bold text-center pt-8 max-w-10/12">
                    Automate without any limits
                </div>
            </div>
            <div className="flex justify-center pt-2">
                <div className="text-xl font-bold text-center pt-8 max-w-2xl">
                    AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
                </div>
            </div>

            <div className="flex justify-center pt-4">
                <div className="flex">
                    {isLoggedIn ? (
                        <Button
                            className="bg-[#ff4f01] hover:bg-[#ff2b01] transition-all duration-200 text-white font-bold rounded-2xl px-6"
                            onClick={() => router.push("/dashboard")}
                        >
                            Go to Dashboard
                        </Button>
                    ) : (
                        <Button
                            className="bg-[#ff4f01] hover:bg-[#ff2b01] transition-all duration-200 text-white font-bold rounded-2xl px-6"
                            onClick={() => router.push("/signup")}
                        >
                            Get Started Free
                        </Button>
                    )}
                    <div className="pl-4">
                        <Button
                            className="font-bold rounded-2xl px-6"
                            onClick={() => router.push("/contact-sales")}
                        >
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </div>

            <div className="hidden md:block lg:block">
                <div className="flex justify-center pt-4">
                    <Feature title="Free Forever" subtitle="for core features" />
                    <Feature title="More apps" subtitle="than any other platforms" />
                    <Feature title="Cutting Edge" subtitle="AI Features" />
                </div>
            </div>
        </div>
    );
};
