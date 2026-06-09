
import express from 'express';
import rotaCargo from './Routes/rotaCargo.js';
import cors from 'cors';

const localhost = '0.0.0.0';
const port = 5000;
const app = express();

app.use(cors({
    origin: `http://localhost:5173`
    
}));

app.use(express.json());
app.use("/cargos", rotaCargo);

app.listen(port, localhost, () => console.log(`API Executando na porta ${port}`));