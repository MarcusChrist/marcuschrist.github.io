import { authAmadeus } from "../../api/getInfo";

export const getAccess = async () => {

    const auth = JSON.parse(localStorage.getItem("Auth") || "");
    
    if ((new Date().getTime() / 1000) > auth["expires_in"]) {
      authAmadeus().
        then((response) => {
          return response.json();
      }).then((data) => {
        data["expires_in"] = (new Date().getTime() / 1000) + data["expires_in"];
        localStorage.setItem("Auth", JSON.stringify(data));
        console.log("Ny Nyckel!");
        console.log(data);
        return "0" + data["access_token"];
      }).catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        //enqueueSnackbar("Error", { variant: "error" });
      });
    } else {
      console.log(auth);
      console.log("ingen ny nyckel..");
    };
    
    return "1" + auth["access_token"];
  };