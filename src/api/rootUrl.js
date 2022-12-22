const rootUrl = () => {
    //production 
    const url = "https://landing-cost-server-1.chibuike.net"
    //development 
    const developmentUrl = "http://localhost:5001"
    return developmentUrl
}
export { rootUrl }