import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function LoginGoogle({ onLogin }) { 
    return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
        onLogin(decoded);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}

export default LoginGoogle;