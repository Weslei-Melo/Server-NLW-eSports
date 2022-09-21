// const express = require("express");
import express from "express"
import {PrismaClient} from '@prisma/client'
import cors from 'cors'
import { covertHoursToMinutes } from "./utils/converte-hour-to-minutes";
import { covertMinutesToHours } from "./utils/converte-minutes -to-hours";
// import './utils/converte-hour-to-minutes'

// console.log("Hello World!")

const app = express();

app.use(cors()) // todoas front end consegue acessar nosso back end
app.use(express.json())
const  prisma = new PrismaClient();
//Rotas
//GET, POST, PUT, PATCH, DELETE

//buscar game
app.get('/games', async (request, response)=>{
   const games = await prisma.game.findMany({
      include:{
         _count: {
            select: {
               ads: true,
            }
         }
      }
   })

   return response.json(games)
})

//criar Ad
app.post('/games/:gameId/ads',  async (request, response)=>{
   const gameId = request.params.gameId;

   const body = request.body;


   const ad = await prisma.ad.create({
      data: {
         gameId,
         name : body.name,
         yearsPlaying : body.yearsPlaying,
         discord: body.discord,
         weekDays: body.weekDays,
         hourStart: covertHoursToMinutes(body.hourStart),
         hourEnd: covertHoursToMinutes(body.hourEnd),
         useVoiceChannel: body.useVoiceChannel,
      }
   })


   return response.json(body)
})

//mostrar anucnios de um game
app.get('/games/:id/ads', async ( request , response ) =>{
   const gameId = request.params.id;

   const ads = await prisma.ad.findMany({
      select:{
         id: true,
         name: true,
         weekDays: true,
         useVoiceChannel: true,
         yearsPlaying: true,
         hourEnd: true,
         hourStart: true,
      },
      where: {
         gameId : gameId,
      },
      orderBy: {
         createdAt: 'desc'
      }
   })
   return response.json(ads.map(ad=>{
      return {
         ...ad,
         weekDays: ad.weekDays.split(','),
         hourStart: covertMinutesToHours(ad.hourStart),
         hourEnd: covertMinutesToHours(ad.hourEnd),
      }
   }));
})

//buscar discord de um anuncio
app.get('/ads/:id/discord', async ( request , response ) =>{
   const adId = request.params.id;

   const ad = await prisma.ad.findUnique({
      select:{
         discord : true,
      },
      where : {
         id: adId,
      }
   })

   return response.json(ad);
})

app.listen(3333)

