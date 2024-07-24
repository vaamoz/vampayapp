export const getIpAddress = async () => {
  try {
    const data = await fetch("https://api.ipify.org?format=json");
    // const data = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
    const address = await data.json();
    console.log(address?.ip,"address==>")
    return address?.ip;
  } catch (error) {
    return "Error! Could not retrieve IP Address.";
  }
};
