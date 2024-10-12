import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import passport from 'passport';
import { localStrategy } from './libs/passport-local';
import { bearerStrategy } from './libs/passport-bearer';
import { jwtStrategy } from './libs/passport-jwt';
import { localStrategyJWT } from './libs/passport-local-jwt';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

passport.use(localStrategy);

passport.use('local-jwt', localStrategyJWT)

passport.use(bearerStrategy);

passport.use(jwtStrategy);

server.use(passport.initialize());

server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

server.listen(process.env.PORT, ()=>{
    console.log(`Aplicação rodando nesta url: http://localhost:${process.env.PORT}/todo`)
});

