export function checkHeaders(req: Request) {
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        throw new Error("Error: Missing Svix headers");
    }

    return { svix_id, svix_signature, svix_timestamp };
}
