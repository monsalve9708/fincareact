import {Alert, Button, Stack, TextField} from "@mui/material";
import {AccountCircle, Visibility, VisibilityOff} from "@mui/icons-material";
import './login.scss'
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {useState} from "react";
import LoginService from "../../service/loginService";

const Login = () => {
    const [visibility, setVisibility] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [sw, setSw] = useState(false);
    const [menssage, setMenssage] = useState("");

    const handleVisibility = () => {
        setVisibility(!visibility);
    }
    const handleUser = (e) =>{
        setUser(e.target.value);
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }
    const handleLogin = (e) =>{
        setSw(false);
        e.preventDefault();
        setError(false);
        LoginService({user,password})
            .then(response => {
                if (!response.ok){
                    setSw(true);
                }else {
                    window.location.href = '/reserva';
                }
                return response.json();
            })
            .then(result => {
                if (sw) {
                    window.sessionStorage.setItem("token",result.token);

                }else {
                    setMenssage(result.error);
                }
            })
            .catch(e => {
                setError(true);
                console.error(e);
            })
    }
    return(
        < >
            { error ?
                <Stack sx={{ width: '100%', my:3}} spacing={2}>
                <Alert severity="error">Opps hubo un error, intenta nuevamente o comunicate con tu administrador</Alert>
            </Stack> : null}
            <div className="tittle">
            <span>Finca Giraldo</span>
            </div>
        <div className="login">
            <form>
                <Box >
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2 }} />
                    <TextField id="input-with-sx" label="Usuario" variant="standard"
                               value={user}
                               onChange={handleUser}
                    />
                </Box>
                <Box>
                    <TextField
                        id="standard-password-input"
                        label="Contraseña"
                        type={visibility ? "text" :"Password"}
                        autoComplete="current-password"
                        variant="standard"
                        value={password}
                        onChange={handlePassword}
                    />
                    <IconButton sx={{ color: 'action.active', my: 1 }} onClick={handleVisibility}>
                        {visibility ? <Visibility  />: <VisibilityOff/>}
                    </IconButton>
                </Box>
                { sw ? <div className="alertLogin">
                    <span>{menssage}</span>
                </div> : null}

                <Button variant="contained" disableElevation sx={{my:5, width:200}} type="submit" onClick={handleLogin}>
                    Iniciar Sesion
                </Button>
            </form>
        </div>
        </>
    )
}

export default Login;