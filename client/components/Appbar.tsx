"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

const Appbar = () => {
    const router = useRouter();
    const token = localStorage.getItem("token"); // Get the token from localStorage

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from localStorage
        router.push("/login"); // Redirect to login page
    };

    return (
        <div className="flex border-b justify-between p-4">
            <Link href='/'>
                <div className="flex flex-col justify-center text-2xl font-extrabold">
                    Zapier
                </div>
            </Link>
            <div className="flex">
                <ModeToggle />
                {token ? (
                    // If token exists, show Logout button
                    <Button
                        className="font-bold rounded-2xl px-6 ml-2"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                ) : (
                    // If token doesn't exist, show Login and Signup buttons
                    <>
                        <div className="px-2">
                            <Button
                                className="font-bold rounded-2xl px-6"
                                onClick={() => {
                                    router.push("/login");
                                }}
                            >
                                Login
                            </Button>
                        </div>
                        <Button
                            className="bg-[#ff4f01] hover:bg-[#ff2b01] transition-all duration-200 text-white font-bold rounded-2xl px-6"
                            onClick={() => {
                                router.push("/signup");
                            }}
                        >
                            Signup
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Appbar;
