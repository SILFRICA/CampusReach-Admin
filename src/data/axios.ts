const apiUrl = (environment: string) => {
    if (environment === 'local') {
        return "http://localhost:8000";
    }

    return "https://test-api.silfrica.com";
}
export default apiUrl;