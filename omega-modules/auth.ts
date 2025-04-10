export function authenticate(token: string): boolean {
    // Example of a more flexible authentication mechanism
    const validTokens = ['valid-token', 'another-valid-token']; // This could be replaced with a dynamic source
    return validTokens.includes(token);
}
