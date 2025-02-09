"use client";

import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
                    <h1 className="text-6xl font-bold mb-4">Oops!</h1>
                    <h2 className="text-2xl mb-4">Something went wrong</h2>
                    <p className="text-muted-foreground mb-8 text-center max-w-md">
                        We&#39re sorry, but an unexpected error occurred.{" "}
                    </p>
                    <div className="space-x-4">
                        <button onClick={() => reset()}>Try again</button>
                        <button className="btn btn-outline">
                            <Link href="/">Go back home</Link>
                        </button>
                    </div>
                    {process.env.NODE_ENV === "development" && (
                        <div className="mt-8 p-4 bg-muted rounded-md">
                            <h3 className="text-lg font-semibold mb-2">
                                Error details:
                            </h3>
                            <p className="font-mono text-sm">{error.message}</p>
                        </div>
                    )}
                </div>
            </body>
        </html>
    );
}
