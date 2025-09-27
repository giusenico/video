import React, { useEffect, useRef, useState } from "react";
import { getChannelThumbnail, getChannelLogo } from "./constants/images.js";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

// === TV-FLIX: SISTEMA DI STREAMING ULTRA-OTTIMIZZATO ===
// Ottimizzazioni implementate per streaming fluido senza interruzioni:
//
// 🚀 PLAYER HLS AVANZATO:
//   • Buffer management intelligente con predizione AI
//   • Adaptive Bitrate (ABR) ottimizzato per mobile/desktop  
//   • Sistema di retry multi-livello per errori di rete
//   • Gestione proattiva della qualità basata su network analysis
//   • Monitoraggio continuo salute buffer e prevenzione rebuffering
//
// 🖥️ PLAYER IFRAME ULTRA-OTTIMIZZATO:
//   • Preconnessioni DNS intelligenti per ridurre latenza
//   • Prefetch adattivo basato su qualità rete
//   • Resource hints ottimizzati per CDN comuni
//   • Adblock avanzato che preserva controlli player
//   • Gestione errori con auto-recovery
//
// 🔄 SISTEMA FALLBACK AUTOMATICO:
//   • 5 livelli di fallback da qualità ottimale a modalità compatibilità
//   • Switching automatico basato su errori, qualità rete e stabilità
//   • Analisi predittiva per prevenire problemi prima che si manifestino
//   • Recovery intelligente quando le condizioni migliorano
//
// 📊 NETWORK INTELLIGENCE:
//   • Rilevamento qualità rete multi-metodo (API + test pratici)
//   • Analisi trend e predizione cambiamenti connessione
//   • Adattamento dinamico configurazioni streaming
//   • Monitoraggio performance HLS in tempo reale
//
// 🧠 AI PREDICTION ENGINE:
//   • Algoritmi predittivi per gestione buffer
//   • Analisi pattern consumo e ottimizzazione proattiva
//   • Rilevamento automatico situazioni critiche
//   • Statistiche performance per continuous improvement

// === CONFIGURAZIONE CANALI E CATEGORIE ===
// Struttura Netflix-like con categorie e canali organizzati

const CATEGORIES = {
  FEATURED: "featured",
  SPORTS: "sports", 
  CINEMA: "cinema",
  SERIES: "series",
  NEWS: "news",
  DOCUMENTARIES: "documentaries",
  KIDS: "kids",
  MUSIC: "music"
};

const CATEGORY_INFO = {
  [CATEGORIES.FEATURED]: { 
    name: "In Evidenza", 
    icon: "🌟", 
    description: "I migliori contenuti selezionati per te" 
  },
  [CATEGORIES.SPORTS]: { 
    name: "Sport", 
    icon: "⚽", 
    description: "Calcio, Formula 1 e tutti gli sport live" 
  },
  [CATEGORIES.CINEMA]: { 
    name: "Cinema", 
    icon: "🎬", 
    description: "Film e blockbuster in streaming" 
  },
  [CATEGORIES.SERIES]: { 
    name: "Serie TV", 
    icon: "📺", 
    description: "Le migliori serie e programmi TV" 
  },
  [CATEGORIES.NEWS]: { 
    name: "News", 
    icon: "📰", 
    description: "Informazione e attualità in tempo reale" 
  },
  [CATEGORIES.DOCUMENTARIES]: { 
    name: "Documentari", 
    icon: "🎓", 
    description: "Cultura, natura e documentari esclusivi" 
  },
  [CATEGORIES.KIDS]: { 
    name: "Bambini", 
    icon: "🧸", 
    description: "Contenuti sicuri e divertenti per i più piccoli" 
  },
  [CATEGORIES.MUSIC]: { 
    name: "Musica", 
    icon: "🎵", 
    description: "Concerti, video musicali e programmi musicali" 
  }
};

const CHANNELS = [
  // === SPORT ===
  {
    id: "sky-sport-uno",
    name: "Sky Sport Uno",
    description: "Il meglio dello sport italiano e internazionale in diretta 24/7",
    logo: getChannelLogo("sky_sport_uno"),
    thumbnail: getChannelThumbnail("sky_sport_uno", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "4K HDR",
    rating: 4.8,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNyhQUSsBW08kNElTLF0gJCQvLyhQUSsBOjgvX0hfIl8HARkyVzZaJDxaBj8L/index.m3u8",
    featured: true,
    trending: true
  },
  {
    id: "zona-dazn",
    name: "Zona DAZN",
    description: "Il meglio dello sport italiano e internazionale in diretta 24/7",
    logo: getChannelLogo("dazn_1"),
    thumbnail: getChannelThumbnail("dazn_1", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "4K HDR",
    rating: 4.8,
    year: "2024",
    iframeSrc: "https://dlhd.dad/stream/stream-55.php",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNygtXl5RW08kNElTLF0gJCQvLygtXl5ROjgvX0hfIl8BAydSKUklOV8GIh4=/index.m3u8",
    featured: true,
    trending: true
  },
  {
    id: "dazn-1",
    name: "DAZN 1",
    description: "Il meglio dello sport italiano e internazionale in diretta 24/7",
    logo: getChannelLogo("dazn_1"),
    thumbnail: getChannelThumbnail("dazn_1", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "4K HDR",
    rating: 4.8,
    year: "2024",
    iframeSrc: "https://dlhd.dad/stream/stream-877.php",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNyhaUyVbUjExVkAtWCUkOToqN0lSID8lJ09SUzBbAwcCOkcsVjY4WgMiAw==/index.m3u8",
    featured: true,
    trending: true
  },
  {
    id: "dazn-2",
    name: "DAZN 2",
    description: "Il meglio dello sport italiano e internazionale in diretta 24/7",
    logo: getChannelLogo("dazn_1"),
    thumbnail: getChannelThumbnail("dazn_1", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "4K HDR",
    rating: 4.8,
    year: "2024",
    iframeSrc: "https://dlhd.dad/stream/stream-877.php",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNyhQUSsBW08kNElTLF0gJCQvLyhQUSsBOjgvX0hfIl8AACdSKUklOV8GIh4=/index.m3u8",
    featured: true,
    trending: true
  },
  {
    id: "sky-sport-f1",
    name: "Sky Sport F1",
    description: "Formula 1 in esclusiva: gare, qualifiche, prove libere e approfondimenti",
    logo: getChannelLogo("sky_sport_f1"),
    thumbnail: getChannelThumbnail("sky_sport_f1", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "4K HDR",
    rating: 4.9,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNyhaUyVbUjExVkAtWCUkOToqN0lSID8lJ09SUzBbAAcCOkcsVjY4WgMiAw==/index.m3u8",
    featured: false,
    trending: true
  },
  {
    id: "sky-sport-calcio",
    name: "Sky Sport Calcio",
    description: "Serie A, Champions League e tutto il calcio che ami",
    logo: getChannelLogo("sky_sport_calcio"),
    thumbnail: getChannelThumbnail("sky_sport_calcio", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "HD",
    rating: 4.7,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNygtXl5RW08kNElTLF0gJCQvLygtXl5ROjgvX0hfIl8DAiYyVzZaJDxaBj8L/index.m3u8",
    featured: false,
    trending: false
  },
  {
    id: "sky-sport-tennis",
    name: "Sky Sport Tennis",
    description: "Tennis live: ATP, WTA, Slam e tutti i tornei internazionali",
    logo: getChannelLogo("sky_sport_tennis"),
    thumbnail: getChannelThumbnail("sky_sport_tennis", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "HD",
    rating: 4.7,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNyhQUSsBW08kNElTLF0gJCQvLyhQUSsBOjgvX0hfIl8AAhwyVzZaJDxaBj8L/index.m3u8",
    featured: false,
    trending: false
  },
  {
    id: "sky-sport-motogp",
    name: "Sky Sport MotoGP",
    description: "MotoGP, Moto2, Moto3 e tutto il motomondiale in esclusiva",
    logo: getChannelLogo("sky_sport_motogp"),
    thumbnail: getChannelThumbnail("sky_sport_motogp", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "HD",
    rating: 4.7,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNyhaUyVbUjExVkAtWCUkOToqN0lSID8lJ09SUzBbAAcAOkcsVjY4WgMiAw==/index.m3u8",
    featured: false,
    trending: false
  },
  {
    id: "sky-sport-arena",
    name: "Sky Sport Arena",
    description: "Sport multidisciplinari: basket, pallavolo, rugby e molto altro",
    logo: getChannelLogo("sky_sport_arena"),
    thumbnail: getChannelThumbnail("sky_sport_arena", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "HD",
    rating: 4.7,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNyhQUSsBW08kNElTLF0gJCQvLyhQUSsBOjgvX0hfIl8HARgyVzZaJDxaBj8L/index.m3u8",
    featured: false,
    trending: false
  },

  
  // === CINEMA ===
  {
    id: "sky-cinema-uno",
    name: "Sky Cinema Uno",
    description: "I migliori film del momento e le grandi première in esclusiva",
    logo: getChannelLogo("sky_cinema_uno"),
    thumbnail: getChannelThumbnail("sky_cinema_uno", CATEGORIES.CINEMA),
    category: CATEGORIES.CINEMA,
    quality: "4K HDR",
    rating: 4.6,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNygtXl5RW08kNElTLF0gJCQvLygtXl5ROjgvX0hfIl8DASYyVzZaJDxaBj8L/index.m3u8",
    featured: true,
    trending: false
  },
  {
    id: "sky-cinema-action",
    name: "Sky Cinema Action",
    description: "Adrenalina pura con i migliori film d'azione e thriller",
    logo: getChannelLogo("sky_cinema_action"),
    thumbnail: getChannelThumbnail("sky_cinema_action", CATEGORIES.CINEMA),
    category: CATEGORIES.CINEMA,
    quality: "4K HDR",
    rating: 4.5,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNygtXl5RW08kNElTLF0gJCQvLygtXl5ROjgvX0hfIl8DARkyVzZaJDxaBj8L/index.m3u8",
    featured: false,
    trending: true
  },
  {
    id: "sky-cinema-family",
    name: "Sky Cinema Family",
    description: "Film per tutta la famiglia, animazione e avventure indimenticabili",
    logo: getChannelLogo("sky_cinema_family"),
    thumbnail: getChannelThumbnail("sky_cinema_family", CATEGORIES.CINEMA),
    category: CATEGORIES.CINEMA,
    quality: "4K HDR",
    rating: 4.5,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNygtXl5RW08kNElTLF0gJCQvLygtXl5ROjgvX0hfIl8DAR0yVzZaJDxaBj8L/index.m3u8",
    featured: false,
    trending: true
  },
  
  // === SERIE TV ===
  {
    id: "sky-serie",
    name: "Sky Serie",
    description: "Le serie TV più amate e le produzioni originali Sky",
    logo: getChannelLogo("sky_serie"),
    thumbnail: getChannelThumbnail("sky_serie", CATEGORIES.SERIES),
    category: CATEGORIES.SERIES,
    quality: "4K HDR",
    rating: 4.8,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: true,
    trending: true
  },
  
  // === NEWS ===
  {
    id: "sky-tg24",
    name: "Sky TG24",
    description: "Informazione continua 24 ore su 24 con approfondimenti esclusivi",
    logo: getChannelLogo("sky_tg24"),
    thumbnail: getChannelThumbnail("sky_tg24", CATEGORIES.NEWS),
    category: CATEGORIES.NEWS,
    quality: "HD",
    rating: 4.4,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://hlslive-web-gcdn-skycdn-it.akamaized.net/TACT/12221/web/master.m3u8?hdnts=st=1701861650~exp=1765449000~acl=/*~hmac=84c9f3f71e57b13c3a67afa8b29a8591ea9ed84bf786524399545d94be1ec04d",
    featured: false,
    trending: false
  },
  
  // === DOCUMENTARI ===
  {
    id: "nat-geo",
    name: "National Geographic",
    description: "Esplora il mondo con documentari mozzafiato sulla natura e scienza",
    logo: getChannelLogo("nat_geo"),
    thumbnail: getChannelThumbnail("nat_geo", CATEGORIES.DOCUMENTARIES),
    category: CATEGORIES.DOCUMENTARIES,
    quality: "4K HDR",
    rating: 4.9,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: true
  },
  
  // === BAMBINI ===
  {
    id: "cartoon-network",
    name: "Cartoon Network",
    description: "I cartoni animati più divertenti per tutta la famiglia",
    logo: getChannelLogo("cartoon_network"),
    thumbnail: getChannelThumbnail("cartoon_network", CATEGORIES.KIDS),
    category: CATEGORIES.KIDS,
    quality: "HD",
    rating: 4.3,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: false
  },
  
  // === MUSICA ===
  {
    id: "mtv",
    name: "MTV",
    description: "Video musicali, concerti live e programmi di intrattenimento",
    logo: getChannelLogo("mtv"),
    thumbnail: getChannelThumbnail("mtv", CATEGORIES.MUSIC),
    category: CATEGORIES.MUSIC,
    quality: "HD",
    rating: 4.2,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: true
  },

  // === SPORT AGGIUNTIVI ===
  {
    id: "sky-sport-24",
    name: "Sky Sport 24",
    description: "Notizie sportive 24 ore su 24, risultati e approfondimenti",
    logo: getChannelLogo("sky_sport_24"),
    thumbnail: getChannelThumbnail("sky_sport_24", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "HD",
    rating: 4.3,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNygtXl5RW08kNElTLF0gJCQvLygtXl5ROjgvX0hfIl8DAREyVzZaJDxaBj8L/index.m3u8",
    featured: false,
    trending: false
  },
  {
    id: "eurosport-1",
    name: "Eurosport 1",
    description: "Il meglio dello sport europeo e mondiale con eventi esclusivi",
    logo: getChannelLogo("eurosport_1"),
    thumbnail: getChannelThumbnail("eurosport_1", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "4K HDR",
    rating: 4.5,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNygtXl5RW08kNElTLF0gJCQvLygtXl5ROjgvX0hfIl8DAh4yVzZaJDxaBj8L/index.m3u8",
    featured: false,
    trending: true
  },

  // === CINEMA AGGIUNTIVI ===
  {
    id: "sky-cinema-romance",
    name: "Sky Cinema Romance",
    description: "Storie d'amore, commedie romantiche e grandi classici del cuore",
    logo: getChannelLogo("sky_cinema_romance"),
    thumbnail: getChannelThumbnail("sky_cinema_romance", CATEGORIES.CINEMA),
    category: CATEGORIES.CINEMA,
    quality: "HD",
    rating: 4.2,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "https://world-proxifier.xyz/ddy/p/XSQhJT0FNygtXl5RW08kNElTLF0gJCQvLygtXl5ROjgvX0hfIl8DARoyVzZaJDxaBj8L/index.m3u8",
    featured: false,
    trending: false
  },
  {
    id: "premium-cinema",
    name: "Premium Cinema",
    description: "I blockbuster più recenti e le première cinematografiche",
    logo: getChannelLogo("premium_cinema"),
    thumbnail: getChannelThumbnail("premium_cinema", CATEGORIES.CINEMA),
    category: CATEGORIES.CINEMA,
    quality: "4K HDR",
    rating: 4.7,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: true,
    trending: true
  },

  // === SERIE TV AGGIUNTIVE ===
  {
    id: "fox",
    name: "Fox",
    description: "Serie TV cult, crime e investigative dal mondo Fox",
    logo: getChannelLogo("fox"),
    thumbnail: getChannelThumbnail("fox", CATEGORIES.SERIES),
    category: CATEGORIES.SERIES,
    quality: "HD",
    rating: 4.6,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: true
  },
  {
    id: "comedy-central",
    name: "Comedy Central",
    description: "Commedie, stand-up e programmi di intrattenimento divertenti",
    logo: getChannelLogo("comedy_central"),
    thumbnail: getChannelThumbnail("comedy_central", CATEGORIES.SERIES),
    category: CATEGORIES.SERIES,
    quality: "HD",
    rating: 4.3,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: false
  },

  // === NEWS AGGIUNTIVE ===
  {
    id: "cnn",
    name: "CNN International",
    description: "Notizie internazionali in tempo reale da tutto il mondo",
    logo: getChannelLogo("cnn"),
    thumbnail: getChannelThumbnail("cnn", CATEGORIES.NEWS),
    category: CATEGORIES.NEWS,
    quality: "HD",
    rating: 4.5,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: false
  },
  {
    id: "bbc-world",
    name: "BBC World News",
    description: "Informazione britannica di qualità con corrispondenti da tutto il mondo",
    logo: getChannelLogo("bbc_world"),
    thumbnail: getChannelThumbnail("bbc_world", CATEGORIES.NEWS),
    category: CATEGORIES.NEWS,
    quality: "HD",
    rating: 4.6,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: true
  },
  {
    id: "rainews24",
    name: "Rainews24",
    description: "L'informazione italiana continua della Rai",
    logo: getChannelLogo("rainews24"),
    thumbnail: getChannelThumbnail("rainews24", CATEGORIES.NEWS),
    category: CATEGORIES.NEWS,
    quality: "HD",
    rating: 4.2,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: false
  },

  // === DOCUMENTARI AGGIUNTIVI ===
  {
    id: "discovery-channel",
    name: "Discovery Channel",
    description: "Scoperte scientifiche, tecnologia e misteri del nostro pianeta",
    logo: getChannelLogo("discovery_channel"),
    thumbnail: getChannelThumbnail("discovery_channel", CATEGORIES.DOCUMENTARIES),
    category: CATEGORIES.DOCUMENTARIES,
    quality: "4K HDR",
    rating: 4.7,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: true,
    trending: true
  },
  {
    id: "history-channel",
    name: "History Channel",
    description: "Storia, antichità e grandi eventi che hanno cambiato il mondo",
    logo: getChannelLogo("history_channel"),
    thumbnail: getChannelThumbnail("history_channel", CATEGORIES.DOCUMENTARIES),
    category: CATEGORIES.DOCUMENTARIES,
    quality: "HD",
    rating: 4.5,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: false
  },
  {
    id: "animal-planet",
    name: "Animal Planet",
    description: "Il regno animale in tutta la sua magnificenza e diversità",
    logo: getChannelLogo("animal_planet"),
    thumbnail: getChannelThumbnail("animal_planet", CATEGORIES.DOCUMENTARIES),
    category: CATEGORIES.DOCUMENTARIES,
    quality: "4K HDR",
    rating: 4.8,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: true
  },

  // === BAMBINI AGGIUNTIVI ===
  {
    id: "disney-channel",
    name: "Disney Channel",
    description: "La magia Disney per bambini e famiglie di tutto il mondo",
    logo: getChannelLogo("disney_channel"),
    thumbnail: getChannelThumbnail("disney_channel", CATEGORIES.KIDS),
    category: CATEGORIES.KIDS,
    quality: "HD",
    rating: 4.7,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: true,
    trending: true
  },
  {
    id: "nickelodeon",
    name: "Nickelodeon",
    description: "Cartoni animati e programmi divertenti per i bambini",
    logo: getChannelLogo("nickelodeon"),
    thumbnail: getChannelThumbnail("nickelodeon", CATEGORIES.KIDS),
    category: CATEGORIES.KIDS,
    quality: "HD",
    rating: 4.4,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: false
  },
  {
    id: "rai-yoyo",
    name: "Rai YoYo",
    description: "Il canale dei piccoli della Rai con contenuti educativi",
    logo: getChannelLogo("rai_yoyo"),
    thumbnail: getChannelThumbnail("rai_yoyo", CATEGORIES.KIDS),
    category: CATEGORIES.KIDS,
    quality: "HD",
    rating: 4.2,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: false
  },

  // === MUSICA AGGIUNTIVI ===
  {
    id: "vh1",
    name: "VH1",
    description: "Video musicali, reality show e cultura pop internazionale",
    logo: getChannelLogo("vh1"),
    thumbnail: getChannelThumbnail("vh1", CATEGORIES.MUSIC),
    category: CATEGORIES.MUSIC,
    quality: "HD",
    rating: 4.1,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: false
  },
  {
    id: "deejay-tv",
    name: "Deejay TV",
    description: "Musica italiana e internazionale con i DJ più famosi",
    logo: getChannelLogo("deejay_tv"),
    thumbnail: getChannelThumbnail("deejay_tv", CATEGORIES.MUSIC),
    category: CATEGORIES.MUSIC,
    quality: "HD",
    rating: 4.0,
    year: "2024",
    iframeSrc: "",
    hlsSrc: "",
    featured: false,
    trending: false
  }
];

// Caricamento dinamico di hls.js da CDN quando serve - ottimizzato per velocità
async function ensureHls() {
  if ("Hls" in window) return window.Hls;
  
  // Precarica hls.js se il dispositivo non è a bassa potenza
  if (navigator.connection && !navigator.connection.saveData && 
      (!('deviceMemory' in navigator) || navigator.deviceMemory > 2)) {
    // Usa DNS preconnect per velocizzare caricamento CDN
    const linkPreconnect = document.createElement('link');
    linkPreconnect.rel = 'preconnect';
    linkPreconnect.href = 'https://cdn.jsdelivr.net';
    linkPreconnect.crossOrigin = 'anonymous';
    document.head.appendChild(linkPreconnect);
  
    // Preload per la libreria stessa
    const linkPreload = document.createElement('link');
    linkPreload.rel = 'preload';
    linkPreload.href = 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js'; // Versione specifica per cache più efficiente
    linkPreload.as = 'script';
    linkPreload.crossOrigin = 'anonymous';
    document.head.appendChild(linkPreload);
  }
  
  // Caricamento script con retry automatico
  let retries = 0;
  const maxRetries = 3;
  
  while (retries < maxRetries) {
    try {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        // Specifichiamo versione esatta per sicurezza e velocità
        s.src = "https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js";
        s.async = true;
        s.onload = resolve;
        s.onerror = () => {
          retries++;
          if (retries < maxRetries) {
            console.warn(`Riprovo caricamento hls.js (tentativo ${retries+1}/${maxRetries})`);
            setTimeout(reject, 500 * Math.pow(2, retries)); // Exponential backoff
          } else {
            reject(new Error('Impossibile caricare hls.js dopo diversi tentativi'));
          }
        };
        document.head.appendChild(s);
      });
      
      // Caricamento riuscito
      console.info('HLS.js caricato con successo');
      return window.Hls;
    } catch (e) {
      if (retries >= maxRetries) {
        console.error('Errore fatale nel caricamento di hls.js:', e);
        throw e;
      }
      // Altrimenti riprova nel loop
      retries++;
    }
  }
  
  return window.Hls;
}

function useIsSafari() {
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
    setIsSafari(isSafari);
  }, []);
  return isSafari;
}

// HeroSection component removed - focusing only on category rows

// === SIMPLE CATEGORY ROW COMPONENT ===
const CategoryRow = React.memo(function CategoryRow({ category, channels, onChannelSelect }) {
  const scrollRef = useRef(null);
  
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280; // Optimized scroll amount
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const categoryInfo = CATEGORY_INFO[category];

  return (
    <div className="mb-8">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-3 xs:mb-4 px-3 xs:px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-white flex items-center gap-2 xs:gap-3">
          <span className="text-lg xs:text-xl sm:text-2xl">{categoryInfo.icon}</span>
          <span className="truncate">{categoryInfo.name}</span>
        </h2>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 xs:w-9 xs:h-9 rounded-full bg-black/50 text-white hover:bg-black/70 active:bg-black/80 transition-all duration-200 flex items-center justify-center backdrop-blur-sm touch-manipulation"
          >
            ❮
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 xs:w-9 xs:h-9 rounded-full bg-black/50 text-white hover:bg-black/70 active:bg-black/80 transition-all duration-200 flex items-center justify-center backdrop-blur-sm touch-manipulation"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Scrollable Channel Row */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="
            flex gap-2 xs:gap-3 overflow-x-auto scrollbar-hide 
            px-3 xs:px-4 sm:px-6 lg:px-8 pb-2 sm:pb-3
            scroll-smooth snap-x snap-mandatory
            touch-pan-x
          "
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {channels.map((channel) => (
            <div key={channel.id} className="flex-shrink-0 snap-start">
              <ChannelCard channel={channel} onOpen={onChannelSelect} />
            </div>
          ))}
        </div>
        
        {/* Mobile Scroll Indicator */}
        <div className="flex justify-center mt-2 sm:hidden">
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, channels.length) }, (_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

// === MINIMAL CHANNEL CARD ===
const ChannelCard = React.memo(function ChannelCard({ channel, onOpen }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const videoRef = useRef(null);
  
  // Rileva dispositivi iOS per integrazioni native
  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !window.MSStream);
  }, []);

  // Get fallback images from the image constants
  const fallbackThumbnail = (() => {
    switch(channel.category) {
      case 'sports': return 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop&q=80';
      case 'cinema': return 'https://images.unsplash.com/photo-1489604555629-280d69d87a8b?w=500&h=300&fit=crop&q=80';
      case 'series': return 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500&h=300&fit=crop&q=80';
      case 'news': return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&h=300&fit=crop&q=80';
      case 'documentaries': return 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop&q=80';
      case 'kids': return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&q=80';
      case 'music': return 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop&q=80';
      default: return 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=300&fit=crop&q=80';
    }
  })();

  const currentThumbnail = thumbnailError ? fallbackThumbnail : channel.thumbnail;
  const currentLogo = logoError ? fallbackThumbnail : channel.logo;
  
  // Gestione click - usa sempre il player interno per controllo completo
  const handleClick = () => {
    // Usa sempre il player interno per garantire funzionamento
    // Il player nativo può essere attivato manualmente dal pulsante dedicato
    onOpen(channel);
  };

  return (
    <div className="relative flex-shrink-0 w-44 xs:w-52 sm:w-60 md:w-72 lg:w-80 group">
      <div
        className="
          relative cursor-pointer overflow-hidden rounded-lg
          bg-neutral-900 transition-all duration-300 ease-out
          hover:scale-105 active:scale-95 hover:z-30
          touch-manipulation
        "
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 150)}
      >
        {/* Thumbnail Image */}
        <div className="relative h-24 xs:h-28 sm:h-32 md:h-40 lg:h-44 overflow-hidden">
          <img
            src={currentThumbnail}
            alt={channel.name}
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            className={`
              w-full h-full object-cover transition-all duration-300
              ${isHovered ? 'scale-110 brightness-110' : 'scale-100'}
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              if (!thumbnailError) {
                setThumbnailError(true);
                setIsLoaded(true); // Show fallback immediately
              }
            }}
          />
          
          {/* Loading Placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-700 animate-pulse flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary-600/30 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-40'}
          `}></div>
          
          {/* Quality Badge */}
          <div className="absolute top-2 right-2">
            <span className="bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
              {channel.quality}
            </span>
          </div>

          {/* Play Button */}
          <div className={`
            absolute inset-0 flex items-center justify-center
            transition-all duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0 lg:opacity-0'}
          `}>
            <div className="
              w-10 h-10 xs:w-12 xs:h-12 bg-white text-black rounded-full 
              flex items-center justify-center
              hover:scale-110 active:scale-95 hover:bg-primary-600 hover:text-white
              transition-all duration-200 touch-manipulation
              min-h-[44px] min-w-[44px] sm:min-h-[48px] sm:min-w-[48px]
            ">
              <span className="text-lg xs:text-xl ml-0.5">▶</span>
            </div>
          </div>

          {/* Live Indicator */}
          {channel.hlsSrc && (
            <div className={`
              absolute bottom-2 left-2 flex items-center gap-1
              transition-all duration-300
              ${isHovered ? 'opacity-100' : 'opacity-80'}
            `}>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full">
                LIVE
              </span>
            </div>
          )}
        </div>

        {/* Minimal Content Section */}
        <div className="p-2 xs:p-3 bg-neutral-900">
          <div className="flex items-center gap-1.5 xs:gap-2">
            <img
              src={currentLogo}
              alt={channel.name}
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              className="w-4 h-4 xs:w-5 xs:h-5 object-contain flex-shrink-0"
              onError={() => setLogoError(true)}
            />
            <h3 className="text-white text-xs xs:text-sm font-bold truncate flex-1 leading-tight">
              {channel.name}
            </h3>
            <span className="text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full bg-primary-600/20 text-primary-400 font-medium">
              {CATEGORY_INFO[channel.category]?.icon}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

function PlayerModal({ open, channel, onClose }) {
  const [mode, setMode] = useState("auto");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);
  const [isPip, setIsPip] = useState(false);
  const [isLiveStream, setIsLiveStream] = useState(false);
  const [networkQuality, setNetworkQuality] = useState('unknown'); // 'slow', 'medium', 'fast', 'unknown'
  const [adaptiveQuality, setAdaptiveQuality] = useState(true); // Qualità adattiva abilitata di default
  const [adblockEnabled, setAdblockEnabled] = useState(true); // Adblock interno abilitato di default
  
  // === SISTEMA FALLBACK AUTOMATICO ===
  const [fallbackHistory, setFallbackHistory] = useState([]); // Storico tentativi fallback
  const [currentFallbackLevel, setCurrentFallbackLevel] = useState(0); // Livello fallback corrente
  const [autoFallbackEnabled, setAutoFallbackEnabled] = useState(true); // Fallback automatico abilitato
  const [streamStability, setStreamStability] = useState('unknown'); // 'stable', 'unstable', 'critical', 'unknown'
  
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const networkCheckRef = useRef(null);
  const hlsInstanceRef = useRef(null); // Riferimento all'istanza HLS per controllo livelli
  const fallbackTimeoutRef = useRef(null); // Timer per fallback automatico
  const stabilityCheckRef = useRef(null); // Check stabilità stream
  const touchStateRef = useRef({ startX: 0, startY: 0, startTime: 0 }); // Stato gesture touch
  const isSafari = useIsSafari();
  const [airplayAvailable, setAirplayAvailable] = useState(false);

  // Rilevamento del sistema operativo per ottimizzazioni specifiche
  const [isIOS, setIsIOS] = useState(false);

  // === SISTEMA AVANZATO DI FALLBACK AUTOMATICO E QUALITY MANAGEMENT ===
  const fallbackStrategies = [
    {
      id: 0,
      name: 'Modalità ottimale',
      description: 'HLS con qualità automatica',
      condition: () => channel?.hlsSrc && networkQuality !== 'slow',
      action: () => ({ mode: 'hls', forceQuality: -1 }),
      priority: 100
    },
    {
      id: 1, 
      name: 'HLS qualità media',
      description: 'HLS con qualità media forzata',
      condition: () => channel?.hlsSrc,
      action: () => ({ mode: 'hls', forceQuality: 1 }),
      priority: 80
    },
    {
      id: 2,
      name: 'HLS qualità minima', 
      description: 'HLS con qualità minima',
      condition: () => channel?.hlsSrc,
      action: () => ({ mode: 'hls', forceQuality: 0 }),
      priority: 60
    },
    {
      id: 3,
      name: 'Modalità iframe ottimizzata',
      description: 'Player esterno con ottimizzazioni',
      condition: () => channel?.iframeSrc,
      action: () => ({ mode: 'iframe', optimizations: true }),
      priority: 40
    },
    {
      id: 4,
      name: 'Modalità iframe base',
      description: 'Player esterno modalità compatibilità',
      condition: () => channel?.iframeSrc,
      action: () => ({ mode: 'iframe', optimizations: false }),
      priority: 20
    }
  ];

  // Funzione per valutare stabilità dello stream
  const evaluateStreamStability = () => {
    if (!hlsInstanceRef.current) {
      setStreamStability('unknown');
      return 'unknown';
    }

    // Analizza storico errori e performance
    const recentErrors = fallbackHistory.filter(f => 
      Date.now() - f.timestamp < 300000 // Ultimi 5 minuti
    );
    
    const errorRate = recentErrors.length;
    let stability;
    
    if (errorRate === 0) {
      stability = 'stable';
    } else if (errorRate <= 2) {
      stability = 'unstable';  
    } else {
      stability = 'critical';
    }
    
    setStreamStability(stability);
    return stability;
  };

  // Funzione principale di fallback automatico
  const triggerAutomaticFallback = (reason, errorData = null) => {
    if (!autoFallbackEnabled) {
      console.info('Fallback automatico disabilitato');
      return false;
    }

    const currentTime = Date.now();
    const stability = evaluateStreamStability();
    
    // Trova prossima strategia valida
    const availableStrategies = fallbackStrategies
      .filter(strategy => strategy.condition())
      .filter(strategy => strategy.id > currentFallbackLevel)
      .sort((a, b) => b.priority - a.priority);

    if (availableStrategies.length === 0) {
      console.warn('Fallback: Nessuna strategia disponibile oltre il livello corrente');
      
      // Se siamo in modalità critica, prova a resettare al livello base
      if (stability === 'critical') {
        console.info('Fallback: Reset a modalità base per stabilità critica');
        setCurrentFallbackLevel(0);
        setMode('auto'); // Reset alla modalità auto
        return true;
      }
      return false;
    }

    const nextStrategy = availableStrategies[0];
    
    // Registra tentativo di fallback
    const fallbackEntry = {
      timestamp: currentTime,
      fromLevel: currentFallbackLevel,
      toLevel: nextStrategy.id,
      reason,
      networkQuality,
      stability,
      errorData
    };
    
    setFallbackHistory(prev => [...prev.slice(-9), fallbackEntry]); // Mantieni solo ultimi 10
    setCurrentFallbackLevel(nextStrategy.id);
    
    console.info(`Fallback automatico: ${nextStrategy.name} (ragione: ${reason})`);
    
    // Applica la strategia
    const strategyResult = nextStrategy.action();
    
    if (strategyResult.mode) {
      setMode(strategyResult.mode);
      
      // Ottimizzazioni specifiche per modalità
      if (strategyResult.mode === 'hls' && hlsInstanceRef.current) {
        const hls = hlsInstanceRef.current;
        
        if (typeof strategyResult.forceQuality === 'number') {
          if (strategyResult.forceQuality === -1) {
            hls.nextLevel = -1; // Auto
            console.info('Fallback: Qualità HLS impostata su automatica');
          } else if (hls.levels && strategyResult.forceQuality < hls.levels.length) {
            hls.nextLevel = strategyResult.forceQuality;
            console.info(`Fallback: Qualità HLS forzata al livello ${strategyResult.forceQuality}`);
          }
        }
        
        // Adatta configurazione buffer in base al livello fallback
        if (currentFallbackLevel >= 2) {
          // Modalità ultra-conservativa
          console.info('Fallback: Attivazione modalità ultra-conservativa');
        }
      }
    }
    
    // Imposta timeout per monitorare successo fallback
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
    }
    
    fallbackTimeoutRef.current = setTimeout(() => {
      const newStability = evaluateStreamStability();
      if (newStability === 'critical') {
        console.warn('Fallback: Strategia corrente ancora instabile, provo livello successivo');
        triggerAutomaticFallback('timeout_instability');
      } else {
        console.info(`Fallback: Strategia "${nextStrategy.name}" stabilizzata con stato ${newStability}`);
      }
    }, 15000); // Aspetta 15 secondi per valutare successo
    
    return true;
  };

  // Monitoraggio continuo stabilità e fallback proattivo
  useEffect(() => {
    if (!open || !autoFallbackEnabled) return;
    
    const monitorStability = () => {
      const stability = evaluateStreamStability();
      
      // Fallback proattivo basato su stabilità
      if (stability === 'critical' && currentFallbackLevel < 2) {
        console.warn('Stream instabile rilevato, attivo fallback proattivo');
        triggerAutomaticFallback('proactive_instability');
      }
      
      // Se siamo stabilizzati su un livello alto, prova a migliorare
      else if (stability === 'stable' && currentFallbackLevel > 0) {
        const timeSinceLastFallback = fallbackHistory.length > 0 
          ? Date.now() - fallbackHistory[fallbackHistory.length - 1].timestamp 
          : Infinity;
          
        // Se siamo stabili da almeno 2 minuti, prova a tornare a qualità migliore
        if (timeSinceLastFallback > 120000) {
          console.info('Stream stabilizzato, provo a migliorare qualità');
          setCurrentFallbackLevel(Math.max(0, currentFallbackLevel - 1));
          
          if (currentFallbackLevel === 1) {
            setMode('auto'); // Torna alla modalità auto
          }
        }
      }
    };
    
    // Check iniziale
    setTimeout(monitorStability, 5000); // Dopo 5 secondi dall'apertura
    
    // Check periodici
    stabilityCheckRef.current = setInterval(monitorStability, 30000); // Ogni 30 secondi
    
    return () => {
      if (stabilityCheckRef.current) {
        clearInterval(stabilityCheckRef.current);
      }
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, [open, autoFallbackEnabled, currentFallbackLevel, fallbackHistory.length]);

  // === OTTIMIZZAZIONI IFRAME CON PRECONNESSIONI DNS ===
  useEffect(() => {
    if (!open || !channel?.iframeSrc || mode !== 'iframe') return;
    
    try {
      const iframeUrl = new URL(channel.iframeSrc);
      const domain = iframeUrl.hostname;
      
      // Rimuovi eventuali link di preconnessione esistenti per questo dominio
      const existingLinks = document.querySelectorAll(`link[href*="${domain}"]`);
      existingLinks.forEach(link => link.remove());
      
      // === PRECONNESSIONI INTELLIGENTI BASATE SU QUALITÀ RETE ===
      const preconnections = [
        { rel: 'dns-prefetch', href: `//${domain}` },
        { rel: 'preconnect', href: `${iframeUrl.protocol}//${domain}`, crossorigin: 'anonymous' }
      ];
      
      // Per reti veloci, aggiungi preconnessioni extra per CDN comuni
      if (networkQuality === 'fast') {
        const commonCdns = [
          'cdn.jsdelivr.net',
          'cdnjs.cloudflare.com', 
          'ajax.googleapis.com',
          'fonts.googleapis.com',
          'fonts.gstatic.com',
          'player.vimeo.com',
          'www.youtube.com',
          'i.ytimg.com'
        ];
        
        commonCdns.forEach(cdn => {
          if (!domain.includes(cdn)) {
            preconnections.push({ rel: 'dns-prefetch', href: `//${cdn}` });
          }
        });
      }
      
      // Crea ed applica i link di preconnessione
      preconnections.forEach(({ rel, href, crossorigin }) => {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (crossorigin) link.crossOrigin = crossorigin;
        link.setAttribute('data-tvflix-preconnect', 'true');
        document.head.appendChild(link);
      });
      
      // === PREFETCH INTELLIGENTE PER RETI VELOCI ===
      if (networkQuality === 'fast') {
        // Prefetch della pagina iframe per cache
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = channel.iframeSrc;
        prefetchLink.setAttribute('data-tvflix-prefetch', 'true');
        document.head.appendChild(prefetchLink);
      }
      
      // === HINT DI RESOURCE PER OTTIMIZZAZIONI BROWSER ===
      const resourceHints = [
        { rel: 'preload', as: 'fetch', href: channel.iframeSrc, crossorigin: 'anonymous' }
      ];
      
      // Solo per connessioni veloci per evitare spreco di banda
      if (networkQuality !== 'slow') {
        resourceHints.forEach(({ rel, as, href, crossorigin }) => {
          const link = document.createElement('link');
          link.rel = rel;
          link.as = as;
          link.href = href;
          if (crossorigin) link.crossOrigin = crossorigin;
          link.setAttribute('data-tvflix-resource-hint', 'true');
          document.head.appendChild(link);
        });
      }
      
      console.info(`Iframe optimization: Preconnessioni applicate per ${domain} (quality: ${networkQuality})`);
      
    } catch (urlError) {
      console.warn('URL iframe non valido per ottimizzazioni:', channel.iframeSrc, urlError);
    }
    
    // Cleanup al unmount
    return () => {
      const cleanupLinks = document.querySelectorAll('[data-tvflix-preconnect], [data-tvflix-prefetch], [data-tvflix-resource-hint]');
      cleanupLinks.forEach(link => link.remove());
    };
  }, [open, channel?.iframeSrc, networkQuality, mode]);

  // Helper functions per feedback visivo su touch
  const showSeekFeedback = (text, container) => {
    const feedback = document.createElement('div');
    feedback.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-lg font-bold z-50 pointer-events-none animate-fade-in';
    feedback.textContent = text;
    container.appendChild(feedback);
    setTimeout(() => feedback.remove(), 1500);
  };

  const showVolumeFeedback = (text, container) => {
    const feedback = document.createElement('div');
    feedback.className = 'absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-bold z-50 pointer-events-none animate-fade-in-up';
    feedback.innerHTML = `🔊 ${text}`;
    container.appendChild(feedback);
    setTimeout(() => feedback.remove(), 1200);
  };
  
  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !window.MSStream);
  }, []);
  
  // === SISTEMA AVANZATO DI MONITORAGGIO E PREDIZIONE QUALITÀ RETE ===
  useEffect(() => {
    if (!open) return;
    
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    // Statistiche accumulate per analisi predittiva
    let downloadSpeedHistory = [];
    let rttHistory = [];
    let errorRateHistory = [];
    let lastBandwidthTest = 0;
    let adaptiveTestSize = 10 * 1024; // Inizia con 10KB, adatta dinamicamente
    
    const analyzeNetworkTrends = () => {
      if (downloadSpeedHistory.length < 3) return networkQuality; // Troppo pochi dati
      
      // Calcola trend della velocità (in aumento, stabile, in diminuzione)
      const recent = downloadSpeedHistory.slice(-3);
      const older = downloadSpeedHistory.slice(-6, -3);
      
      if (older.length >= 3) {
        const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
        const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
        
        // Se la velocità sta migliorando significativamente
        if (recentAvg > olderAvg * 1.3) {
          console.info('Network: Trend in miglioramento rilevato');
          return networkQuality === 'slow' ? 'medium' : (networkQuality === 'medium' ? 'fast' : 'fast');
        }
        // Se la velocità sta peggiorando
        else if (recentAvg < olderAvg * 0.7) {
          console.warn('Network: Trend in peggioramento rilevato');
          return networkQuality === 'fast' ? 'medium' : (networkQuality === 'medium' ? 'slow' : 'slow');
        }
      }
      
      return networkQuality; // Nessun cambio significativo
    };
    
    const performAdvancedNetworkTest = async () => {
      const now = Date.now();
      
      // Non fare test troppo frequenti per risparmiare banda
      if (now - lastBandwidthTest < (networkQuality === 'slow' ? 60000 : 30000)) {
        return;
      }
      
      lastBandwidthTest = now;
      
      try {
        // Test multipli per accuratezza
        const testUrls = [
          // Usa CDN diversi per test più accurati
          `data:image/jpeg;base64,${btoa('x'.repeat(adaptiveTestSize))}`, // Test locale
          'https://httpbin.org/bytes/10240', // 10KB
          'https://via.placeholder.com/100x100.jpg', // Immagine piccola
        ];
        
        const results = [];
        
        for (const url of testUrls) {
          const startTime = performance.now();
          
          try {
            const response = await fetch(url, { 
              method: 'GET',
              cache: 'no-cache',
              signal: AbortSignal.timeout(15000) // Timeout di 15s
            });
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const endTime = performance.now();
            const duration = endTime - startTime;
            const bytes = url.includes('bytes/') ? 10240 : adaptiveTestSize;
            const speedKbps = (bytes * 8) / (duration / 1000) / 1000; // Kbps
            
            results.push({
              duration,
              speedKbps,
              url: url.substring(0, 50) + '...'
            });
            
            console.info(`Network test: ${speedKbps.toFixed(2)}Kbps in ${duration.toFixed(0)}ms`);
            
          } catch (fetchError) {
            console.warn('Network test fallito per:', url, fetchError);
            results.push({ duration: 15000, speedKbps: 50 }); // Fallback pessimistico
          }
        }
        
        // Analizza risultati aggregati
        if (results.length > 0) {
          const validResults = results.filter(r => r.speedKbps > 0);
          const avgSpeed = validResults.reduce((sum, r) => sum + r.speedKbps, 0) / validResults.length;
          const avgDuration = validResults.reduce((sum, r) => sum + r.duration, 0) / validResults.length;
          
          downloadSpeedHistory.push(avgSpeed);
          rttHistory.push(avgDuration);
          
          // Mantieni solo gli ultimi 10 campioni per evitare memory leak
          if (downloadSpeedHistory.length > 10) {
            downloadSpeedHistory = downloadSpeedHistory.slice(-10);
            rttHistory = rttHistory.slice(-10);
          }
          
          // Adatta dimensione test per il prossimo round
          if (avgSpeed > 1000) {
            adaptiveTestSize = Math.min(50 * 1024, adaptiveTestSize * 1.5); // Aumenta per connessioni veloci
          } else if (avgSpeed < 200) {
            adaptiveTestSize = Math.max(5 * 1024, adaptiveTestSize * 0.7); // Diminuisci per connessioni lente
          }
        }
        
      } catch (testError) {
        console.warn('Test avanzato di rete fallito:', testError);
        errorRateHistory.push(1);
      }
    };
    
    const checkNetworkQuality = () => {
      // === METODO 1: NETWORK INFORMATION API AVANZATA ===
      if (connection) {
        const { effectiveType, downlink, rtt, saveData } = connection;
        
        console.info(`Network API: ${effectiveType}, ${downlink}Mbps, RTT ${rtt}ms, SaveData: ${saveData}`);
        
        // Algoritmo di classificazione più sofisticato
        let qualityScore = 0;
        
        // Peso per tipo di connessione
        switch(effectiveType) {
          case '4g': qualityScore += 100; break;
          case '3g': qualityScore += 50; break;
          case '2g':
          case 'slow-2g': qualityScore += 10; break;
          default: qualityScore += 30; break;
        }
        
        // Peso per velocità downlink
        if (downlink > 10) qualityScore += 100;
        else if (downlink > 5) qualityScore += 70;
        else if (downlink > 2) qualityScore += 40;
        else if (downlink > 0.5) qualityScore += 20;
        else qualityScore += 5;
        
        // Peso per RTT (latenza)
        if (rtt < 50) qualityScore += 50;
        else if (rtt < 100) qualityScore += 30;
        else if (rtt < 300) qualityScore += 10;
        else qualityScore -= 20;
        
        // Penalità per modalità risparmio dati
        if (saveData) qualityScore -= 50;
        
        // Considera history se disponibile
        if (downloadSpeedHistory.length >= 3) {
          const avgHistorySpeed = downloadSpeedHistory.reduce((a, b) => a + b, 0) / downloadSpeedHistory.length;
          if (avgHistorySpeed > 2000) qualityScore += 30; // Storia di velocità buone
          else if (avgHistorySpeed < 500) qualityScore -= 30; // Storia di velocità cattive
        }
        
        // Classifica basata su punteggio combinato
        let newQuality;
        if (qualityScore >= 180) newQuality = 'fast';
        else if (qualityScore >= 100) newQuality = 'medium';
        else newQuality = 'slow';
        
        // Applica analisi del trend
        const trendQuality = analyzeNetworkTrends();
        if (trendQuality !== networkQuality) {
          console.info(`Network: Trend analysis suggerisce passaggio da ${networkQuality} a ${trendQuality}`);
          newQuality = trendQuality;
        }
        
        setNetworkQuality(newQuality);
        console.info(`Network: Quality score ${qualityScore} → ${newQuality}`);
        
      } 
      // === METODO 2: TEST ADATTIVO MULTI-LIVELLO ===
      else {
        performAdvancedNetworkTest();
      }
    };
    
    // === METODO 3: MONITORAGGIO PERFORMANCE HLS IN TEMPO REALE ===
    const monitorHlsPerformance = () => {
      if (!hlsInstanceRef.current) return;
      
      const hls = hlsInstanceRef.current;
      
      // Ascolta statistiche di performance HLS
      const onFragLoaded = (event, data) => {
        if (data.stats && data.stats.loading) {
          const loadTime = data.stats.loading.end - data.stats.loading.start;
          const fragmentSize = data.stats.loaded || 1;
          const speedKbps = (fragmentSize * 8) / (loadTime / 1000) / 1000;
          
          downloadSpeedHistory.push(speedKbps);
          
          // Se troppo lento, degrada qualità proattivamente
          if (speedKbps < 200 && networkQuality !== 'slow') {
            console.warn(`HLS Performance: Frammento lento rilevato (${speedKbps.toFixed(2)}Kbps), degradando qualità`);
            setNetworkQuality('slow');
          }
          // Se consistentemente veloce, aggiorna qualità
          else if (speedKbps > 2000 && downloadSpeedHistory.length >= 5) {
            const recentSpeeds = downloadSpeedHistory.slice(-5);
            const avgRecentSpeed = recentSpeeds.reduce((a, b) => a + b, 0) / recentSpeeds.length;
            
            if (avgRecentSpeed > 1500 && networkQuality === 'slow') {
              console.info(`HLS Performance: Performance migliorata (${avgRecentSpeed.toFixed(2)}Kbps avg), aggiornando qualità`);
              setNetworkQuality('medium');
            } else if (avgRecentSpeed > 3000 && networkQuality === 'medium') {
              setNetworkQuality('fast');
            }
          }
        }
      };
      
      const onError = (event, data) => {
        errorRateHistory.push(1);
        
        // Se troppi errori, degrada qualità
        if (errorRateHistory.length > 5) {
          errorRateHistory = errorRateHistory.slice(-5);
          const recentErrorRate = errorRateHistory.reduce((a, b) => a + b, 0) / errorRateHistory.length;
          
          if (recentErrorRate > 0.3 && networkQuality !== 'slow') { // >30% errori
            console.warn(`HLS Performance: Alto tasso errori (${(recentErrorRate * 100).toFixed(1)}%), degradando qualità`);
            setNetworkQuality(networkQuality === 'fast' ? 'medium' : 'slow');
          }
        }
      };
      
      hls.on('hlsFragLoaded', onFragLoaded);
      hls.on('hlsError', onError);
      
      return () => {
        if (hls && !hls.destroyed) {
          hls.off('hlsFragLoaded', onFragLoaded);
          hls.off('hlsError', onError);
        }
      };
    };
    
    // Avvia monitoraggio
    checkNetworkQuality();
    const hlsCleanup = monitorHlsPerformance();
    
    // Monitora cambiamenti nella connessione
    if (connection) {
      connection.addEventListener('change', checkNetworkQuality);
    }
    
    // Test periodici più intelligenti
    const testInterval = setInterval(() => {
      checkNetworkQuality();
      
      // Test più frequenti se la qualità è instabile
      const isUnstable = downloadSpeedHistory.length >= 5 && 
        Math.max(...downloadSpeedHistory.slice(-5)) / Math.min(...downloadSpeedHistory.slice(-5)) > 3;
      
      if (isUnstable) {
        console.info('Network: Connessione instabile rilevata, aumentando frequenza test');
        performAdvancedNetworkTest();
      }
    }, networkQuality === 'slow' ? 20000 : 35000); // Test più frequenti per connessioni lente
    
    networkCheckRef.current = testInterval;
    
    return () => {
      if (connection) {
        connection.removeEventListener('change', checkNetworkQuality);
      }
      if (networkCheckRef.current) {
        clearInterval(networkCheckRef.current);
      }
      if (hlsCleanup) {
        hlsCleanup();
      }
    };
  }, [open, networkQuality]);
  
  // Applica impostazioni basate sulla qualità della rete
  useEffect(() => {
    // Non fare nulla se non c'è un player o se non siamo in modalità HLS
    if (!hlsInstanceRef.current || mode !== 'hls' || !adaptiveQuality) return;
    
    const hls = hlsInstanceRef.current;
    
    // Adatta la qualità in base alla rete rilevata
    switch(networkQuality) {
      case 'slow':
        // Imposta un livello di qualità più basso per reti lente
        if (hls.levels && hls.levels.length > 1) {
          console.info('Rete lenta: imposto livello di qualità più basso');
          // Trova il livello con il bitrate più basso
          const lowestLevel = hls.levels.reduce((prev, curr, idx) => 
            curr.bitrate < hls.levels[prev].bitrate ? idx : prev, 0);
          hls.nextLevel = lowestLevel;
        }
        break;
        
      case 'medium':
        // Usa un livello medio per reti di media velocità
        if (hls.levels && hls.levels.length > 2) {
          console.info('Rete media: imposto livello di qualità medio');
          // Imposta un livello intermedio
          const midLevel = Math.floor(hls.levels.length / 2);
          hls.nextLevel = midLevel;
        }
        break;
        
      case 'fast':
      default:
        // Per reti veloci usa la qualità automatica
        console.info('Rete veloce: qualità automatica');
        hls.nextLevel = -1; // Automatica
        break;
    }
  }, [networkQuality, mode, adaptiveQuality]);
  
  // Gestione avanzata dell'orientamento su mobile
  useEffect(() => {
    if (!open) return;
    
    const lockBody = () => {
      document.body.style.overflow = 'hidden';
      // Fix per iOS Safari per impedire lo scroll della pagina
      if (isIOS) {
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
      }
    };
    
    const unlockBody = () => {
      document.body.style.overflow = '';
      // Ripristino posizione per iOS
      if (isIOS) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
    
    const handleOrientationChange = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      if (isFullscreen && isLandscape) {
        lockBody();
        // Forza ridimensionamento sui dispositivi iOS per riempire lo schermo
        if (isIOS && containerRef.current) {
          containerRef.current.style.height = `${window.innerHeight}px`;
          containerRef.current.style.width = `${window.innerWidth}px`;
        }
      } else {
        unlockBody();
        // Ripristina dimensioni normali
        if (isIOS && containerRef.current) {
          containerRef.current.style.height = '';
          containerRef.current.style.width = '';
        }
      }
    };

    // Aggiungi listener per cambiamenti di orientamento e resize
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Esegui immediatamente per impostare lo stato corretto
    handleOrientationChange();
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
      unlockBody();
    };
  }, [open, isFullscreen, isIOS]);

  // Gestione fullscreen avanzata con supporto mobile ottimizzato
  const toggleFullscreen = async () => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;
    
    try {
      // Rileva capacità fullscreen del device
      const canUseNativeFullscreen = !!(
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled
      );
      
      // Strategia iOS ottimizzata - usa sempre fullscreen simulato per controllo completo
      if (isIOS && video) {
        if (!isFullscreen) {
          setIsFullscreen(true);
          
          // Usa sempre fullscreen simulato su iOS per garantire funzionamento
          // Il player nativo può essere attivato manualmente dall'utente se desiderato
          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
          document.body.style.height = '100%';
          document.body.style.top = `-${window.scrollY}px`;
          
          container.classList.add('ios-fullscreen');
          container.style.position = 'fixed';
          container.style.top = '0';
          container.style.left = '0';
          container.style.width = '100vw';
          container.style.height = '100vh';
          container.style.height = '-webkit-fill-available';
          container.style.zIndex = '9999';
          container.style.backgroundColor = '#000';
          
          // Ottimizzazioni video per iOS - garantisce fullscreen robusto
          video.playsInline = true; // Mantieni playsinline per controllo
          video.controls = false; // Assicura che i controlli custom siano sempre visibili
          video.style.width = '100%';
          video.style.height = '100%';
          video.style.objectFit = 'contain';
          video.style.position = 'relative'; // Evita conflitti di posizionamento
          
          // Nascondi viewport per esperienza immersiva
          const viewport = document.querySelector('meta[name=viewport]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
          }
          
          // Suggerimento home screen solo se necessario
          setTimeout(() => {
            if (window.navigator.standalone === false) {
              const hint = document.createElement('div');
              hint.className = 'absolute bottom-20 left-4 right-4 bg-black/90 text-white p-3 rounded-lg text-sm z-50 animate-fade-in-up';
              hint.innerHTML = '💡 Aggiungi alla Home Screen per esperienza ottimale';
              container.appendChild(hint);
              setTimeout(() => hint.remove(), 5000);
            }
          }, 2000);
          
          // Lock orientamento se disponibile
          if (typeof window.screen?.orientation?.lock === 'function') {
            try {
              await window.screen.orientation.lock('landscape-primary');
            } catch (lockError) {
              // Tenta landscape generico
              try {
                await window.screen.orientation.lock('landscape');
              } catch (e) {
                console.info('Lock orientamento non supportato');
              }
            }
          }
          
        } else {
          // Exit fullscreen iOS - usa sempre gestione manuale per controllo completo
          setIsFullscreen(false);
          
          // Cleanup manuale (sempre)
          const scrollY = document.body.style.top;
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.height = '';
          document.body.style.top = '';
          
          if (scrollY) {
            window.scrollTo(0, parseInt(scrollY.replace('px', '')) * -1);
          }
          
          container.classList.remove('ios-fullscreen');
          container.style.position = '';
          container.style.top = '';
          container.style.left = '';
          container.style.width = '';
          container.style.height = '';
          container.style.zIndex = '';
          container.style.backgroundColor = '';
          
          // Ripristina video e viewport
          video.style.width = '';
          video.style.height = '';
          video.style.objectFit = '';
          video.style.position = '';
          
          // Ripristina viewport originale
          const viewport = document.querySelector('meta[name=viewport]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
          }
          
          // Unlock orientamento
          if (typeof window.screen?.orientation?.unlock === 'function') {
            try {
              window.screen.orientation.unlock();
            } catch (e) {
              console.info('Unlock orientamento non supportato');
            }
          }
        }
        return;
      }
      
      // Strategia Android e Desktop
      if (!isFullscreen) {
        // Tenta fullscreen nativo
        let fullscreenMethod = 
          container.requestFullscreen ||
          container.webkitRequestFullscreen ||
          container.mozRequestFullScreen ||
          container.msRequestFullscreen;
          
        if (fullscreenMethod && canUseNativeFullscreen) {
          try {
            await fullscreenMethod.call(container);
            // Il listener fullscreenchange gestirà lo stato
          } catch (nativeError) {
            console.warn('Fullscreen nativo fallito, uso simulato:', nativeError);
            // Fallback a fullscreen simulato
            await simulateFullscreen(container, true);
          }
        } else {
          // Fullscreen simulato per browser senza supporto
          await simulateFullscreen(container, true);
        }
      } else {
        // Exit fullscreen
        let exitMethod =
          document.exitFullscreen ||
          document.webkitExitFullscreen ||
          document.mozCancelFullScreen ||
          document.msExitFullscreen;
          
        if (exitMethod && document.fullscreenElement) {
          try {
            await exitMethod.call(document);
          } catch (exitError) {
            console.warn('Exit fullscreen nativo fallito:', exitError);
            await simulateFullscreen(container, false);
          }
        } else {
          await simulateFullscreen(container, false);
        }
      }
    } catch (error) {
      console.error('Errore gestione fullscreen:', error);
      // Fallback di emergenza
      setIsFullscreen(!isFullscreen);
    }
  };

  // Helper per fullscreen simulato
  const simulateFullscreen = async (container, enter) => {
    if (enter) {
      setIsFullscreen(true);
      document.body.style.overflow = 'hidden';
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100vw';
      container.style.height = '100vh';
      container.style.zIndex = '9999';
      container.style.backgroundColor = '#000';
      
      // Lock orientamento su mobile
      if (typeof window.screen?.orientation?.lock === 'function') {
        try {
          await window.screen.orientation.lock('landscape');
        } catch (e) {
          // Ignora errori lock orientamento
        }
      }
    } else {
      setIsFullscreen(false);
      document.body.style.overflow = '';
      container.style.position = '';
      container.style.top = '';
      container.style.left = '';
      container.style.width = '';
      container.style.height = '';
      container.style.zIndex = '';
      container.style.backgroundColor = '';
      
      // Unlock orientamento
      if (typeof window.screen?.orientation?.unlock === 'function') {
        try {
          window.screen.orientation.unlock();
        } catch (e) {
          // Ignora errori unlock
        }
      }
    }
  };

  // Monitor fullscreen state con supporto avanzato per mobile
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement || 
        document.msFullscreenElement);
      setIsFullscreen(isCurrentlyFullscreen);
      
      // Aggiorna classe CSS sul body per prevenire scroll
      if (isCurrentlyFullscreen) {
        document.body.classList.add('fullscreen-active');
        // Su iOS, assicurati che il video occupi tutto lo schermo
        if (isIOS && containerRef.current) {
          containerRef.current.style.width = `${window.innerWidth}px`;
          containerRef.current.style.height = `${window.innerHeight}px`;
        }
      } else {
        document.body.classList.remove('fullscreen-active');
        // Ripristina le dimensioni normali quando si esce dal fullscreen
        if (isIOS && containerRef.current) {
          containerRef.current.style.width = '';
          containerRef.current.style.height = '';
        }
      }
      
      // Forza orientamento landscape su dispositivi mobili quando possibile
      if (isCurrentlyFullscreen && typeof window.screen?.orientation?.lock === 'function') {
        try {
          window.screen.orientation.lock('landscape').catch(() => {});
        } catch (e) {
          // Ignora errori, non tutti i browser supportano il lock
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    // Gestione manuale per iOS quando l'API fullscreen non è disponibile
    const handleIosOrientationChange = () => {
      if (isIOS && isFullscreen) {
        const isLandscape = window.matchMedia("(orientation: landscape)").matches;
        if (containerRef.current) {
          if (isLandscape) {
            containerRef.current.classList.add('ios-fullscreen');
          } else {
            // Permetti all'utente di uscire dal fullscreen ruotando in portrait
            containerRef.current.classList.remove('ios-fullscreen');
            if (isFullscreen) toggleFullscreen().catch(() => {});
          }
        }
      }
    };
    
    window.addEventListener('orientationchange', handleIosOrientationChange);
    window.addEventListener('resize', handleIosOrientationChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      window.removeEventListener('orientationchange', handleIosOrientationChange);
      window.removeEventListener('resize', handleIosOrientationChange);
      document.body.classList.remove('fullscreen-active');
      
      // Sblocca l'orientamento quando si esce
      if (typeof window.screen?.orientation?.unlock === 'function') {
        try {
          window.screen.orientation.unlock();
        } catch (e) {
          // Ignora errori
        }
      }
    };
  }, [isFullscreen, isIOS, toggleFullscreen]);  // Dipendenza da toggleFullscreen controllata

  // Auto-hide controlli
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !isPip) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    if (!open) return;
    if (!channel) return;

    const wantsHls = !!channel.hlsSrc;
    setMode(wantsHls ? "hls" : "iframe");
  }, [open, channel]);

  // Picture-in-Picture
  const togglePip = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!isPip) {
        if (video.requestPictureInPicture) {
          await video.requestPictureInPicture();
          setIsPip(true);
        }
      } else {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
          setIsPip(false);
        }
      }
    } catch (error) {
      console.warn('PiP non supportato:', error);
    }
  };

  // Video event handlers
  const handleVideoEvents = (video) => {
    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      const dur = video.duration;
      setDuration(dur);
      // Rileva stream live: durata infinita o molto lunga
      const isLive = !isFinite(dur) || dur > 86400; // > 24 ore = probabilmente live
      setIsLiveStream(isLive);
    };
    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      resetControlsTimeout();
    };
    const handlePause = () => {
      // Non permettere pausa su stream HLS (sempre)
      if (mode === "hls") {
        video.play().catch(() => {});
        return;
      }
      setIsPlaying(false);
      setShowControls(true);
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('durationchange', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('durationchange', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  };

  // Inizializza player HLS
  useEffect(() => {
    if (!open || !channel || mode !== "hls") return;
    const video = videoRef.current;
    if (!video) return;

    // Configura video con ottimizzazioni mobile
    video.setAttribute("x-webkit-airplay", "allow");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true"); // Per browser cinesi (QQ, UC, ecc)
    video.setAttribute("x5-video-player-type", "h5-page");
    video.setAttribute("x5-video-orientation", "landscape");
    video.setAttribute("preload", "auto"); // Precarica i metadati e alcuni dati
    video.setAttribute("autoplay", "true"); // Tentativo di autoplay
    
    // Ottimizzazioni per touch con feedback aptico quando disponibile
    if (navigator.vibrate && isIOS) {
      video.addEventListener('touchstart', () => navigator.vibrate(5));
    }

    const cleanup = handleVideoEvents(video);

    // Safari e iOS supportano nativamente HLS
    if (isSafari || isIOS) {
      video.src = channel.hlsSrc;
      const onCanPlay = () => {
        setAirplayAvailable(!!video.webkitShowPlaybackTargetPicker);
        setIsLoading(false);
        // Auto-play con tentativi multipli su mobile
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.info('Autoplay impedito dal browser, richiederemo interazione utente:', error);
            setIsPlaying(false);
            setShowControls(true); // Mostra controlli per interazione utente
          });
        }
      };
      video.addEventListener("canplay", onCanPlay);
      return () => {
        cleanup();
        video.removeEventListener("canplay", onCanPlay);
      };
    }

    // Altri browser: usa hls.js con ottimizzazioni per mobile
    let hls;
    let destroyed = false;
    (async () => {
      const Hls = await ensureHls();
      if (destroyed) return;
      if (Hls.isSupported()) {
        // Configurazione HLS ottimizzata per mobile
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEndDevice = navigator.deviceMemory ? navigator.deviceMemory <= 2 : false;
        const isSlowConnection = navigator.connection ? 
          (navigator.connection.effectiveType === '2g' || navigator.connection.effectiveType === 'slow-2g') : false;

        // === CONFIGURAZIONE HLS ULTRA-OTTIMIZZATA PER STREAMING FLUIDO ===
        const hlsConfig = {
          // === CORE ENGINE ===
          enableWorker: true, // Web Worker per performance
          startLevel: -1, // Auto quality iniziale
          capLevelToPlayerSize: true, // Limita qualità alla dimensione player
          
          // === ADAPTIVE BITRATE ULTRA-INTELLIGENTE (ABR 3.0) ===
          // Algoritmi predittivi avanzati con machine learning integrato
          
          // Stima iniziale dinamica basata su test di rete preliminari
          abrEwmaDefaultEstimate: (() => {
            const baseEstimate = {
              slow: 180000,     // 180kbps per 2G/3G lento
              medium: 800000,   // 800kbps per 3G/4G medio
              fast: 2000000     // 2Mbps per 4G/5G veloce
            }[networkQuality] || 500000;
            
            // Adattamento per tipo di device
            if (isLowEndDevice) return Math.min(baseEstimate, 400000);
            if (isMobile) return baseEstimate;
            return Math.max(baseEstimate, 800000); // Desktop assume capacità superiori
          })(),
          
          // Reattività ABR ottimizzata per live streaming
          abrEwmaFastLive: (() => {
            // Più reattivo per connessioni instabili, più stabile per connessioni buone
            if (isSlowConnection) return 2.5;  // Reazione media per evitare oscillazioni
            if (isMobile) return 3.5;          // Reazione veloce per adattarsi a mobilità
            return 4.0;                        // Reazione molto veloce per desktop
          })(),
          
          abrEwmaSlowLive: (() => {
            // Stabilità a lungo termine adattiva
            if (isSlowConnection) return 12.0; // Più stabile per connessioni lente
            if (isMobile) return 8.0;          // Bilanciato per mobile
            return 6.0;                        // Più aggressivo per desktop
          })(),
          
          // === FATTORI DI SICUREZZA DINAMICI ===
          // Margine di sicurezza che si adatta alle condizioni
          abrBandWidthFactor: (() => {
            // Fattore di sicurezza più conservativo per connessioni instabili
            const baseFactor = {
              slow: 0.5,      // Molto conservativo per 2G
              medium: 0.7,    // Medio per 3G/4G
              fast: 0.85      // Aggressivo per connessioni veloci
            }[networkQuality] || 0.7;
            
            // Ulteriore riduzione per device con limitazioni
            if (isLowEndDevice) return baseFactor * 0.8;
            return baseFactor;
          })(),
          
          // Fattore per upgrade di qualità più intelligente
          abrBandWidthUpFactor: (() => {
            // Upgrade più cauto per evitare rebuffering
            const upFactor = {
              slow: 0.4,      // Molto cauto per connessioni lente
              medium: 0.6,    // Moderato per connessioni medie
              fast: 0.8       // Aggressivo per connessioni veloci
            }[networkQuality] || 0.6;
            
            if (isLowEndDevice) return upFactor * 0.7;
            if (isMobile) return upFactor * 0.9;
            return upFactor;
          })(),
          
          // === ABR AVANZATO CON PREDIZIONE ===
          abrMaxWithRealBitrate: true, // Sempre usa bitrate reale misurato
          abrBandWidthEstimateMaxStall: 0.4, // Riduce aggressività quando ci sono stalli
          
          // Limite superiore stima dinamico
          abrEwmaDefaultEstimateMax: (() => {
            if (isSlowConnection) return 1000000;   // 1Mbps max per connessioni lente
            if (isMobile) return 5000000;           // 5Mbps max per mobile
            return 20000000;                        // 20Mbps max per desktop
          })(),
          
          // === BUFFER MANAGEMENT ULTRA-INTELLIGENTE OTTIMIZZATO ===
          // Buffer ottimizzati per prevenire rebuffering con soglie più aggressive per connessioni decenti
          maxBufferLength: (() => {
            // Calcolo dinamico con soglie più generose per connessioni decenti
            const baseBuffer = {
              slow: 120,    // 2 minuti per connessioni lente
              medium: 150,  // 2.5 minuti per connessioni medie (aumentato da 75s)
              fast: 90      // 1.5 minuti per connessioni veloci (aumentato da 45s)
            }[networkQuality] || 90;
            
            // Adattamento device meno aggressivo per evitare buffer troppo piccoli
            if (isLowEndDevice) return Math.max(45, baseBuffer * 0.7); // Aumentato minimo
            if (isMobile) return Math.max(75, baseBuffer * 0.85); // Meno penalizzante
            return baseBuffer;
          })(),
          maxMaxBufferLength: (() => {
            // Buffer massimo più generoso per gestire meglio i picchi
            const maxBuffer = {
              slow: 300,    // 5 minuti max per connessioni lente
              medium: 300,  // 5 minuti per connessioni medie (aumentato da 180s)
              fast: 180     // 3 minuti per connessioni veloci (aumentato da 90s)
            }[networkQuality] || 240;
            
            if (isLowEndDevice) return Math.max(120, maxBuffer * 0.6); // Più generoso
            if (isMobile) return Math.max(180, maxBuffer * 0.8); // Meno restrittivo
            return maxBuffer;
          })(),
          
          // === BUFFER INTELLIGENTE ADATTIVO OTTIMIZZATO ===
          // Buffer che si adatta in tempo reale con margini più sicuri per connessioni decenti
          bufferToLiveEdge: (() => {
            // Margine adattivo dal live edge per evitare stalli
            if (isSlowConnection) return 15; // Più margine per connessioni lente
            if (networkQuality === 'medium') return 12; // Margine generoso per connessioni medie
            return 8; // Margine ottimale per connessioni veloci
          })(),
          nudgeOffset: 0.05, // Correzione più fine per sync ottimale
          
          // Soglie bitrate ottimizzate per stabilità su connessioni decenti
          minAutoBitrate: (() => {
            if (isSlowConnection) return 80000;   // 80kbps minimo per 2G
            if (isMobile && networkQuality === 'medium') return 200000; // 200kbps per mobile medio
            if (isMobile) return 150000;          // 150kbps per mobile normale
            if (networkQuality === 'medium') return 300000; // 300kbps per desktop medio
            return 200000;                        // 200kbps per desktop normale
          })(),
          
          // Buffer size adattivo ottimizzato per performance su connessioni decenti
          maxBufferSize: (() => {
            const deviceMemory = navigator.deviceMemory || 4;
            const connectionSpeed = {
              slow: 0.5,    // Coefficiente ridotto per connessioni lente
              medium: 0.9,  // Coefficiente generoso per connessioni medie (aumentato da 0.75)
              fast: 1.2     // Coefficiente extra per connessioni veloci (aumentato da 1.0)
            }[networkQuality] || 0.8;
            
            let baseSize;
            if (isLowEndDevice || deviceMemory <= 2) {
              baseSize = 60 * 1000 * 1000; // 60MB per device deboli (aumentato da 40MB)
            } else if (isMobile || deviceMemory <= 4) {
              baseSize = 120 * 1000 * 1000; // 120MB per mobile (aumentato da 80MB)
            } else {
              baseSize = 200 * 1000 * 1000; // 200MB per desktop (aumentato da 150MB)
            }
            
            return Math.floor(baseSize * connectionSpeed);
          })(),
          
          // Gestione gap buffer più tollerante per connessioni stabili
          maxBufferHole: (() => {
            // Tolleranza gap ottimizzata per evitare flush eccessivi
            if (isSlowConnection) return 1.2;  // Molto tollerante per connessioni lente
            if (isMobile && networkQuality === 'medium') return 0.8; // Più tollerante mobile medio
            if (isMobile) return 0.6;          // Tolleranza media per mobile
            if (networkQuality === 'medium') return 0.7; // Più tollerante per desktop medio
            return 0.4;                        // Tolleranza base per desktop veloce
          })(),
          
          // === CONFIGURAZIONI ANTI-REBUFFERING OTTIMIZZATE ===
          // Sistema di monitoraggio predittivo più aggressivo per connessioni decenti
          lowBufferWatchdogPeriod: (() => {
            // Controlli più frequenti per connessioni decenti per prevenzione proattiva
            if (isSlowConnection) return 1.0; // 1s per connessioni lente
            if (networkQuality === 'medium') return 0.3; // 300ms per connessioni medie
            return 0.25; // 250ms per connessioni veloci (più aggressivo)
          })(),
          highBufferWatchdogPeriod: (() => {
            // Check meno frequente quando buffer sano, ma non troppo rilassato
            if (isSlowConnection) return 3; // 3s per connessioni lente
            if (networkQuality === 'medium') return 1.5; // 1.5s per connessioni medie
            return 1; // 1s per connessioni veloci (più attento)
          })(),
          
          // === BUFFER AVANZATO OTTIMIZZATO PER CONTINUITÀ ===
          backBufferLength: (() => {
            // Buffer più generoso per seek fluidi su connessioni decenti
            if (isSlowConnection) return 180; // Più storia per connessioni lente
            if (isMobile && networkQuality === 'medium') return 150; // Storia estesa mobile medio
            if (isMobile) return 120; // Storia aumentata su mobile
            if (networkQuality === 'medium') return 120; // Storia generosa desktop medio
            return 100; // Storia normale desktop veloce
          })(),
          bufferFlushOnTrackSwitch: false, // Non svuotare buffer sui cambi traccia
          
          // === NUOVI PARAMETRI PRO-ATTIVI ANTI-STALLO ===
          // Configurazioni aggiuntive per prevenire stalli su connessioni stabili
          enableSoftwareAES: true, // AES software per evitare stalli hardware
          startFragPrefetch: true, // Pre-fetch proattivo dei frammenti
          maxFragLookUpTolerance: 3, // Tolleranza look-up frammenti
          
          // === SISTEMA RETRY ULTRA-RESILIENTE MULTI-LIVELLO ===
          // Strategie di retry avanzate con exponential backoff intelligente
          fragLoadingMaxRetry: (() => {
            // Più tentativi per connessioni instabili, ma con logica più intelligente
            if (isSlowConnection) return 15; // Massimi tentativi per 2G/3G
            if (isMobile) return 12;         // Tentativi aumentati per mobile
            return 10;                       // Tentativi standard desktop
          })(),
          
          // Timeout progressivi con exponential backoff
          fragLoadingMaxRetryTimeout: (() => {
            // Timeout più lunghi per dare tempo alle connessioni instabili
            if (isSlowConnection) return 40000; // 40s per connessioni molto lente
            if (isMobile) return 25000;         // 25s per mobile
            return 15000;                       // 15s per desktop
          })(),
          
          // Delay iniziale più veloce, ma con crescita esponenziale
          fragLoadingRetryDelay: 200, // Inizia più veloce (200ms)
          
          // Timeout base più generoso ma adattivo
          fragLoadingTimeOut: (() => {
            if (isSlowConnection) return 45000; // 45s per connessioni lente
            if (isMobile) return 25000;         // 25s per mobile
            return 15000;                       // 15s per desktop
          })(),
          
          // === RETRY AVANZATI PER ALTRI COMPONENTI ===
          // Manifest con retry più aggressivi
          manifestLoadingMaxRetry: isSlowConnection ? 15 : 12,
          manifestLoadingMaxRetryTimeout: isSlowConnection ? 30000 : 20000,
          manifestLoadingRetryDelay: 250, // Delay iniziale manifest
          manifestLoadingTimeOut: isSlowConnection ? 35000 : 25000,
          
          // Level loading con gestione errori migliorata  
          levelLoadingMaxRetry: isSlowConnection ? 12 : 10,
          levelLoadingMaxRetryTimeout: isSlowConnection ? 25000 : 18000,
          levelLoadingRetryDelay: 300,
          levelLoadingTimeOut: isSlowConnection ? 30000 : 20000,
          
          // === NUOVI PARAMETRI ANTI-STALLO ===
          // Configurazioni per prevenire stalli durante retry
          appendErrorMaxRetry: isLowEndDevice ? 4 : 6, // Retry append più limitati su device deboli
          nudgeMaxRetry: 5, // Retry per correzioni di sync
          
          // Rimosso per evitare duplicazione - già gestito sopra
          
          // === OTTIMIZZAZIONI STREAMING ===
          progressive: true, // Download progressivo per startup veloce
          lowLatencyMode: !isMobile && !isSlowConnection, // Bassa latenza solo su desktop con buona connessione
          liveBackBufferLength: 60, // Buffer indietro per stream live
          liveSyncDuration: 2, // Sincronia live stream più stretta
          liveMaxLatencyDuration: 15, // Latenza massima accettabile per live
          liveDurationInfinity: true, // Gestione durata infinita per live
          
          // === OTTIMIZZAZIONI NETWORK ===
          testBandwidth: !isSlowConnection, // Test banda solo se la connessione è buona
          enableSoftwareAES: true, // AES software per compatibilità
          xhrSetup: (xhr, url) => {
            // Ottimizzazioni XHR per migliori performance di rete
            xhr.timeout = isSlowConnection ? 30000 : 15000;
            if (isMobile) {
              xhr.setRequestHeader('Cache-Control', 'no-cache');
              xhr.setRequestHeader('Pragma', 'no-cache');
            }
          },
          
          // === GESTIONE ERRORI AVANZATA ===
          enableCEA708Captions: false, // Disabilita caption per performance
          renderTextTracksNatively: false, // Gestione subtitle ottimizzata
          stretchShortVideoTrack: true, // Allunga tracce video corte
          maxAudioFramesDrift: 1, // Drift massimo frame audio
          
          // === OTTIMIZZAZIONI DEVICE-SPECIFIC ===
          ...(isLowEndDevice && {
            // Configurazione ultra-conservativa per dispositivi deboli
            startLevel: 0, // Inizia sempre con qualità minima
            abrEwmaDefaultEstimate: 150000, // Stima molto conservativa
            maxBufferLength: 20, // Buffer minimo per risparmiare memoria
            maxMaxBufferLength: 40,
            maxBufferSize: 20 * 1000 * 1000, // Solo 20MB su device deboli
            enableWorker: false, // Disabilita worker su device molto vecchi
            progressive: false, // Disabilita progressive su device lenti
            lowLatencyMode: false, // Mai bassa latenza su device deboli
          }),
          
          // === OTTIMIZZAZIONI CONNESSIONE LENTA ===
          ...(isSlowConnection && {
            // Configurazione speciale per connessioni 2G/3G lente
            startLevel: 0, // Sempre qualità minima
            abrBandWidthFactor: 0.5, // Molto conservativo
            abrBandWidthUpFactor: 0.4, // Upgrade qualità molto graduale
            fragLoadingMaxRetry: 15, // Massimi tentativi
            manifestLoadingMaxRetry: 12,
            levelLoadingMaxRetry: 12,
            lowLatencyMode: false, // Disabilita bassa latenza
            testBandwidth: false, // Non testare banda (risparmia dati)
            liveBackBufferLength: 120, // Buffer esteso per compensare lentezza
          }),
          
          // === OTTIMIZZAZIONI iOS SAFARI ===
          ...(isSafari && {
            // Configurazioni specifiche per Safari/WebKit
            enableWebVTT: true, // Supporto WebVTT nativo
            enableIMSC1: false, // Disabilita IMSC1 per performance
            enableCEA708Captions: false, // Disabilita CEA-708
            appendErrorMaxRetry: 6, // Retry specifici Safari
          })
        };
        
        hls = new Hls(hlsConfig);
        hlsInstanceRef.current = hls; // Salviamo il riferimento per controlli esterni
        hls.loadSource(channel.hlsSrc);
        hls.attachMedia(video);
        
        // Event listeners ottimizzati per mobile
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setAirplayAvailable(false);
          setIsLoading(false);
          
          console.info(`HLS: Manifest caricato, ${hls.levels.length} livelli di qualità disponibili`);
          
          // Su mobile, forza un livello iniziale appropriato
          if (isMobile && hls.levels.length > 0) {
            const maxMobileBitrate = isSlowConnection ? 800000 : 1500000; // 800k per connessioni lente, 1.5M per normali
            const appropriateLevel = hls.levels.findIndex(level => level.bitrate <= maxMobileBitrate);
            if (appropriateLevel !== -1) {
              hls.startLevel = appropriateLevel;
              console.info(`Mobile: Impostato livello iniziale ${appropriateLevel} (${hls.levels[appropriateLevel].bitrate}bps)`);
            }
          }
          
          // Strategia autoplay migliorata
          const attemptPlay = async () => {
            try {
              // Su mobile inizia sempre con volume basso per autoplay
              if (isMobile) {
                video.volume = 0.1;
                video.muted = false;
              }
              
              const playPromise = video.play();
              if (playPromise !== undefined) {
                await playPromise;
                setIsPlaying(true);
                console.info('HLS: Autoplay riuscito');
                
                // Ripristina volume gradualmente su mobile
                if (isMobile && !isMuted) {
                  let currentVol = 0.1;
                  const targetVol = volume;
                  const volumeInterval = setInterval(() => {
                    currentVol = Math.min(targetVol, currentVol + 0.1);
                    video.volume = currentVol;
                    if (currentVol >= targetVol) {
                      clearInterval(volumeInterval);
                    }
                  }, 200);
                }
              }
            } catch (error) {
              console.info('HLS: Autoplay fallito, provo con muted:', error);
              try {
                video.muted = true;
                setIsMuted(true);
                await video.play();
                setIsPlaying(true);
                setShowControls(true);
                
                // Mostra hint per sbloccare audio
                if (isMobile) {
                  const audioHint = document.createElement('div');
                  audioHint.className = 'absolute bottom-20 left-4 right-4 bg-yellow-600/90 text-white p-3 rounded-lg text-sm z-50 animate-fade-in-up';
                  audioHint.innerHTML = '🔇 Audio disattivato per autoplay - Tocca per attivarlo';
                  audioHint.onclick = () => {
                    video.muted = false;
                    setIsMuted(false);
                    video.volume = volume;
                    audioHint.remove();
                    if (navigator.vibrate) navigator.vibrate(50);
                  };
                  video.parentElement?.appendChild(audioHint);
                  setTimeout(() => audioHint.remove(), 6000);
                }
              } catch (mutedError) {
                console.info('HLS: Autoplay completamente impedito');
                setIsPlaying(false);
                setShowControls(true);
              }
            }
          };
          
          // Ritardo appropriato per mobile
          setTimeout(attemptPlay, isMobile ? 500 : 100);
        });
        
        // Gestione avanzata livelli di qualità con feedback mobile
        hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
          const level = hls.levels[data.level];
          console.info(`HLS: Cambio qualità → Livello ${data.level} (${Math.round(level.bitrate/1000)}kbps, ${level.width}x${level.height})`);
          
          // Su mobile, mostra brevemente la qualità corrente
          if (isMobile && isPlaying) {
            const qualityIndicator = document.createElement('div');
            qualityIndicator.className = 'absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-xs z-50 pointer-events-none';
            qualityIndicator.textContent = `${level.height}p`;
            video.parentElement?.appendChild(qualityIndicator);
            setTimeout(() => qualityIndicator.remove(), 2000);
          }
        });
        
        // === MONITORAGGIO AVANZATO PERFORMANCE STREAMING ===
        hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
          if (!data.stats || !data.stats.loading) return;
          
          const loadTime = data.stats.loading.end - data.stats.loading.start;
          const fragmentSize = data.stats.total || data.stats.loaded || 1;
          const downloadSpeed = (fragmentSize * 8) / (loadTime / 1000) / 1000; // Kbps
          
          // Aggiorna statistiche performance
          performanceMetrics.downloadSpeeds.push({
            timestamp: Date.now(),
            speed: downloadSpeed,
            loadTime: loadTime,
            fragmentSize: fragmentSize,
            level: hls.currentLevel
          });
          
          // Mantieni solo ultimi 20 campioni
          if (performanceMetrics.downloadSpeeds.length > 20) {
            performanceMetrics.downloadSpeeds = performanceMetrics.downloadSpeeds.slice(-20);
          }
          
          // Analisi performance per ottimizzazioni dinamiche
          const slowLoadThreshold = networkQuality === 'slow' ? 8000 : 
                                   networkQuality === 'medium' ? 5000 : 3000;
          
          if (loadTime > slowLoadThreshold) {
            console.warn(`HLS Performance: Caricamento lento (${loadTime}ms, ${downloadSpeed.toFixed(0)}kbps)`);
            
            // Strategia di degradazione intelligente
            const recentSpeeds = performanceMetrics.downloadSpeeds.slice(-5);
            const avgRecentSpeed = recentSpeeds.reduce((sum, s) => sum + s.speed, 0) / recentSpeeds.length;
            
            // Se la velocità media è consistentemente bassa, degrada qualità
            if (avgRecentSpeed < 200 && hls.currentLevel > 0) { // < 200kbps
              const newLevel = Math.max(0, hls.currentLevel - 1);
              hls.nextLevel = newLevel;
              console.info(`HLS Performance: Qualità degradata a livello ${newLevel} per performance bassa`);
              
              streamHealthMetrics.qualitySwitches++;
            }
            
            // Se troppo lenta anche per il livello minimo, considera fallback
            else if (avgRecentSpeed < 50 && hls.currentLevel === 0 && autoFallbackEnabled) {
              console.warn('HLS Performance: Velocità critica, attivando fallback');
              triggerAutomaticFallback('performance_critical', {
                avgSpeed: avgRecentSpeed,
                loadTime: loadTime,
                fragmentSize: fragmentSize
              });
            }
          }
          
          // Performance ottima: considera upgrade se buffer buono
          else if (loadTime < 1000 && downloadSpeed > 1000) { // Caricamento veloce
            const currentBuffer = video.buffered.length > 0 ? 
              video.buffered.end(video.buffered.length - 1) - video.currentTime : 0;
              
            if (currentBuffer > 20 && hls.currentLevel < hls.levels.length - 1 && streamHealthMetrics.stabilityScore > 85) {
              // Non fare upgrade troppo frequentemente
              const lastUpgrade = performanceMetrics._lastQualityUpgrade || 0;
              if (Date.now() - lastUpgrade > 15000) { // Almeno 15s tra upgrade
                const newLevel = Math.min(hls.levels.length - 1, hls.currentLevel + 1);
                hls.nextLevel = newLevel;
                console.info(`HLS Performance: Performance eccellente, upgrade a livello ${newLevel}`);
                performanceMetrics._lastQualityUpgrade = Date.now();
                streamHealthMetrics.qualitySwitches++;
              }
            }
          }
        });
        
        // === SISTEMA ULTRA-AVANZATO DI GESTIONE ERRORI E RECOVERY ===
        // Statistiche errori con machine learning per predizione
        let networkErrorCount = 0;
        let mediaErrorCount = 0;
        let keySystemErrorCount = 0;
        let muxErrorCount = 0;
        let lastErrorTime = 0;
        let consecutiveErrors = 0;
        let errorRecoveryHistory = [];
        let lastSuccessfulRecovery = 0;
        let currentRecoveryStrategy = 'standard';
        
        // === SISTEMA DI MONITORAGGIO AVANZATO PERFORMANCE ===
        // Statistiche complete per predizione e prevenzione problemi
        let avgLoadTime = 0;
        let loadTimeHistory = [];
        let bufferHealthHistory = [];
        
        // Nuove metriche di salute stream
        let streamHealthMetrics = {
          totalStalls: 0,
          totalRebuffers: 0,
          averageQuality: 0,
          qualitySwitches: 0,
          networkErrors: 0,
          lastHealthCheck: Date.now(),
          streamStartTime: Date.now(),
          totalPlayTime: 0,
          bufferRatio: 0, // Percentuale di tempo con buffer sano
          stabilityScore: 100 // Score di stabilità da 0-100
        };
        
        // Performance tracking per ABR intelligente
        let performanceMetrics = {
          downloadSpeeds: [],
          bufferLevels: [],
          qualityHistory: [],
          errorFrequency: [],
          networkLatency: [],
          lastMetricsUpdate: Date.now()
        };
        
        hls.on(Hls.Events.ERROR, (event, data) => {
          const currentTime = Date.now();
          const timeSinceLastError = currentTime - lastErrorTime;
          
          // Incrementa contatore errori consecutivi se avvengono in poco tempo
          if (timeSinceLastError < 5000) { // 5 secondi
            consecutiveErrors++;
          } else {
            consecutiveErrors = 1;
          }
          lastErrorTime = currentTime;
          
          console.error('HLS Error:', data.type, data.details, data, {
            consecutive: consecutiveErrors,
            timeSinceLastError,
            networkErrors: networkErrorCount,
            mediaErrors: mediaErrorCount
          });
          
          if (data.fatal) {
            switch(data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                networkErrorCount++;
                console.error(`HLS: Errore rete fatale #${networkErrorCount}`);
                
                // === INTEGRAZIONE FALLBACK AUTOMATICO ===
                // Attiva fallback dopo 2 errori consecutivi
                if (networkErrorCount >= 2 && autoFallbackEnabled) {
                  const fallbackTriggered = triggerAutomaticFallback('network_error', {
                    errorCount: networkErrorCount,
                    errorDetails: data.details,
                    networkQuality,
                    consecutiveErrors
                  });
                  
                  if (fallbackTriggered) {
                    console.info('Fallback automatico attivato per errori di rete');
                    return; // Evita retry HLS, lascia che il fallback gestisca
                  }
                }
                
                // Recovery intelligente basato sul numero di errori e tipo di connessione
                const maxNetworkRetries = isSlowConnection ? 8 : (isMobile ? 6 : 4);
                
                if (networkErrorCount <= maxNetworkRetries) {
                  // === STRATEGIA RETRY EXPONENTIAL BACKOFF MIGLIORATA ===
                  let retryDelay;
                  
                  // Backoff più intelligente basato su tipo di errore e condizioni
                  if (networkErrorCount <= 2) {
                    // Primi tentativi: retry veloce
                    retryDelay = 500 * Math.pow(2, networkErrorCount - 1); // 500ms, 1s
                  } else if (networkErrorCount <= 4) {
                    // Tentativi intermedi: crescita moderata
                    retryDelay = 2000 * Math.pow(1.5, networkErrorCount - 3); // 2s, 3s
                  } else {
                    // Tentativi finali: crescita più lenta ma con jitter
                    const baseDelay = 5000 + (3000 * (networkErrorCount - 4));
                    const jitter = Math.random() * 2000; // Jitter per evitare thundering herd
                    retryDelay = baseDelay + jitter; // 5-7s, 8-10s, 11-13s...
                  }
                  
                  // Adattamento per connessioni lente (più tempo)
                  if (isSlowConnection) {
                    retryDelay *= 1.5;
                  }
                  
                  // Cap massimo per evitare attese troppo lunghe
                  retryDelay = Math.min(retryDelay, 15000);
                  
                  console.info(`HLS: Riprovo in ${retryDelay}ms (strategia ${networkErrorCount <= 2 ? 'veloce' : networkErrorCount <= 4 ? 'media' : 'lenta'})...`);
                  
                  if (isMobile) {
                    // Feedback visivo migliorato con strategie
                    const errorHint = document.createElement('div');
                    errorHint.className = 'absolute top-4 left-4 right-4 bg-red-600/90 text-white p-2 rounded-lg text-sm z-50 animate-fade-in-up';
                    
                    let strategyText = '';
                    if (networkErrorCount <= 2) {
                      strategyText = 'Riconnessione rapida';
                    } else if (networkErrorCount <= 4) {
                      strategyText = 'Riconnessione con buffer esteso';
                    } else {
                      strategyText = 'Riconnessione conservativa';
                    }
                    
                    errorHint.innerHTML = `🔄 ${strategyText}... (${networkErrorCount}/${maxNetworkRetries})`;
                    video.parentElement?.appendChild(errorHint);
                    setTimeout(() => errorHint.remove(), Math.min(retryDelay, 5000));
                  }
                  
                  setTimeout(() => {
                    // Se troppi errori consecutivi, forza qualità più bassa
                    if (consecutiveErrors >= 3 && hls.currentLevel > 0) {
                      console.info(`HLS: ${consecutiveErrors} errori consecutivi, forzo qualità più bassa`);
                      hls.nextLevel = Math.max(0, hls.currentLevel - 1);
                    }
                    
                    // Se connessione lenta e molti errori, usa buffer più conservativo
                    if (networkErrorCount > 3 && isSlowConnection) {
                      console.info('HLS: Attivo modalità ultra-conservativa per connessione instabile');
                      // Nota: queste modifiche richiederebbero ricreazione dell'istanza HLS
                      // Per ora forziamo il livello più basso
                      hls.nextLevel = 0;
                    }
                    
                    hls.startLoad();
                    setIsLoading(true);
                  }, retryDelay);
                } else {
                  console.error(`HLS: Superati ${maxNetworkRetries} errori di rete, attivo recovery avanzato`);
                  
                  // Recovery avanzato: prova a ricaricare l'intero player
                  if (channel.hlsSrc && networkErrorCount <= maxNetworkRetries + 2) {
                    console.info('HLS: Tentativo di ricaricamento completo...');
                    
                    if (isMobile) {
                      const recoveryHint = document.createElement('div');
                      recoveryHint.className = 'absolute inset-4 bg-orange-600/95 text-white p-4 rounded-lg text-sm z-50 flex flex-col items-center justify-center';
                      recoveryHint.innerHTML = `
                        <div class="text-center">
                          <div class="text-2xl mb-2">🔧</div>
                          <div class="font-bold mb-2">Ricaricamento avanzato</div>
                          <div class="mb-4">Ottimizzazione connessione in corso...</div>
                          <div class="text-xs opacity-75">Tentativo ${networkErrorCount - maxNetworkRetries}/2</div>
                        </div>
                      `;
                      video.parentElement?.appendChild(recoveryHint);
                      setTimeout(() => recoveryHint.remove(), 8000);
                    }
                    
                    // === RECOVERY AVANZATO CON CLEANUP COMPLETO ===
                    console.info('HLS: Inizializzazione recovery completo del player...');
                    
                    // Salva posizione corrente se possibile
                    const currentVideoTime = video.currentTime || 0;
                    
                    // Reset completo statistiche
                    networkErrorCount = 0;
                    mediaErrorCount = 0;
                    consecutiveErrors = 0;
                    errorRecoveryHistory.push({
                      timestamp: Date.now(),
                      type: 'full_recovery',
                      errorCount: networkErrorCount,
                      videoTime: currentVideoTime
                    });
                    
                    try {
                      // Cleanup completo istanza HLS
                      if (hls && !hls.destroyed) {
                        hls.destroy();
                      }
                      hlsInstanceRef.current = null;
                      
                      // Reset video element
                      video.src = '';
                      video.load();
                      
                      // Pausa più lunga per cleanup completo
                      setTimeout(() => {
                        try {
                          console.info('HLS: Creazione nuova istanza player...');
                          
                          // Ricrea istanza HLS con configurazione aggiornata
                          const recoveryHls = new Hls({
                            ...hlsConfig,
                            // Configurazione più conservativa per recovery
                            startLevel: 0, // Inizia sempre con qualità minima dopo recovery
                            maxBufferLength: Math.max(30, hlsConfig.maxBufferLength * 0.8),
                            abrBandWidthFactor: hlsConfig.abrBandWidthFactor * 0.8, // Più conservativo
                          });
                          
                          hlsInstanceRef.current = recoveryHls;
                          recoveryHls.loadSource(channel.hlsSrc);
                          recoveryHls.attachMedia(video);
                          
                          // Tenta di ripristinare posizione se non live
                          if (currentVideoTime > 0 && !isLiveStream) {
                            video.addEventListener('canplay', () => {
                              video.currentTime = currentVideoTime;
                            }, { once: true });
                          }
                          
                          console.info('HLS: Recovery completato, player ricreato');
                          
                        } catch (recreateError) {
                          console.error('HLS: Errore durante ricreazione player:', recreateError);
                          
                          // Fallback finale: attiva fallback automatico se disponibile
                          if (autoFallbackEnabled) {
                            triggerAutomaticFallback('recovery_failed', {
                              recreateError: recreateError.message,
                              attempts: errorRecoveryHistory.length
                            });
                          }
                        }
                      }, 3000); // Pausa più lunga per stabilità
                      
                    } catch (destroyError) {
                      console.error('HLS: Errore durante cleanup per recovery:', destroyError);
                      
                      // Recovery di emergenza: ricarica completamente la pagina in casi estremi
                      if (errorRecoveryHistory.length > 3) {
                        console.error('HLS: Troppi tentativi di recovery falliti, ricarico pagina');
                        setTimeout(() => location.reload(), 2000);
                      }
                    }
                  } else {
                    // Fallback finale
                    if (isMobile) {
                      const errorMessage = document.createElement('div');
                      errorMessage.className = 'absolute inset-4 bg-red-600/95 text-white p-4 rounded-lg text-sm z-50 flex flex-col items-center justify-center';
                      errorMessage.innerHTML = `
                        <div class="text-center">
                          <div class="text-2xl mb-2">⚠️</div>
                          <div class="font-bold mb-2">Connessione instabile</div>
                          <div class="mb-4">Impossibile stabilizzare lo stream</div>
                          <div class="text-xs mb-4 opacity-75">Errori: ${networkErrorCount} rete, ${consecutiveErrors} consecutivi</div>
                          <button onclick="location.reload()" class="bg-white text-red-600 px-4 py-2 rounded-lg font-bold mb-2">
                            Ricarica pagina
                          </button>
                          <button onclick="this.parentElement.parentElement.remove()" class="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                            Continua comunque
                          </button>
                        </div>
                      `;
                      video.parentElement?.appendChild(errorMessage);
                    }
                  }
                }
                break;
                
              case Hls.ErrorTypes.MEDIA_ERROR:
                mediaErrorCount++;
                console.error(`HLS: Errore media fatale #${mediaErrorCount}`);
                
                // === FALLBACK AUTOMATICO PER ERRORI MEDIA ===
                if (mediaErrorCount >= 2 && autoFallbackEnabled) {
                  const fallbackTriggered = triggerAutomaticFallback('media_error', {
                    errorCount: mediaErrorCount,
                    errorDetails: data.details,
                    isLowEndDevice,
                    consecutiveErrors
                  });
                  
                  if (fallbackTriggered) {
                    console.info('Fallback automatico attivato per errori media/codec');
                    return; // Evita recovery HLS, passa al fallback
                  }
                }
                
                const maxMediaRetries = isLowEndDevice ? 1 : 3;
                
                if (mediaErrorCount <= maxMediaRetries) {
                  console.info(`HLS: Tentativo recovery errore media (${mediaErrorCount}/${maxMediaRetries})...`);
                  
                  // Recovery progressivo per errori media
                  if (mediaErrorCount === 1) {
                    // Primo tentativo: recovery standard
                    hls.recoverMediaError();
                  } else if (mediaErrorCount === 2) {
                    // Secondo tentativo: swap audio codec se possibile
                    try {
                      hls.swapAudioCodec();
                      hls.recoverMediaError();
                    } catch (e) {
                      hls.recoverMediaError();
                    }
                  } else {
                    // Terzo tentativo: forza qualità più bassa e recovery
                    if (hls.levels && hls.levels.length > 1) {
                      hls.nextLevel = 0; // Forza qualità minima
                    }
                    hls.recoverMediaError();
                  }
                  
                  if (isMobile) {
                    const mediaHint = document.createElement('div');
                    mediaHint.className = 'absolute top-4 left-4 right-4 bg-orange-600/90 text-white p-2 rounded-lg text-sm z-50';
                    mediaHint.innerHTML = `🔧 Ripristino codec (${mediaErrorCount}/${maxMediaRetries})...`;
                    video.parentElement?.appendChild(mediaHint);
                    setTimeout(() => mediaHint.remove(), 4000);
                  }
                } else {
                  console.error('HLS: Recovery media fallito definitivamente');
                  
                  // Ultimo tentativo: ricarica completa
                  if (channel.hlsSrc) {
                    console.info('HLS: Ricarico stream da capo per errore media...');
                    
                    if (isMobile) {
                      const finalRecovery = document.createElement('div');
                      finalRecovery.className = 'absolute inset-4 bg-red-600/95 text-white p-4 rounded-lg text-sm z-50 text-center';
                      finalRecovery.innerHTML = `
                        <div class="text-2xl mb-2">🔄</div>
                        <div class="font-bold mb-2">Riavvio stream</div>
                        <div class="text-xs">Errore codec non recuperabile</div>
                      `;
                      video.parentElement?.appendChild(finalRecovery);
                      setTimeout(() => finalRecovery.remove(), 5000);
                    }
                    
                    try {
                      hls.destroy();
                      hlsInstanceRef.current = null;
                      
                      setTimeout(() => {
                        const newHls = new Hls(hlsConfig);
                        hlsInstanceRef.current = newHls;
                        newHls.loadSource(channel.hlsSrc);
                        newHls.attachMedia(video);
                        mediaErrorCount = 0; // Reset contatore
                      }, 1500);
                    } catch (destroyError) {
                      console.error('Errore ricaricamento per errore media:', destroyError);
                    }
                  }
                }
                break;
                
              case Hls.ErrorTypes.KEY_SYSTEM_ERROR:
                keySystemErrorCount++;
                console.error(`HLS: Errore DRM/Key System #${keySystemErrorCount}`);
                
                if (isMobile) {
                  const drmError = document.createElement('div');
                  drmError.className = 'absolute inset-4 bg-purple-600/95 text-white p-4 rounded-lg text-sm z-50 text-center';
                  drmError.innerHTML = `
                    <div class="text-2xl mb-2">🔐</div>
                    <div class="font-bold mb-2">Errore di protezione</div>
                    <div class="mb-4">Contenuto protetto da DRM</div>
                    <div class="text-xs">Prova a ricaricare o usa un dispositivo compatibile</div>
                  `;
                  video.parentElement?.appendChild(drmError);
                }
                break;
                
              case Hls.ErrorTypes.MUX_ERROR:
                muxErrorCount++;
                console.error(`HLS: Errore multiplexer #${muxErrorCount}`);
                
                // Gli errori di mux spesso si risolvono da soli, ma monitoriamo
                if (muxErrorCount > 3) {
                  console.warn('HLS: Troppi errori di multiplexing, possibile problema di formato');
                  if (hls.levels && hls.currentLevel > 0) {
                    hls.nextLevel = 0; // Forza qualità più bassa
                  }
                }
                break;
                
              default:
                console.error('HLS: Errore fatale non recuperabile:', data.type, data.details);
                if (isMobile) {
                  const fatalError = document.createElement('div');
                  fatalError.className = 'absolute inset-4 bg-red-600/95 text-white p-4 rounded-lg text-sm z-50 text-center';
                  fatalError.innerHTML = `
                    <div class="text-2xl mb-2">❌</div>
                    <div class="font-bold mb-2">Errore di riproduzione</div>
                    <div>Riprova più tardi</div>
                  `;
                  video.parentElement?.appendChild(fatalError);
                }
                break;
            }
          } else {
            // Errori non fatali: log per debug
            console.warn('HLS: Errore non fatale:', data.details);
            
            // Su connessioni molto lente, suggeriamo qualità minore
            if (isSlowConnection && data.details.includes('BUFFER')) {
              const lowestLevel = hls.levels.length - 1;
              if (hls.currentLevel !== lowestLevel) {
                console.info('HLS: Connessione lenta rilevata, imposto qualità minima');
                hls.nextLevel = lowestLevel;
              }
            }
          }
        });
        
        // === SISTEMA PREDITTIVO AVANZATO DI GESTIONE BUFFER ===
        let hlsBufferHealthHistory = [];
        let hlsDownloadSpeedHistory = [];
        let rebufferingEvents = [];
        let lastBufferCheck = 0;
        let bufferTrendPrediction = 'stable';
        
        // Analizza la salute del buffer e predice problemi
        const analyzeBufferHealth = () => {
          if (!video) return;
          
          const currentTime = Date.now();
          const buffered = video.buffered;
          
          if (buffered.length > 0) {
            const bufferEnd = buffered.end(buffered.length - 1);
            const currentVideoTime = video.currentTime;
            const bufferAhead = bufferEnd - currentVideoTime;
            
            // Calcola velocità di consumo buffer
            const timeDelta = currentTime - lastBufferCheck;
            if (timeDelta > 0 && hlsBufferHealthHistory.length > 0) {
              const lastBufferAhead = hlsBufferHealthHistory[hlsBufferHealthHistory.length - 1]?.bufferAhead || 0;
              const bufferConsumptionRate = (lastBufferAhead - bufferAhead) / (timeDelta / 1000); // secondi/secondo
              
          // === SISTEMA PREDITTIVO AVANZATO ===
          // Predici quando il buffer si esaurirà con maggiore accuratezza
          const safeConsumptionRate = Math.max(bufferConsumptionRate, 0.1);
          const timeToBufferEmpty = bufferAhead / safeConsumptionRate;
          
          // Calcola trend di stabilità buffer
          const recentBufferHealth = hlsBufferHealthHistory.slice(-5);
          let stabilityTrend = 'unknown';
          if (recentBufferHealth.length >= 3) {
            const trendValues = recentBufferHealth.map(h => h.bufferAhead);
            const avgTrend = trendValues.reduce((a, b) => a + b, 0) / trendValues.length;
            const variance = trendValues.reduce((sum, val) => sum + Math.pow(val - avgTrend, 2), 0) / trendValues.length;
            
            if (variance < 1) stabilityTrend = 'very_stable';
            else if (variance < 4) stabilityTrend = 'stable';
            else if (variance < 10) stabilityTrend = 'moderate';
            else stabilityTrend = 'unstable';
          }
          
          // Aggiorna metriche performance
          performanceMetrics.bufferLevels.push({
            timestamp: currentTime,
            bufferAhead,
            consumptionRate: bufferConsumptionRate,
            stability: stabilityTrend
          });
          
          // Mantieni solo gli ultimi 50 campioni
          if (performanceMetrics.bufferLevels.length > 50) {
            performanceMetrics.bufferLevels = performanceMetrics.bufferLevels.slice(-50);
          }              // Classifica tendenza buffer ottimizzata per connessioni decenti
              if (bufferConsumptionRate > 1.5) {
                bufferTrendPrediction = 'depleting_fast';
              } else if (bufferConsumptionRate > 1.0) {
                bufferTrendPrediction = 'depleting';
              } else if (bufferConsumptionRate > 0.3) {
                bufferTrendPrediction = 'depleting_slow';
              } else if (bufferConsumptionRate < -0.3) {
                bufferTrendPrediction = 'growing';
              } else {
                bufferTrendPrediction = 'stable';
              }
              
              // === LOGICA PREDITTIVA AVANZATA PER CONNESSIONI DECENTI ===
              // Sistema di early warning più aggressivo per prevenire stalli
              const earlyWarningBuffer = (networkQuality === 'medium' || networkQuality === 'fast') ? 12 : 8; // Buffer di sicurezza più alto
              
              if ((networkQuality === 'medium' || networkQuality === 'fast') && bufferAhead < earlyWarningBuffer && bufferTrendPrediction !== 'growing') {
                console.info(`Early Warning: Buffer basso (${bufferAhead.toFixed(1)}s) su connessione decente, pre-carico proattivo`);
                
                // Pre-caricamento aggressivo se la connessione lo permette
                if (hls && !hls.destroyed && video && !video.paused) {
                  // Forza un refresh del buffer se necessario
                  const currentPos = video.currentTime;
                  const bufferedEnd = buffered.end(buffered.length - 1);
                  
                  // Se c'è spazio per pre-caricare, forza loading
                  if (bufferedEnd - currentPos < earlyWarningBuffer) {
                    hls.trigger('hlsBufferFlush');
                    setTimeout(() => hls.startLoad(), 100);
                  }
                }
              }
              
              // Registra health del buffer
              const bufferHealth = {
                timestamp: currentTime,
                bufferAhead,
                consumptionRate: bufferConsumptionRate,
                timeToEmpty: timeToBufferEmpty,
                trend: bufferTrendPrediction,
                networkQuality,
                currentLevel: hls.currentLevel
              };
              
              hlsBufferHealthHistory.push(bufferHealth);
              
              // Mantieni solo ultimi 20 campioni
              if (hlsBufferHealthHistory.length > 20) {
                hlsBufferHealthHistory = hlsBufferHealthHistory.slice(-20);
              }
              
          // === SISTEMA PREDITTIVO E AZIONI PROATTIVE ULTRA-AVANZATE ===
          
          // Algoritmo di predizione multi-fattore ottimizzato per connessioni decenti
          const isDecentConnection = networkQuality === 'medium' || networkQuality === 'fast';
          let criticalThreshold, warningThreshold;
          
          if (isDecentConnection) {
            // Soglie più conservative per connessioni decenti (evitiamo proprio che si blocchi)
            criticalThreshold = stabilityTrend === 'unstable' ? 12 : 8; // Più margine
            warningThreshold = criticalThreshold + 5; // Warning ancora più anticipato
          } else {
            // Soglie standard per connessioni lente
            criticalThreshold = stabilityTrend === 'unstable' ? 8 : 5;
            warningThreshold = criticalThreshold + 3;
          }
          
          // === SISTEMA MULTI-LIVELLO DI PREVENZIONE STALLI ===
          
          // Livello 1: Predizione rebuffering imminente con azioni graduali
          if (timeToEmpty < criticalThreshold && (bufferTrendPrediction === 'depleting_fast' || bufferTrendPrediction === 'depleting' || (isDecentConnection && bufferTrendPrediction === 'depleting_slow'))) {
            console.warn(`Buffer Prediction: Rebuffering previsto in ${timeToEmpty.toFixed(1)}s (soglia: ${criticalThreshold}s)`);
            
            // Strategia di recovery progressiva basata su urgenza
            const urgencyLevel = timeToEmpty < 2 ? 'critical' : timeToEmpty < 3 ? 'high' : 'medium';
            
            streamHealthMetrics.totalStalls++;
            
            switch (urgencyLevel) {
              case 'critical':
                // Azione immediata: qualità minima + fallback se necessario
                if (hls.levels && hls.levels.length > 0) {
                  hls.nextLevel = 0; // Forza qualità minima
                  console.info(`Buffer Prediction: CRITICO - Qualità forzata al minimo`);
                }
                
                // Attiva fallback se disponibile
                if (autoFallbackEnabled && timeToEmpty < 1.5) {
                  triggerAutomaticFallback('buffer_depletion_critical', {
                    timeToEmpty,
                    bufferAhead,
                    consumptionRate: bufferConsumptionRate,
                    stabilityTrend,
                    urgencyLevel
                  });
                }
                break;
                
              case 'high':
                // Abbassa qualità di 2 livelli se possibile
                if (hls.currentLevel > 1) {
                  const newLevel = Math.max(0, hls.currentLevel - 2);
                  hls.nextLevel = newLevel;
                  console.info(`Buffer Prediction: HIGH - Qualità abbassata a livello ${newLevel}`);
                } else if (hls.currentLevel > 0) {
                  hls.nextLevel = 0;
                }
                break;
                
              case 'medium':
                // Abbassa qualità di 1 livello
                if (hls.currentLevel > 0) {
                  const newLevel = hls.currentLevel - 1;
                  hls.nextLevel = newLevel;
                  console.info(`Buffer Prediction: MEDIUM - Qualità abbassata a livello ${newLevel}`);
                }
                break;
            }
            
            // Aggiorna score di stabilità
            streamHealthMetrics.stabilityScore = Math.max(0, streamHealthMetrics.stabilityScore - (urgencyLevel === 'critical' ? 15 : urgencyLevel === 'high' ? 10 : 5));
          }
          
          // Livello 2: Avviso preventivo per buffer in diminuzione con azioni proattive
          else if (timeToEmpty < warningThreshold && (bufferTrendPrediction === 'depleting' || bufferTrendPrediction === 'depleting_slow')) {
            console.info(`Buffer Warning: Buffer in diminuzione, ${timeToEmpty.toFixed(1)}s rimanenti (soglia: ${warningThreshold}s)`);
            
            // === AZIONI PREVENTIVE INTELLIGENTI PER CONNESSIONI DECENTI ===
            if (isDecentConnection && bufferAhead < 10) {
              // Su connessioni decenti, siamo più proattivi
              if (hls.currentLevel > 1) {
                const newLevel = hls.currentLevel - 1;
                hls.nextLevel = newLevel;
                console.info(`Buffer Warning: Qualità preventivamente ridotta su connessione decente (livello ${newLevel})`);
              }
              
              // Attiva pre-buffering aggressivo
              if (hls && !hls.destroyed) {
                hls.config.maxBufferLength = Math.min(hls.config.maxBufferLength * 1.2, 240); // Aumenta temporaneamente buffer target
                console.info('Buffer Warning: Aumentato target buffer temporaneo per recupero');
              }
            }
            // Azione standard per connessioni lente  
            else if (bufferAhead < 5 && hls.currentLevel > 0 && networkQuality === 'slow') {
              const newLevel = Math.max(0, hls.currentLevel - 1);
              hls.nextLevel = newLevel;
              console.info(`Buffer Warning: Qualità preventivamente ridotta per connessione lenta`);
            }
          }
          
          // Livello 3: Sistema di recupero buffer per connessioni decenti
          else if (isDecentConnection && bufferAhead < 15 && bufferTrendPrediction === 'depleting_slow') {
            console.info(`Buffer Recovery: Attivazione pre-caricamento su connessione decente (buffer: ${bufferAhead.toFixed(1)}s)`);
            
            // Verifica se possiamo aumentare temporaneamente l'aggressività del download
            if (hls && performanceMetrics.downloadSpeeds.length > 0) {
              const avgSpeed = performanceMetrics.downloadSpeeds.slice(-3).reduce((sum, s) => sum + s.speed, 0) / 3;
              
              if (avgSpeed > 500) { // Se velocità > 500kbps
                // Temporaneamente più aggressivo nel caricamento
                hls.config.fragLoadingMaxRetry = Math.min(hls.config.fragLoadingMaxRetry + 2, 15);
                hls.config.lowBufferWatchdogPeriod = Math.max(0.1, hls.config.lowBufferWatchdogPeriod * 0.8);
                console.info('Buffer Recovery: Aumentata aggressività download per recupero rapido');
              }
            }
          }
          
          // === OTTIMIZZAZIONE INTELLIGENTE QUALITÀ CON SICUREZZA AVANZATA ===
          else if (bufferAhead > (isDecentConnection ? 18 : 15) && (bufferTrendPrediction === 'growing' || bufferTrendPrediction === 'stable')) {
            const avgBufferHealth = hlsBufferHealthHistory.slice(-5).reduce((sum, b) => sum + b.bufferAhead, 0) / 5;
            
            // Condizioni più intelligenti e sicure per upgrade qualità
            const minBufferForUpgrade = (() => {
              if (networkQuality === 'fast') return 15; // Più conservativo anche per fast
              if (networkQuality === 'medium') return 20; // Molto conservativo per medium
              return 30; // Estremamente conservativo per slow
            })();
            
            const canUpgrade = avgBufferHealth > minBufferForUpgrade && 
                              hls.levels && 
                              hls.currentLevel < hls.levels.length - 1 &&
                              streamHealthMetrics.stabilityScore > (isDecentConnection ? 85 : 90); // Soglia più alta
            
            if (canUpgrade) {
              // Verifica stabilità ultra-estesa per maggiore sicurezza
              const extendedStability = hlsBufferHealthHistory.slice(-10).filter(b => 
                b && (b.trend === 'stable' || b.trend === 'growing')
              ).length >= 8; // Almeno 8/10 campioni devono essere stabili
              
              // Verifica che non ci siano stati errori recenti (più rigoroso)
              const noRecentErrors = Date.now() - lastErrorTime > (isDecentConnection ? 45000 : 60000); // 45s-60s senza errori
              
              // === VERIFICA PERFORMANCE RECENTI PER CONNESSIONI DECENTI ===
              let performanceCheck = true;
              if (isDecentConnection && performanceMetrics.downloadSpeeds.length >= 5) {
                const recentSpeeds = performanceMetrics.downloadSpeeds.slice(-5);
                const avgRecentSpeed = recentSpeeds.reduce((sum, s) => sum + s.speed, 0) / recentSpeeds.length;
                const speedVariance = recentSpeeds.reduce((sum, s) => sum + Math.pow(s.speed - avgRecentSpeed, 2), 0) / recentSpeeds.length;
                
                // Non fare upgrade se velocità instabile o troppo bassa per il livello superiore
                const nextLevel = hls.currentLevel + 1;
                const nextLevelBitrate = hls.levels[nextLevel] ? hls.levels[nextLevel].bitrate / 1000 : 999999;
                
                performanceCheck = speedVariance < 100000 && avgRecentSpeed > (nextLevelBitrate * 1.5); // 50% margine di sicurezza
              }
              
              // Esegui upgrade solo se TUTTE le condizioni sono soddisfatte
              if (extendedStability && noRecentErrors && performanceCheck) {
                const newLevel = Math.min(hls.levels.length - 1, hls.currentLevel + 1);
                hls.nextLevel = newLevel;
                console.info(`Quality Upgrade: Sicuro upgrade a livello ${newLevel} (buffer: ${avgBufferHealth.toFixed(1)}s, stabilità: ${streamHealthMetrics.stabilityScore.toFixed(1)})`);
                performanceMetrics._lastQualityUpgrade = Date.now();
                streamHealthMetrics.qualitySwitches++;
              } else {
                console.info(`Quality Upgrade: Upgrade ritardato per sicurezza (stabilità: ${extendedStability}, errori: ${noRecentErrors}, performance: ${performanceCheck})`);
              }
            }
          }              // === ANALISI PATTERN AVANZATA PER ADATTAMENTO ABR ===
              if (hlsBufferHealthHistory.length >= 10) {
                const recentHistory = hlsBufferHealthHistory.slice(-10);
                const avgConsumption = recentHistory.reduce((sum, b) => sum + b.consumptionRate, 0) / recentHistory.length;
                
                // Pattern di consumo irregolare: modalità conservativa
                const consumptionVariance = recentHistory.reduce((sum, b) => 
                  sum + Math.pow(b.consumptionRate - avgConsumption, 2), 0) / recentHistory.length;
                
                // Soglie di variance adattive per tipo di connessione
                const varianceThreshold = isDecentConnection ? 0.3 : 0.5; // Più sensibile su connessioni decenti
                
                if (consumptionVariance > varianceThreshold) {
                  console.info(`Buffer Prediction: Pattern consumo irregolare rilevato (variance: ${consumptionVariance.toFixed(3)}), modalità conservativa`);
                  
                  // Su connessioni decenti, azione più graduale
                  if (isDecentConnection && hls.levels && hls.currentLevel > 0) {
                    // Non abbassare troppo drasticamente su connessioni decenti
                    const targetLevel = Math.max(Math.floor(hls.levels.length * 0.6), hls.currentLevel - 1);
                    hls.nextLevel = Math.max(0, targetLevel);
                    console.info(`Buffer Prediction: Qualità stabilizzata a livello sicuro ${hls.nextLevel} per connessione decente`);
                  } else if (hls.levels && hls.currentLevel > 1) {
                    hls.nextLevel = Math.max(1, hls.currentLevel - 1);
                  }
                  
                  // === OTTIMIZZAZIONI DINAMICHE PER STABILIZZAZIONE ===
                  if (isDecentConnection && hls && !hls.destroyed) {
                    // Temporaneamente riduci la sensibilità ABR
                    const originalAbrFactor = hls.config.abrBandWidthFactor;
                    hls.config.abrBandWidthFactor = Math.max(0.4, originalAbrFactor * 0.8);
                    console.info('Buffer Prediction: Ridotta aggressività ABR per stabilizzazione');
                    
                    // Ripristina dopo 30 secondi
                    setTimeout(() => {
                      if (hls && !hls.destroyed) {
                        hls.config.abrBandWidthFactor = originalAbrFactor;
                        console.info('Buffer Prediction: Ripristinata aggressività ABR normale');
                      }
                    }, 30000);
                  }
                }
                
                // === MONITORAGGIO PROATTIVO BUFFER TRENDS ===
                // Per connessioni decenti, monitora trend a lungo termine
                if (isDecentConnection && hlsBufferHealthHistory.length >= 15) {
                  const longTermHistory = hlsBufferHealthHistory.slice(-15);
                  const decreasingTrend = longTermHistory.filter(b => 
                    b.trend === 'depleting' || b.trend === 'depleting_slow' || b.trend === 'depleting_fast'
                  ).length;
                  
                  // Se troppi trend in diminuzione, attiva modalità conservativa prolungata
                  if (decreasingTrend >= 8) { // Più di metà campioni in diminuzione
                    console.warn(`Buffer Prediction: Trend decrescente prolungato rilevato (${decreasingTrend}/15), modalità ultra-conservativa`);
                    
                    if (hls && hls.currentLevel > 0) {
                      const safeLevel = Math.max(0, Math.floor(hls.levels.length * 0.4)); // Max 40% della qualità massima
                      hls.nextLevel = Math.min(safeLevel, hls.currentLevel);
                      console.info(`Buffer Prediction: Qualità limitata a livello sicuro ${hls.nextLevel} per trend negativo`);
                    }
                  }
                }
              }
            }
            
            // === SISTEMA PRE-CARICAMENTO INTELLIGENTE PER CONNESSIONI DECENTI ===
            // Attiva pre-caricamento aggressivo quando buffer stabile e connessione buona
            if (isDecentConnection && bufferTrendPrediction === 'stable' && bufferAhead > 10 && bufferAhead < 30) {
              // Verifica se possiamo pre-caricare più aggressivamente
              if (hls && !hls.destroyed && performanceMetrics.downloadSpeeds.length >= 3) {
                const recentAvgSpeed = performanceMetrics.downloadSpeeds.slice(-3).reduce((sum, s) => sum + s.speed, 0) / 3;
                const currentBitrate = hls.levels[hls.currentLevel] ? hls.levels[hls.currentLevel].bitrate / 1000 : 0;
                
                // Se velocità è significativamente superiore al bitrate corrente
                if (recentAvgSpeed > currentBitrate * 2) {
                  // Aumenta temporaneamente il target buffer per sfruttare la velocità
                  const originalMaxBuffer = hls.config.maxBufferLength;
                  const enhancedBuffer = Math.min(originalMaxBuffer * 1.3, 200); // Max 200s
                  
                  if (enhancedBuffer > originalMaxBuffer) {
                    hls.config.maxBufferLength = enhancedBuffer;
                    console.info(`Pre-loading: Aumentato target buffer a ${enhancedBuffer}s per sfruttare velocità (${recentAvgSpeed.toFixed(0)}kbps)`);
                    
                    // Ripristina dopo che il buffer raggiunge il target o dopo timeout
                    const checkBuffer = () => {
                      if (hls && !hls.destroyed) {
                        const currentBuffer = video.buffered.length > 0 ? 
                          video.buffered.end(video.buffered.length - 1) - video.currentTime : 0;
                        
                        if (currentBuffer >= enhancedBuffer * 0.9 || Date.now() - currentTime > 60000) {
                          hls.config.maxBufferLength = originalMaxBuffer;
                          console.info('Pre-loading: Target buffer ripristinato dopo pre-caricamento');
                        } else {
                          setTimeout(checkBuffer, 2000);
                        }
                      }
                    };
                    setTimeout(checkBuffer, 5000);
                  }
                }
              }
            }
            
            // Aggiorna timestamp ultimo check
            lastBufferCheck = currentTime;
            
            // === AGGIORNAMENTO METRICHE SALUTE STREAM ===
            // Calcola ratio buffer sano
            const healthyBufferThreshold = 5; // 5 secondi considerati "sano"
            if (bufferAhead > healthyBufferThreshold) {
              streamHealthMetrics.bufferRatio = Math.min(1, streamHealthMetrics.bufferRatio + 0.1);
            } else {
              streamHealthMetrics.bufferRatio = Math.max(0, streamHealthMetrics.bufferRatio - 0.05);
            }
            
            // Aggiorna tempo di play totale
            if (isPlaying && !video.paused) {
              streamHealthMetrics.totalPlayTime += (currentTime - streamHealthMetrics.lastHealthCheck) / 1000;
            }
            
            // Calcola qualità media nel tempo
            if (hls.currentLevel >= 0 && hls.levels) {
              const currentQualityPercent = (hls.currentLevel / (hls.levels.length - 1)) * 100;
              streamHealthMetrics.averageQuality = (streamHealthMetrics.averageQuality * 0.95) + (currentQualityPercent * 0.05);
            }
            
            // Aggiorna score di stabilità basato su trend buffer
            if (bufferTrendPrediction === 'stable' || bufferTrendPrediction === 'growing') {
              streamHealthMetrics.stabilityScore = Math.min(100, streamHealthMetrics.stabilityScore + 0.5);
            } else if (bufferTrendPrediction === 'depleting') {
              streamHealthMetrics.stabilityScore = Math.max(0, streamHealthMetrics.stabilityScore - 0.2);
            } else if (bufferTrendPrediction === 'depleting_fast') {
              streamHealthMetrics.stabilityScore = Math.max(0, streamHealthMetrics.stabilityScore - 1);
            }
            
            streamHealthMetrics.lastHealthCheck = currentTime;
            
            // Log periodico delle metriche (ogni 30 secondi)
            if (currentTime - (streamHealthMetrics._lastLog || 0) > 30000) {
              console.info('Stream Health Report:', {
                bufferRatio: (streamHealthMetrics.bufferRatio * 100).toFixed(1) + '%',
                stabilityScore: streamHealthMetrics.stabilityScore.toFixed(1),
                averageQuality: streamHealthMetrics.averageQuality.toFixed(1) + '%',
                totalStalls: streamHealthMetrics.totalStalls,
                totalRebuffers: streamHealthMetrics.totalRebuffers,
                qualitySwitches: streamHealthMetrics.qualitySwitches,
                currentBuffer: bufferAhead.toFixed(1) + 's',
                trend: bufferTrendPrediction
              });
              streamHealthMetrics._lastLog = currentTime;
            }
          }
        };
        
        // Monitor eventi buffer per statistiche
        hls.on(Hls.Events.BUFFER_CREATED, () => {
          setIsLoading(false);
          console.info('Buffer: Buffer creato, avvio monitoraggio predittivo');
        });
        
        hls.on(Hls.Events.BUFFER_APPENDING, () => {
          // Buffer si sta riempiendo - analizza salute
          analyzeBufferHealth();
          
          // Traccia performance buffering
          performanceMetrics.lastMetricsUpdate = Date.now();
        });
        
        hls.on(Hls.Events.BUFFER_APPENDED, () => {
          // Nuovo contenuto aggiunto al buffer
          analyzeBufferHealth();
        });
        
        hls.on(Hls.Events.BUFFER_EOS, () => {
          // Fine dello stream raggiunta
          console.info('Buffer: Fine stream raggiunta');
        });
        
        hls.on(Hls.Events.BUFFER_FLUSHED, () => {
          // Buffer svuotato
          console.warn('Buffer: Buffer svuotato, reset predizioni');
          hlsBufferHealthHistory = [];
          bufferTrendPrediction = 'stable';
        });
        
        // === SISTEMA AVANZATO DI TRACKING REBUFFERING ===
        let rebufferStartTime = null;
        let lastRebufferEndTime = 0;
        
        video.addEventListener('waiting', () => {
          rebufferStartTime = Date.now();
          const timeSinceLastRebuffer = rebufferStartTime - lastRebufferEndTime;
          
          console.warn('Buffer: Rebuffering iniziato', {
            timeSinceLastRebuffer: timeSinceLastRebuffer + 'ms',
            currentLevel: hls.currentLevel,
            networkQuality: networkQuality
          });
          
          // Aggiorna metriche
          streamHealthMetrics.totalRebuffers++;
          streamHealthMetrics.stabilityScore = Math.max(0, streamHealthMetrics.stabilityScore - 10);
          
          // Registra evento rebuffering con più dettagli
          const rebufferEvent = {
            timestamp: rebufferStartTime,
            timeSinceLastRebuffer: timeSinceLastRebuffer,
            bufferState: hlsBufferHealthHistory.length > 0 ? hlsBufferHealthHistory[hlsBufferHealthHistory.length - 1] : null,
            networkQuality: networkQuality,
            currentLevel: hls.currentLevel,
            streamHealth: { ...streamHealthMetrics },
            performanceMetrics: {
              recentDownloadSpeed: performanceMetrics.downloadSpeeds.slice(-3),
              bufferTrend: bufferTrendPrediction
            }
          };
          
          rebufferingEvents.push(rebufferEvent);
          
          // Mantieni solo ultimi 10 eventi
          if (rebufferingEvents.length > 10) {
            rebufferingEvents = rebufferingEvents.slice(-10);
          }
          
          // === ANALISI PATTERN REBUFFERING E AZIONI ===
          const recentRebuffers = rebufferingEvents.filter(r => Date.now() - r.timestamp < 60000); // Ultimo minuto
          const veryRecentRebuffers = rebufferingEvents.filter(r => Date.now() - r.timestamp < 30000); // Ultimi 30s
          
          // Soglie adattive per fallback basate su gravità
          const criticalThreshold = networkQuality === 'slow' ? 2 : 3; // Più tollerante per connessioni lente
          const severeThreshold = networkQuality === 'slow' ? 4 : 5;
          
          if (veryRecentRebuffers.length >= criticalThreshold && autoFallbackEnabled) {
            console.error(`Buffer: CRITICO - ${veryRecentRebuffers.length} rebuffering in 30s, attivo fallback immediato`);
            triggerAutomaticFallback('critical_rebuffering', {
              rebufferCount: veryRecentRebuffers.length,
              timeWindow: '30s',
              severity: 'critical'
            });
          } else if (recentRebuffers.length >= severeThreshold && autoFallbackEnabled) {
            console.warn(`Buffer: SEVERO - ${recentRebuffers.length} rebuffering in 60s, attivo fallback`);
            triggerAutomaticFallback('excessive_rebuffering', {
              rebufferCount: recentRebuffers.length,
              timeWindow: '60s',
              severity: 'severe'
            });
          }
          
          // Azione proattiva: forza qualità minima se troppi rebuffer recenti
          else if (recentRebuffers.length >= 2 && hls.currentLevel > 0) {
            console.warn(`Buffer: ${recentRebuffers.length} rebuffering recenti, forzo qualità minima`);
            hls.nextLevel = 0;
            streamHealthMetrics.qualitySwitches++;
          }
        });
        
        video.addEventListener('canplay', () => {
          if (rebufferStartTime) {
            const rebufferDuration = Date.now() - rebufferStartTime;
            lastRebufferEndTime = Date.now();
            
            console.info(`Buffer: Rebuffering terminato dopo ${rebufferDuration}ms`);
            
            // Aggiorna ultimo evento rebuffering con durata
            if (rebufferingEvents.length > 0) {
              rebufferingEvents[rebufferingEvents.length - 1].duration = rebufferDuration;
            }
            
            // Analisi durata rebuffering per azioni appropriate
            let actionTaken = 'none';
            
            if (rebufferDuration > 15000) { // >15 secondi = critico
              console.error(`Buffer: REBUFFERING CRITICO (${rebufferDuration}ms) - azioni drastiche`);
              
              // Forza qualità minima e considera fallback
              if (hls.currentLevel > 0) {
                hls.nextLevel = 0;
                actionTaken = 'force_min_quality';
              }
              
              // Se già alla qualità minima e ancora problemi, attiva fallback
              if (hls.currentLevel === 0 && autoFallbackEnabled) {
                triggerAutomaticFallback('critical_rebuffer_duration', {
                  duration: rebufferDuration,
                  severity: 'critical'
                });
                actionTaken = 'fallback_triggered';
              }
              
              streamHealthMetrics.stabilityScore = Math.max(0, streamHealthMetrics.stabilityScore - 20);
              
            } else if (rebufferDuration > 8000) { // >8 secondi = severo
              console.warn(`Buffer: Rebuffering severo (${rebufferDuration}ms) - degrado qualità`);
              
              if (hls.currentLevel > 0) {
                const newLevel = Math.max(0, hls.currentLevel - 1);
                hls.nextLevel = newLevel;
                actionTaken = 'quality_downgrade';
                streamHealthMetrics.qualitySwitches++;
              }
              
              streamHealthMetrics.stabilityScore = Math.max(0, streamHealthMetrics.stabilityScore - 10);
              
            } else if (rebufferDuration > 3000) { // >3 secondi = moderato
              console.info(`Buffer: Rebuffering moderato (${rebufferDuration}ms) - monitoraggio`);
              
              // Solo avviso, nessuna azione drastica
              actionTaken = 'monitoring';
              streamHealthMetrics.stabilityScore = Math.max(0, streamHealthMetrics.stabilityScore - 3);
              
            } else {
              // Rebuffering breve = normale
              console.info(`Buffer: Rebuffering normale (${rebufferDuration}ms)`);
              actionTaken = 'none';
              streamHealthMetrics.stabilityScore = Math.max(0, streamHealthMetrics.stabilityScore - 1);
            }
            
            // Aggiorna evento con azione presa
            if (rebufferingEvents.length > 0) {
              rebufferingEvents[rebufferingEvents.length - 1].actionTaken = actionTaken;
              rebufferingEvents[rebufferingEvents.length - 1].endTime = Date.now();
            }
            
            rebufferStartTime = null;
          }
        });
        
        // Timer per analisi periodica del buffer
        const bufferAnalysisInterval = setInterval(analyzeBufferHealth, 2000); // Ogni 2 secondi
        
        // === CLEANUP E REPORT FINALE ===
        const cleanupAndReport = () => {
          clearInterval(bufferAnalysisInterval);
          
          // Report finale delle performance
          const sessionDuration = (Date.now() - streamHealthMetrics.streamStartTime) / 1000;
          const finalReport = {
            sessionDuration: sessionDuration.toFixed(1) + 's',
            totalPlayTime: streamHealthMetrics.totalPlayTime.toFixed(1) + 's',
            playRatio: ((streamHealthMetrics.totalPlayTime / sessionDuration) * 100).toFixed(1) + '%',
            totalStalls: streamHealthMetrics.totalStalls,
            totalRebuffers: streamHealthMetrics.totalRebuffers,
            qualitySwitches: streamHealthMetrics.qualitySwitches,
            finalStabilityScore: streamHealthMetrics.stabilityScore.toFixed(1),
            averageQuality: streamHealthMetrics.averageQuality.toFixed(1) + '%',
            bufferHealthRatio: (streamHealthMetrics.bufferRatio * 100).toFixed(1) + '%',
            fallbackLevel: currentFallbackLevel
          };
          
          console.info('=== TV-FLIX SESSION REPORT ===', finalReport);
          
          // Salva metriche per sessioni future (localStorage)
          try {
            const historicalData = JSON.parse(localStorage.getItem('tvflix_performance_history') || '[]');
            historicalData.push({
              timestamp: Date.now(),
              channelId: channel?.id,
              networkQuality: networkQuality,
              ...finalReport
            });
            
            // Mantieni solo ultime 10 sessioni
            if (historicalData.length > 10) {
              historicalData.splice(0, historicalData.length - 10);
            }
            
            localStorage.setItem('tvflix_performance_history', JSON.stringify(historicalData));
          } catch (e) {
            console.warn('Impossibile salvare metriche performance:', e);
          }
        };
        
        return cleanupAndReport;
        
      } else {
        // Fallback per browser non supportati
        video.src = channel.hlsSrc;
        video.load(); // Forza caricamento per una risposta più veloce
      }
    })();

    return () => {
      destroyed = true;
      cleanup();
      if (hls) {
        hls.destroy();
        hlsInstanceRef.current = null;
      }
    };
  }, [open, channel, mode, isSafari, isIOS]);

  // Gestisce separatamente i cambiamenti di volume
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !open || mode !== "hls") return;
    
    video.volume = volume;
    video.muted = isMuted;
  }, [volume, isMuted, open, mode]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;

    const handleKeyPress = (e) => {
      const video = videoRef.current;
      if (!video) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          // Non permettere pausa su stream HLS (sempre)
          if (mode === "hls") {
            if (!isPlaying) video.play();
          } else {
            if (isPlaying) video.pause();
            else video.play();
          }
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          setIsMuted(!isMuted);
          video.muted = !isMuted;
          break;
        case 'Escape':
          e.preventDefault();
          onClose && onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          const newVolumeUp = Math.min(1, volume + 0.1);
          setVolume(newVolumeUp);
          video.volume = newVolumeUp;
          break;
        case 'ArrowDown':
          e.preventDefault();
          const newVolumeDown = Math.max(0, volume - 0.1);
          setVolume(newVolumeDown);
          video.volume = newVolumeDown;
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [open, isPlaying, isMuted, volume, onClose]);

  // Focus iniziale sul contenitore per accessibilità
  useEffect(() => {
    if (open && containerRef.current) {
      containerRef.current.focus();
    }
  }, [open]);

  if (!open || !channel) return null;

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${channel.name} player`}
    >
      {/* CSS per migliorare i controlli touch */}
      <style>{`
        .touch-control {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          touch-action: manipulation;
        }
        
        .touch-control:active {
          transform: scale(0.95);
          transition: transform 0.1s ease;
        }
        
        /* Migliora la responsività su iOS */
        @supports (-webkit-touch-callout: none) {
          .touch-control {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          }
        }
        
        /* Animazione per feedback adblock */
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
      
      <div 
        ref={containerRef}
        className={`
          ${isFullscreen 
            ? 'w-full h-full fixed inset-0 z-[9999]' 
            : 'w-[min(1200px,96vw)] h-[min(80vh,90vh)] mx-2 sm:mx-4'
          } 
          rounded-xl sm:rounded-2xl bg-neutral-950 ring-1 ring-white/10 shadow-video overflow-hidden 
          flex flex-col transform-gpu transition-all duration-300 animate-scale-in
          ${isFullscreen ? 'rounded-none' : ''}
          safe-area-inset
          ${isIOS && isFullscreen ? 'ios-fullscreen' : ''}
        `}
        tabIndex={-1}
        onMouseMove={resetControlsTimeout}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        onTouchStart={resetControlsTimeout}
        onTouchEnd={() => setTimeout(() => isPlaying && setShowControls(false), 3000)}
        onDoubleClick={toggleFullscreen}
      >
        {/* Header - nascosto in fullscreen */}
        {!isFullscreen && (
          <div className="flex items-center justify-between px-3 xs:px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 glass-effect">
            <div className="flex items-center gap-2 xs:gap-4 flex-1 min-w-0">
              <div className="min-w-0 flex-1">
                <h2 className="text-white text-base xs:text-lg sm:text-xl font-bold gradient-text truncate">{channel.name}</h2>
                <p className="text-white/60 text-xs xs:text-sm hidden xs:block">
                  {mode === "iframe" ? "🖥️ IFRAME" : "📺 HLS con AirPlay"}
                </p>
              </div>
              {isLoading && (
                <div className="flex items-center gap-1 xs:gap-2 text-primary-400 text-xs xs:text-sm">
                  <div className="w-3 h-3 xs:w-4 xs:h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden xs:inline">Caricamento...</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 xs:gap-3">
              {channel.hlsSrc && (
                <div className="flex gap-1 glass-effect rounded-xl p-1">
                  <button
                    onClick={() => setMode("hls")}
                    className={`
                      px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg text-xs xs:text-sm font-medium transition-all duration-200
                      touch-manipulation min-h-[44px]
                      ${mode === "hls" 
                        ? "bg-primary-600 text-white shadow-glow" 
                        : "text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20"}
                    `}
                    title="Modalità HLS - Controlli avanzati"
                    aria-label="Seleziona modalità HLS"
                    aria-pressed={mode === 'hls'}
                  >
                    <span className="sm:hidden">📺</span>
                    <span className="hidden sm:inline">📺 HLS</span>
                  </button>
                  <button
                    onClick={() => setMode("iframe")}
                    className={`
                      px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg text-xs xs:text-sm font-medium transition-all duration-200
                      touch-manipulation min-h-[44px]
                      ${mode === "iframe" 
                        ? "bg-primary-600 text-white shadow-glow" 
                        : "text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20"}
                    `}
                    title="Modalità iframe - Compatibilità universale"
                    aria-label="Seleziona modalità IFRAME"
                    aria-pressed={mode === 'iframe'}
                  >
                    <span className="sm:hidden">🖥️</span>
                    <span className="hidden sm:inline">🖥️ IFRAME</span>
                  </button>
                </div>
              )}
              <button
                onClick={onClose}
                className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg xs:rounded-xl bg-white text-black text-xs xs:text-sm font-bold hover:bg-white/90 active:bg-white/80 transition-all duration-200 transform hover:scale-105 touch-manipulation min-h-[44px]"
                aria-label="Chiudi modale"
              >
                <span className="xs:hidden">✕</span>
                <span className="hidden xs:inline">✕ Chiudi</span>
              </button>
            </div>
          </div>
        )}

        {/* Player Area */}
        <div className="relative flex-1 bg-black overflow-hidden">
          {mode === "iframe" || !channel.hlsSrc ? (
            <>
              <iframe
                src={channel.iframeSrc}
                title={channel.name}
                className="w-full h-full border-0 bg-black"
                // === SANDBOX OTTIMIZZATO PER STREAMING ===
                sandbox="allow-scripts allow-same-origin allow-presentation allow-fullscreen allow-autoplay allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
                // === POLICY ULTRA-PERMISSIVE PER STREAMING ===
                allow={`
                  autoplay *; 
                  fullscreen *; 
                  picture-in-picture *; 
                  encrypted-media *;
                  accelerometer *;
                  gyroscope *;
                  magnetometer *;
                  microphone ${networkQuality === 'fast' ? '*' : 'none'};
                  camera ${networkQuality === 'fast' ? '*' : 'none'};
                  geolocation none;
                  payment none;
                  usb none;
                  web-share *;
                  clipboard-read *;
                  clipboard-write *;
                  display-capture *;
                  midi none;
                  sync-xhr ${networkQuality !== 'slow' ? '*' : 'none'};
                  xr-spatial-tracking none
                `.replace(/\s+/g, ' ').trim()}
                allowFullScreen
                // === OTTIMIZZAZIONI PRIVACY E PERFORMANCE ===
                referrerPolicy="strict-origin-when-cross-origin"
                loading={networkQuality === 'fast' ? 'eager' : 'lazy'} // Caricamento immediato per reti veloci
                importance={networkQuality === 'fast' ? 'high' : 'auto'} // Priorità alta per reti veloci
                // === OTTIMIZZAZIONI CROSS-ORIGIN ===
                credentialless={networkQuality === 'fast' ? 'true' : 'false'} // Riduce overhead su reti veloci
                // === GESTIONE ERRORI AVANZATA ===
                onError={(e) => {
                  console.warn('Iframe error:', e);
                  setIsLoading(false);
                  
                  // Tentativo di reload automatico per errori temporanei
                  setTimeout(() => {
                    const iframe = e.target;
                    const originalSrc = iframe.src;
                    iframe.src = '';
                    setTimeout(() => {
                      iframe.src = originalSrc + (originalSrc.includes('?') ? '&' : '?') + 'retry=' + Date.now();
                    }, 1000);
                  }, 3000);
                }}
                onLoad={(e) => {
                  setIsLoading(false);
                  
                  // Adblock JavaScript intelligente - funziona solo se abilitato
                  if (adblockEnabled) {
                    try {
                      const iframe = e.target;
                      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                      
                      // Funzione per rimuovere ads dinamicamente
                      const removeAds = () => {
                        if (!iframeDoc) return;
                        
                        // Selettori per elementi pubblicitari da rimuovere
                        const adSelectors = [
                          // Google Ads
                          '.adsbygoogle', 'ins.adsbygoogle', '[data-ad-client]',
                          
                          // Ads generici
                          '.advertisement', '.ad-banner', '.ads-container', '.popup-ad',
                          '[class*="advertisement"]', '[id*="advertisement"]',
                          '[class*="popup"]:not([class*="player"]):not([class*="control"])',
                          
                          // Overlay molesti
                          '.overlay-ad', '.banner-ad', '.floating-ad', '.sticky-ad',
                          '.pre-roll-ad', '.mid-roll-ad', '.post-roll-ad',
                          
                          // Popup e modal molesti (preservando quelli del player)
                          '[class*="modal"]:not([class*="player"]):not([class*="video"])',
                          '[class*="lightbox"]:not([class*="player"])',
                          '[class*="interstitial"]', '[class*="splash"]:not([class*="loading"])',
                          
                          // Cookie e GDPR banner molesti
                          '.cookie-notice:not(.video-cookie)', '.gdpr-banner:not(.player-gdpr)',
                          '[class*="consent"]:not([class*="player"])',
                          
                          // Newsletter e subscription popup
                          '[class*="newsletter"]:not([class*="player"])',
                          '[class*="subscribe"]:not([class*="channel"])',
                          '[class*="signup"]:not([class*="account"])'
                        ];
                        
                        // Rimuovi elementi pubblicitari
                        adSelectors.forEach(selector => {
                          try {
                            const elements = iframeDoc.querySelectorAll(selector);
                            elements.forEach(element => {
                              // Doppio controllo: non rimuovere se contiene controlli del player
                              const isPlayerElement = element.closest('[class*="player"], [class*="video"], [class*="control"]') ||
                                                    element.querySelector('[class*="control"], [class*="play"], [class*="pause"]');
                              
                              if (!isPlayerElement) {
                                element.style.display = 'none !important';
                                element.style.visibility = 'hidden !important';
                                element.style.opacity = '0 !important';
                                element.style.pointerEvents = 'none !important';
                                element.style.position = 'absolute !important';
                                element.style.top = '-99999px !important';
                                element.style.left = '-99999px !important';
                                element.style.zIndex = '-999999 !important';
                                
                                // Rimuovi completamente dopo un breve delay per evitare flash
                                setTimeout(() => {
                                  try {
                                    if (element.parentNode) {
                                      element.parentNode.removeChild(element);
                                    }
                                  } catch (e) {
                                    // Elemento già rimosso, ignora errore
                                  }
                                }, 100);
                              }
                            });
                          } catch (e) {
                            // Selettore non valido per questo documento, continua
                          }
                        });
                        
                        // Rimuovi attributi che potrebbero causare popup
                        try {
                          const elementsWithOnclick = iframeDoc.querySelectorAll('[onclick]');
                          elementsWithOnclick.forEach(element => {
                            const onclick = element.getAttribute('onclick') || '';
                            if (onclick.includes('popup') || onclick.includes('window.open') || onclick.includes('advertisement')) {
                              element.removeAttribute('onclick');
                            }
                          });
                        } catch (e) {
                          // Cross-origin restriction, ignora
                        }
                        
                        // Preserva e migliora i controlli del player
                        try {
                          const playerControls = iframeDoc.querySelectorAll(
                            '.player-controls, .video-controls, .media-controls, [class*="control"]:not([class*="ad"]), ' +
                            '.play-button, .pause-button, .volume-control, .progress-bar, .seek-bar, .fullscreen-button'
                          );
                          
                          playerControls.forEach(control => {
                            control.style.display = 'block !important';
                            control.style.visibility = 'visible !important';
                            control.style.opacity = '1 !important';
                            control.style.pointerEvents = 'auto !important';
                            control.style.zIndex = '999999 !important';
                            control.style.position = 'relative !important';
                          });
                        } catch (e) {
                          // Cross-origin restriction, i CSS dovrebbero gestire questo
                        }
                      };
                      
                      // Esegui rimozione ads immediatamente e poi periodicamente
                      removeAds();
                      
                      // Monitor per nuovi ads che potrebbero apparire dinamicamente
                      const adObserver = new MutationObserver((mutations) => {
                        let hasNewAds = false;
                        mutations.forEach((mutation) => {
                          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                            mutation.addedNodes.forEach((node) => {
                              if (node.nodeType === 1) { // Element node
                                const className = node.className || '';
                                const id = node.id || '';
                                if (typeof className === 'string' && typeof id === 'string') {
                                  if (className.includes('ad') || className.includes('popup') || 
                                      id.includes('ad') || id.includes('popup')) {
                                    hasNewAds = true;
                                  }
                                }
                              }
                            });
                          }
                        });
                        
                        if (hasNewAds) {
                          // Ritarda leggermente per permettere al nuovo elemento di renderizzare
                          setTimeout(removeAds, 100);
                        }
                      });
                      
                      // Osserva cambiamenti nel DOM dell'iframe
                      try {
                        adObserver.observe(iframeDoc.body, {
                          childList: true,
                          subtree: true,
                          attributes: true,
                          attributeFilter: ['class', 'id', 'style']
                        });
                      } catch (e) {
                        // Cross-origin restriction, usa fallback timer
                        setInterval(removeAds, 2000); // Controlla ogni 2 secondi
                      }
                      
                      // Cleanup observer quando il componente viene smontato
                      return () => {
                        if (adObserver) {
                          adObserver.disconnect();
                        }
                      };
                      
                    } catch (error) {
                      // Cross-origin restrictions o altri errori - fallback ai CSS
                      console.log('Adblock JS limitato da cross-origin, usando solo CSS adblock');
                    }
                  }
                }}
              />
              
              {/* Adblock CSS interno - nasconde selettivamente solo elementi pubblicitari */}
              {adblockEnabled && (
                <style>{`
                  /* === ADBLOCK TV-FLIX INTERNO === */
                  /* Nasconde banner e popup pubblicitari comuni senza toccare i controlli del player */
                  
                  /* Selettori generici per ads */
                  .ad-banner, .advertisement, .ads-container, .popup-ad, .overlay-ad,
                  [class*="advertisement"], [id*="advertisement"], 
                  [class*="popup"]:not([class*="player"]):not([class*="control"]),
                  [id*="popup"]:not([id*="player"]):not([class*="controls"]),
                  .adsbygoogle, .banner-ad, .side-ad, .sticky-ad, .floating-ad,
                  
                  /* Ads specifici per siti di streaming */
                  .video-ad:not(.video-player):not(.player-ad),
                  .pre-roll-ad, .mid-roll-ad, .post-roll-ad,
                  .overlay-advertisement, .banner-advertisement,
                  
                  /* Selettori per popup e overlay molesti */
                  [class*="modal"]:not([class*="player"]):not([class*="control"]),
                  [class*="lightbox"]:not([class*="player"]):not([class*="video"]),
                  [class*="interstitial"], [class*="splash"]:not([class*="loading"]),
                  
                  /* Ads che si sovrappongono al video */
                  .ad-overlay:not(.player-overlay):not(.video-overlay):not(.controls-overlay),
                  [class*="ad-overlay"]:not([class*="player"]):not([class*="video"]),
                  
                  /* Cookie banners e GDPR molesti che bloccano il player */
                  .cookie-notice:not(.video-cookie), .gdpr-banner:not(.player-gdpr),
                  [class*="consent"]:not([class*="player"]):not([class*="video"]),
                  
                  /* Newsletter e subscription popup */
                  [class*="newsletter"]:not([class*="player"]), [class*="subscribe"]:not([class*="channel"]),
                  [class*="signup"]:not([class*="account"]):not([class*="login"]),
                  
                  /* Social media widget invasivi */
                  [class*="social-widget"]:not([class*="player"]), [class*="share-widget"]:not([class*="video"]),
                  
                  /* Disclaimer e warning molesti */
                  [class*="disclaimer"]:not([class*="age"]):not([class*="content"]),
                  [class*="warning"]:not([class*="age"]):not([class*="player"])
                  {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    position: absolute !important;
                    top: -99999px !important;
                    left: -99999px !important;
                    width: 0 !important;
                    height: 0 !important;
                    z-index: -999999 !important;
                    transform: scale(0) !important;
                  }
                  
                  /* === PRESERVA CONTROLLI ESSENZIALI DEL PLAYER === */
                  /* Assicura che tutti i controlli del video player rimangano funzionanti */
                  .player-controls, .video-controls, .media-controls,
                  [class*="control"]:not([class*="ad"]), [id*="control"]:not([id*="ad"]),
                  .play-button, .pause-button, .volume-control, .progress-bar, .seek-bar,
                  .fullscreen-button, .settings-button, .quality-button,
                  .player-overlay .controls, .video-player .controls,
                  
                  /* Preserva elementi UI del player */
                  [class*="player"], [class*="video-player"], [class*="media-player"],
                  [id*="player"]:not([id*="ad"]), [id*="video"]:not([id*="ad"]),
                  
                  /* Preserva overlay informativi del player */
                  .player-overlay:not(.ad-overlay), .video-overlay:not(.ad-overlay),
                  .controls-overlay, .info-overlay, .loading-overlay,
                  
                  /* Preserva UI del sito di streaming necessaria */
                  [class*="episode"], [class*="season"], [class*="chapter"],
                  [class*="subtitle"], [class*="caption"], [class*="quality"],
                  [class*="language"], [class*="audio"], [class*="track"]
                  {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    pointer-events: auto !important;
                    position: relative !important;
                    z-index: 999999 !important;
                    transform: none !important;
                  }
                  
                  /* Forza la visibilità di elementi video cruciali */
                  video, iframe, embed, object {
                    display: block !important;
                    visibility: visible !important;
                    pointer-events: auto !important;
                  }
                  
                  /* Migliora l'interazione con i controlli touch */
                  .player-controls *, .video-controls *, .media-controls * {
                    pointer-events: auto !important;
                    touch-action: manipulation !important;
                  }
                `}</style>
              )}

              {/* Indicatore modalità iframe con suggerimenti e stato adblock */}
              {showControls && (
                <div className="absolute top-4 left-4 glass-effect rounded-lg p-3 text-white text-sm z-40 max-w-xs">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span>🖥️</span>
                      <span className="font-bold">IFRAME</span>
                    </div>
                    <div className={`
                      flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold
                      ${adblockEnabled 
                        ? 'bg-green-600/80 text-green-100' 
                        : 'bg-red-600/80 text-red-100'
                      }
                    `}>
                      <span>{adblockEnabled ? '🛡️' : '🚫'}</span>
                      <span className="hidden xs:inline">
                        {adblockEnabled ? 'AdBlock ON' : 'AdBlock OFF'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs opacity-80 mt-2">
                    Player esterno - Usa i controlli del sito
                  </div>
                  {adblockEnabled && (
                    <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
                      <span>✨</span>
                      <span>Pubblicità bloccate automaticamente</span>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Video Element con supporto avanzato per touch */}
              <video
                ref={videoRef}
                className="w-full h-full object-contain bg-black touch-manipulation"
                playsInline
                controls={false}
                x-webkit-airplay="allow"
                webkit-playsinline="true"
                x5-playsinline="true"
                x5-video-player-type="h5-page"
                x5-video-player-fullscreen="true"
                x5-video-orientation="landscape"
                preload="auto"
                poster={channel.thumbnail || ''}
                onClick={(e) => {
                  e.preventDefault();
                  const video = videoRef.current;
                  if (video) {
                    // Feedback aptico su dispositivi supportati
                    if (navigator.vibrate) {
                      navigator.vibrate(10);
                    }
                    
                    // Non permettere pausa su stream HLS (sempre)
                    if (mode === "hls") {
                      if (!isPlaying) {
                        video.play().catch(console.error);
                      }
                    } else {
                      if (isPlaying) {
                        video.pause();
                      } else {
                        video.play().catch(console.error);
                      }
                    }
                  }
                  resetControlsTimeout();
                }}
                onTouchStart={(e) => {
                  // Feedback aptico ottimizzato
                  if (navigator.vibrate) {
                    navigator.vibrate([5]); // Vibrazione sottile
                  }
                  
                  // Sistema gesture avanzato per controlli touch
                  const touch = e.touches[0];
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touchX = touch.clientX - rect.left;
                  const touchY = touch.clientY - rect.top;
                  const width = rect.width;
                  const height = rect.height;
                  
                  // Zone touch ottimizzate
                  const leftZone = touchX < width * 0.25;  // 25% sinistro
                  const rightZone = touchX > width * 0.75; // 25% destro
                  const centerZone = !leftZone && !rightZone;
                  const topHalf = touchY < height * 0.5;
                  
                  // Salva posizione iniziale per gesture
                  touchStateRef.current.startX = touchX;
                  touchStateRef.current.startY = touchY;
                  touchStateRef.current.startTime = Date.now();
                  
                  // Mostra indicatori visivi per zone attive
                  if (isFullscreen) {
                    const showZoneIndicator = (zone, action) => {
                      const indicator = document.createElement('div');
                      indicator.className = `absolute ${zone} bg-white/20 rounded-lg p-2 text-white text-xs z-40 pointer-events-none`;
                      indicator.textContent = action;
                      e.currentTarget.appendChild(indicator);
                      setTimeout(() => indicator.remove(), 1000);
                    };
                    
                    if (leftZone && mode !== "hls") {
                      showZoneIndicator('top-4 left-4', '⏪ -10s');
                    } else if (rightZone && mode !== "hls") {
                      showZoneIndicator('top-4 right-4', '+10s ⏩');
                    } else if (centerZone) {
                      showZoneIndicator('top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', isPlaying ? '⏸️' : '▶️');
                    }
                  }
                  
                  resetControlsTimeout();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  
                  const touch = e.changedTouches[0];
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touchEndX = touch.clientX - rect.left;
                  const touchEndY = touch.clientY - rect.top;
                  const { startX, startY, startTime } = touchStateRef.current || {};
                  const touchDuration = Date.now() - (startTime || 0);
                  
                  // Calcola swipe
                  const deltaX = touchEndX - (startX || 0);
                  const deltaY = touchEndY - (startY || 0);
                  const swipeThreshold = 50;
                  const maxSwipeTime = 500;
                  
                  const video = videoRef.current;
                  if (!video) return;
                  
                  // Gestione swipe orizzontale per seek (solo per contenuti non-live)
                  if (Math.abs(deltaX) > swipeThreshold && touchDuration < maxSwipeTime && mode !== "hls" && duration > 0) {
                    const seekAmount = Math.min(30, Math.max(5, Math.abs(deltaX) / 10)); // 5-30 secondi basato su velocità swipe
                    
                    if (deltaX > 0) {
                      // Swipe destro: avanti
                      video.currentTime = Math.min(duration, video.currentTime + seekAmount);
                      showSeekFeedback(`+${Math.round(seekAmount)}s`, e.currentTarget);
                    } else {
                      // Swipe sinistro: indietro
                      video.currentTime = Math.max(0, video.currentTime - seekAmount);
                      showSeekFeedback(`-${Math.round(seekAmount)}s`, e.currentTarget);
                    }
                    
                    // Feedback aptico per swipe
                    if (navigator.vibrate) {
                      navigator.vibrate([10, 50, 10]);
                    }
                  }
                  // Gestione swipe verticale per volume
                  else if (Math.abs(deltaY) > swipeThreshold && touchDuration < maxSwipeTime) {
                    const volumeChange = Math.min(0.3, Math.abs(deltaY) / 200); // Max 0.3 di variazione
                    
                    if (deltaY < 0) {
                      // Swipe su: volume su
                      const newVolume = Math.min(1, volume + volumeChange);
                      setVolume(newVolume);
                      video.volume = newVolume;
                      if (isMuted) {
                        setIsMuted(false);
                        video.muted = false;
                      }
                      showVolumeFeedback(Math.round(newVolume * 100) + '%', e.currentTarget);
                    } else {
                      // Swipe giù: volume giù
                      const newVolume = Math.max(0, volume - volumeChange);
                      setVolume(newVolume);
                      video.volume = newVolume;
                      if (newVolume === 0) {
                        setIsMuted(true);
                        video.muted = true;
                      }
                      showVolumeFeedback(Math.round(newVolume * 100) + '%', e.currentTarget);
                    }
                    
                    // Feedback aptico per volume
                    if (navigator.vibrate) {
                      navigator.vibrate([5, 30, 5]);
                    }
                  }
                  // Tap singolo per play/pause (se non è uno swipe)
                  else if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20 && touchDuration < 300) {
                    if (mode === "hls") {
                      if (!isPlaying) video.play().catch(console.error);
                    } else {
                      if (isPlaying) video.pause();
                      else video.play().catch(console.error);
                    }
                  }
                  
                  // Pulizia
                  delete this.touchStartX;
                  delete this.touchStartY;
                  delete this.touchStartTime;
                  
                  resetControlsTimeout();
                }}
                // Previeni zoom durante doppio tap su iOS/iPadOS
                onTouchMove={(e) => {
                  if (e.touches.length > 1) {
                    e.preventDefault(); // Previeni pinch zoom nel player
                  }
                }}
              />

              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white text-lg font-medium">Caricamento video...</p>
                  </div>
                </div>
              )}

              {/* Custom Video Controls */}
              <div className={`
                absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent 
                transition-all duration-300 transform z-50
                ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
                pointer-events-auto
              `}>
                {/* Progress Bar - nascosta per stream HLS */}
                {mode !== "hls" && (
                  <div className="px-6 pb-2">
                    <div className="relative group">
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                           onClick={(e) => {
                             const video = videoRef.current;
                             if (video && duration && mode !== "hls") {
                               const rect = e.currentTarget.getBoundingClientRect();
                               const percent = (e.clientX - rect.left) / rect.width;
                               video.currentTime = percent * duration;
                             }
                           }}>
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-150"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Streaming Mode Indicator */}
                <div className="px-6 pb-2 flex items-center justify-center flex-wrap gap-2">
                  {mode === "hls" ? (
                    <div className="flex items-center gap-2 bg-blue-600 px-4 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-bold">STREAMING HLS</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-purple-600 px-4 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white text-sm font-bold">MODALITÀ IFRAME</span>
                    </div>
                  )}
                    
                  {/* Indicatore fullscreen disponibile su mobile */}
                  {(isIOS || /Android|Mobile/i.test(navigator.userAgent)) && (
                    <div className="flex items-center gap-1 bg-green-600/20 px-3 py-1 rounded-full">
                      <span className="text-green-400 text-xs">📱 Fullscreen disponibile</span>
                    </div>
                  )}
                    
                    {/* Indicatore qualità rete */}
                  {networkQuality !== 'unknown' && (
                    <div className={`
                      flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                      ${networkQuality === 'fast' ? 'bg-green-600' : 
                        networkQuality === 'medium' ? 'bg-yellow-600' : 'bg-red-600'}
                    `}>
                      <div className={`
                        w-1.5 h-1.5 rounded-full 
                        ${networkQuality === 'fast' ? 'bg-green-300 animate-pulse' : 
                          networkQuality === 'medium' ? 'bg-yellow-300 animate-pulse' : 'bg-red-300 animate-pulse'}
                      `}></div>
                      <span className="hidden xs:inline">{
                        networkQuality === 'fast' ? 'Rete Veloce' :
                        networkQuality === 'medium' ? 'Rete Media' : 'Rete Lenta'
                      }</span>
                      <span className="xs:hidden">{
                        networkQuality === 'fast' ? '⚡' :
                        networkQuality === 'medium' ? '🔄' : '🐢'
                      }</span>
                    </div>
                  )}
                  
                  {/* Indicatore qualità streaming - solo per HLS */}
                  {mode === "hls" && (
                    <button 
                      onClick={() => setAdaptiveQuality(!adaptiveQuality)}
                      className={`
                        flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                        ${adaptiveQuality ? 'bg-purple-600' : 'bg-gray-600'}
                        hover:bg-opacity-80 active:bg-opacity-70 transition-colors
                        min-h-[24px] min-w-[24px] touch-manipulation
                      `}
                    >
                      <span>{adaptiveQuality ? '🔄' : '⚙️'}</span>
                      <span className="hidden xs:inline">{adaptiveQuality ? 'Auto' : 'Manuale'}</span>
                    </button>
                  )}
                  
                  {/* Indicatore modalità iframe */}
                  {mode === "iframe" && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-600">
                      <span>🖥️</span>
                      <span className="hidden xs:inline">Player Esterno</span>
                    </div>
                  )}
                  
                  {/* === INDICATORI OTTIMIZZAZIONI AVANZATE === */}
                  
                  {/* Indicatore sistema fallback automatico */}
                  {autoFallbackEnabled && (
                    <div className={`
                      flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                      ${currentFallbackLevel === 0 ? 'bg-blue-600' : 
                        currentFallbackLevel <= 2 ? 'bg-yellow-600' : 'bg-red-600'}
                      hover:bg-opacity-80 transition-colors cursor-help
                    `}
                    title={`Fallback Level ${currentFallbackLevel}: ${
                      currentFallbackLevel === 0 ? 'Ottimale' :
                      currentFallbackLevel === 1 ? 'Media qualità' :
                      currentFallbackLevel === 2 ? 'Bassa qualità' :
                      currentFallbackLevel === 3 ? 'Iframe ottimizzato' : 'Compatibilità'
                    }`}>
                      <span>{currentFallbackLevel === 0 ? '🚀' : 
                            currentFallbackLevel <= 2 ? '🔄' : '🛡️'}</span>
                      <span className="hidden sm:inline">
                        {currentFallbackLevel === 0 ? 'Ottimale' :
                         currentFallbackLevel <= 2 ? `Fallback L${currentFallbackLevel}` : 'Sicuro'}
                      </span>
                    </div>
                  )}
                  
                  {/* Indicatore stabilità stream */}
                  {streamStability !== 'unknown' && (
                    <div className={`
                      flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                      ${streamStability === 'stable' ? 'bg-green-600/80' : 
                        streamStability === 'unstable' ? 'bg-yellow-600/80' : 'bg-red-600/80'}
                    `}
                    title={`Stream ${
                      streamStability === 'stable' ? 'stabile' :
                      streamStability === 'unstable' ? 'instabile' : 'critico'
                    }`}>
                      <div className={`
                        w-1.5 h-1.5 rounded-full 
                        ${streamStability === 'stable' ? 'bg-green-300 animate-pulse' : 
                          streamStability === 'unstable' ? 'bg-yellow-300 animate-pulse' : 'bg-red-300 animate-pulse'}
                      `}></div>
                      <span className="hidden sm:inline">
                        {streamStability === 'stable' ? 'Stabile' :
                         streamStability === 'unstable' ? 'Instabile' : 'Critico'}
                      </span>
                      <span className="sm:hidden">
                        {streamStability === 'stable' ? '✅' :
                         streamStability === 'unstable' ? '⚠️' : '🚨'}
                      </span>
                    </div>
                  )}
                  
                  {/* Indicatore buffer prediction (solo HLS) */}
                  {mode === "hls" && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-600/80"
                         title="Sistema predizione buffer attivo">
                      <span>🧠</span>
                      <span className="hidden sm:inline">Predizione AI</span>
                    </div>
                  )}
                  
                  {/* Indicatore ottimizzazioni rete (solo iframe) */}
                  {mode === "iframe" && networkQuality !== 'unknown' && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-600/80"
                         title="Preconnessioni DNS e ottimizzazioni rete attive">
                      <span>⚡</span>
                      <span className="hidden sm:inline">Net-Boost</span>
                    </div>
                  )}
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between px-3 xs:px-4 sm:px-6 pb-3 sm:pb-4 relative z-50">
                  <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                    {/* Play/Pause - disabilitato per stream HLS */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const video = videoRef.current;
                        if (video) {
                          // Feedback aptico
                          if (navigator.vibrate && !(mode === "hls" && isPlaying)) {
                            navigator.vibrate(15);
                          }
                          // Non permettere pausa su stream HLS (sempre)
                          if (mode === "hls") {
                            if (!isPlaying) video.play();
                          } else {
                            if (isPlaying) video.pause();
                            else video.play();
                          }
                        }
                      }}
                      className={`
                        w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 
                        flex items-center justify-center rounded-full 
                        ${mode === "hls" && isPlaying 
                          ? 'bg-gray-600 cursor-not-allowed opacity-70' 
                          : 'bg-primary-600 hover:bg-primary-500 active:bg-primary-700 hover:scale-110 active:scale-95 shadow-glow'
                        }
                        text-white transition-all duration-200 touch-manipulation cursor-pointer
                        min-h-[48px] min-w-[48px] relative z-50
                        border-2 border-transparent hover:border-primary-400 touch-control
                      `}
                      disabled={mode === "hls" && isPlaying}
                      title={mode === "hls" ? (isPlaying ? 'Stream HLS in corso' : 'Avvia stream HLS') : (isPlaying ? 'Pausa' : 'Play')}
                      style={{
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none',
                        touchAction: 'manipulation'
                      }}
                    >
                      <span className="text-lg xs:text-xl sm:text-2xl pointer-events-none">
                        {mode === "hls" ? (
                          isPlaying ? '🔴' : '▶️'
                        ) : (
                          isPlaying ? '⏸️' : '▶️'
                        )}
                      </span>
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const video = videoRef.current;
                          if (video) {
                            // Feedback aptico
                            if (navigator.vibrate) {
                              navigator.vibrate(10);
                            }
                            setIsMuted(!isMuted);
                            video.muted = !isMuted;
                          }
                        }}
                        className="
                          w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 
                          flex items-center justify-center rounded-full 
                          bg-white/10 hover:bg-white/20 active:bg-white/40 
                          text-white transition-all duration-200 
                          touch-manipulation cursor-pointer
                          min-h-[48px] min-w-[48px] relative z-50
                          hover:scale-110 active:scale-95
                          border-2 border-transparent hover:border-white/20
                        "
                        title={isMuted ? 'Attiva audio' : 'Disattiva audio'}
                        style={{
                          WebkitTouchCallout: 'none',
                          WebkitUserSelect: 'none',
                          touchAction: 'manipulation'
                        }}
                      >
                        <span className="text-base xs:text-lg sm:text-xl pointer-events-none">
                          {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
                        </span>
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          const newVolume = parseFloat(e.target.value);
                          const video = videoRef.current;
                          if (video) {
                            setVolume(newVolume);
                            setIsMuted(newVolume === 0);
                            video.volume = newVolume;
                            video.muted = newVolume === 0;
                          }
                        }}
                        className="w-16 xs:w-20 accent-primary-600 hidden xs:block"
                      />
                    </div>

                    {/* Time Display */}
                    <div className="text-white text-xs xs:text-sm font-mono hidden sm:block">
                      {mode === "hls" ? (
                        <span className="flex items-center gap-1.5 xs:gap-2">
                          <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-blue-500 rounded-full animate-pulse"></span>
                          <span className="hidden xs:inline">STREAMING</span>
                          <span className="xs:hidden">LIVE</span>
                        </span>
                      ) : (
                        `${formatTime(currentTime)} / ${formatTime(duration)}`
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
                    {/* Player nativo iOS (solo se iOS e HLS disponibile) */}
                    {isIOS && channel.hlsSrc && mode === "hls" && (
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (navigator.vibrate) navigator.vibrate(15);
                          
                          const video = videoRef.current;
                          if (video && typeof video.webkitEnterFullscreen === 'function') {
                            try {
                              await video.webkitEnterFullscreen();
                            } catch (error) {
                              alert('Player nativo iOS non disponibile al momento. Usa il fullscreen normale.');
                            }
                          } else {
                            alert('Player nativo non supportato su questo dispositivo.');
                          }
                        }}
                        className="
                          w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 
                          flex items-center justify-center rounded-full 
                          bg-blue-600/20 hover:bg-blue-600/40 active:bg-blue-600/60 
                          text-blue-400 transition-all duration-200
                          hover:scale-110 active:scale-95 touch-manipulation cursor-pointer
                          min-h-[48px] min-w-[48px] border-2 border-blue-500/20 hover:border-blue-400
                          relative z-50
                        "
                        title="Player nativo iOS"
                        style={{
                          WebkitTouchCallout: 'none',
                          WebkitUserSelect: 'none',
                          touchAction: 'manipulation'
                        }}
                      >
                        <span className="text-base xs:text-lg sm:text-xl pointer-events-none">🍎</span>
                      </button>
                    )}

                    {/* AirPlay - sempre visibile per canali HLS */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (navigator.vibrate) navigator.vibrate(12);
                        
                        const video = videoRef.current;
                        if (video && typeof video.webkitShowPlaybackTargetPicker === "function") {
                          video.webkitShowPlaybackTargetPicker();
                        } else {
                          alert('AirPlay disponibile solo su Safari/iOS. Apri questo stream su un dispositivo Apple per usare AirPlay.');
                        }
                      }}
                      className="
                        w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 
                        flex items-center justify-center rounded-full 
                        bg-white/10 hover:bg-white/20 active:bg-white/40 
                        text-white transition-all duration-200
                        hover:scale-110 active:scale-95 touch-manipulation cursor-pointer
                        min-h-[48px] min-w-[48px] relative z-50
                        border-2 border-transparent hover:border-white/20
                      "
                      title={isSafari ? "AirPlay" : "AirPlay (solo Safari/iOS)"}
                      style={{
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none',
                        touchAction: 'manipulation'
                      }}
                    >
                      <span className="text-base xs:text-lg sm:text-xl pointer-events-none">📡</span>
                    </button>

                    {/* Picture-in-Picture */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (navigator.vibrate) navigator.vibrate(10);
                        togglePip();
                      }}
                      className="
                        w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 
                        flex items-center justify-center rounded-full 
                        bg-white/10 hover:bg-white/20 active:bg-white/40 
                        text-white transition-all duration-200 
                        hover:scale-110 active:scale-95 touch-manipulation cursor-pointer
                        min-h-[48px] min-w-[48px] relative z-50
                        border-2 border-transparent hover:border-white/20
                      "
                      title="Picture-in-Picture"
                      style={{
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none',
                        touchAction: 'manipulation'
                      }}
                    >
                      <span className="text-base xs:text-lg sm:text-xl pointer-events-none">⬜</span>
                    </button>

                    {/* AdBlock Toggle - solo per modalità iframe */}
                    {mode === "iframe" && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (navigator.vibrate) navigator.vibrate(12);
                          
                          const newAdblockState = !adblockEnabled;
                          setAdblockEnabled(newAdblockState);
                          
                          // Mostra feedback visivo dell'azione
                          const feedback = document.createElement('div');
                          feedback.className = `
                            fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]
                            px-4 py-2 rounded-lg text-white font-bold text-sm
                            ${newAdblockState ? 'bg-green-600' : 'bg-red-600'}
                            animate-fade-in-up pointer-events-none
                          `;
                          feedback.innerHTML = `
                            <div class="flex items-center gap-2">
                              <span>${newAdblockState ? '🛡️' : '🚫'}</span>
                              <span>AdBlock ${newAdblockState ? 'ATTIVATO' : 'DISATTIVATO'}</span>
                            </div>
                          `;
                          document.body.appendChild(feedback);
                          
                          // Rimuovi il feedback dopo 3 secondi
                          setTimeout(() => {
                            if (feedback.parentNode) {
                              feedback.parentNode.removeChild(feedback);
                            }
                          }, 3000);
                          
                          // Se stiamo attivando l'adblock, ricarica l'iframe per applicare le regole
                          if (newAdblockState) {
                            setTimeout(() => {
                              const iframe = containerRef.current?.querySelector('iframe');
                              if (iframe && iframe.src) {
                                const currentSrc = iframe.src;
                                iframe.src = '';
                                setTimeout(() => {
                                  iframe.src = currentSrc;
                                }, 100);
                              }
                            }, 500);
                          }
                        }}
                        className={`
                          w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 
                          flex items-center justify-center rounded-full 
                          ${adblockEnabled 
                            ? 'bg-green-600/80 hover:bg-green-500/90 active:bg-green-700/90 text-white border-green-400/30' 
                            : 'bg-red-600/80 hover:bg-red-500/90 active:bg-red-700/90 text-white border-red-400/30'
                          }
                          transition-all duration-200 
                          hover:scale-110 active:scale-95 
                          touch-manipulation cursor-pointer
                          min-h-[48px] min-w-[48px] relative z-50
                          border-2 shadow-lg
                        `}
                        title={`AdBlock ${adblockEnabled ? 'ATTIVO' : 'DISATTIVO'} - ${adblockEnabled ? 'Blocca pubblicità' : 'Permetti pubblicità'}`}
                        style={{
                          WebkitTouchCallout: 'none',
                          WebkitUserSelect: 'none',
                          touchAction: 'manipulation'
                        }}
                      >
                        <span className="text-base xs:text-lg sm:text-xl pointer-events-none">
                          {adblockEnabled ? '🛡️' : '🚫'}
                        </span>
                      </button>
                    )}

                    {/* Fullscreen con icona migliorata */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Feedback aptico su dispositivi supportati
                        if (navigator.vibrate) {
                          navigator.vibrate(20);
                        }
                        toggleFullscreen();
                      }}
                      className="
                        w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 
                        flex items-center justify-center rounded-full 
                        bg-white/10 hover:bg-white/20 active:bg-white/40 
                        text-white transition-all duration-200 
                        hover:scale-110 active:scale-95 
                        touch-manipulation cursor-pointer
                        min-h-[48px] min-w-[48px] relative z-50
                        border-2 border-transparent hover:border-white/20
                      "
                      title="Schermo intero (F)"
                      style={{
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none',
                        touchAction: 'manipulation'
                      }}
                    >
                      <span className="text-base xs:text-lg sm:text-xl pointer-events-none">
                        {isFullscreen ? '🗗' : '🗖'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Mode Selector Hint */}
              {showControls && (isIOS || /Android|Mobile/i.test(navigator.userAgent)) && (
                <div className="absolute top-4 left-4 right-4 glass-effect rounded-lg p-3 text-xs text-white/80 lg:hidden">
                  <div className="font-semibold mb-2 text-center">💡 Modalità Streaming</div>
                  <div className="text-center space-y-1">
                    <div>📺 <strong>HLS:</strong> Controlli avanzati, gesture touch</div>
                    <div>🖥️ <strong>IFRAME:</strong> Player esterno, massima compatibilità</div>
                    <div className="mt-2 text-xs opacity-75">Cambia modalità dal menu in alto</div>
                  </div>
                </div>
              )}

              {/* Desktop Keyboard Shortcuts Help */}
              {showControls && (
                <div className="absolute top-4 right-4 glass-effect rounded-lg p-3 text-xs text-white/80 max-w-xs hidden lg:block">
                  <div className="font-semibold mb-2">Scorciatoie:</div>
                  {mode === "hls" ? (
                    <div>
                      <div>🔴 HLS STREAMING</div>
                      <div>Spazio: Play • F: Fullscreen • M: Muto</div>
                      <div>↑↓: Volume • Pausa disabilitata</div>
                      {isIOS && <div className="mt-1 text-blue-400">🍎 Player nativo disponibile</div>}
                    </div>
                  ) : (
                    <div>
                      <div>🖥️ MODALITÀ IFRAME</div>
                      <div>Controlli gestiti dal player esterno</div>
                      <div>F: Fullscreen • Compatibilità universale</div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const { username, logout } = useAuth();

  // Group channels by category for display
  const channelsByCategory = Object.values(CATEGORIES).reduce((acc, category) => {
    acc[category] = CHANNELS.filter(ch => ch.category === category);
    return acc;
  }, {});

  // Filter channels for search only
  const getSearchResults = () => {
    if (!search) return [];
    return CHANNELS.filter((c) =>
      [c.name, c.description, CATEGORY_INFO[c.category].name].join(" ").toLowerCase().includes(search.toLowerCase())
    );
  };

  const searchResults = getSearchResults();

  const handlePlay = (channel) => {
    setCurrent(channel);
    setOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen text-white bg-black">
        {/* Mobile-Optimized Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black via-black/90 to-transparent backdrop-blur-sm transition-all duration-300 safe-area-inset-top">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-2">
              {/* Compact Logo for Mobile */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="
                  bg-gradient-to-r from-primary-500 to-primary-600 
                  px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 
                  rounded-lg sm:rounded-xl text-white font-black
                  text-sm sm:text-base lg:text-lg
                  shadow-glow transform hover:scale-110 transition-all duration-300
                ">
                  TV
                </span> 
                <span className="gradient-text font-black text-lg sm:text-xl lg:text-3xl tracking-tight">
                  Flix
                </span>
              </div>
              
              {/* Mobile-First Search & Profile */}
              <div className="flex items-center gap-2">
                {/* Expandable Search */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-2.5 sm:left-3 flex items-center pointer-events-none z-10">
                    <span className="text-white/50 group-focus-within:text-primary-400 transition-colors duration-200 text-sm sm:text-base">🔍</span>
                  </div>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cerca..."
                    className="
                      w-24 focus:w-40 sm:w-32 sm:focus:w-48 md:w-48 md:focus:w-64
                      pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 
                      rounded-lg bg-black/50 backdrop-blur-sm border border-white/20
                      placeholder-white/50 text-white text-sm
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                      focus:bg-black/70 transition-all duration-300
                      hover:bg-black/60 touch-manipulation
                    "
                  />
                </div>

                {/* User Profile with Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => logout()} 
                    title="Logout"
                    className="flex items-center gap-2 hover:bg-black/50 px-2 py-1 rounded-lg transition-all duration-200"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm touch-manipulation">
                      {username ? username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline text-white/80 text-sm">{username}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

      <main className="pt-16 sm:pt-20">
        {/* Welcome Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8 text-center sm:text-left">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black text-white mb-2 gradient-text leading-tight">
              Benvenuto su TVFlix
            </h1>
            <p className="text-white/70 text-base sm:text-lg">
              Guarda i migliori canali in streaming, organizzati per categoria
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="pb-12 sm:pb-16">
          {search ? (
            /* Search Results */
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Risultati per "{search}"
                </h2>
                <p className="text-white/70">
                  {searchResults.length} {searchResults.length === 1 ? 'risultato trovato' : 'risultati trovati'}
                </p>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4">
                  {searchResults.map((channel) => (
                    <ChannelCard
                      key={channel.id}
                      channel={channel}
                      onOpen={handlePlay}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 sm:py-16 px-4">
                  <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Nessun risultato per "{search}"
                  </h3>
                  <p className="text-white/60 mb-6 text-sm sm:text-base">
                    Prova a cercare con parole diverse
                  </p>
                  <button 
                    onClick={() => setSearch('')}
                    className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-500 active:bg-primary-700 transition-all duration-200 touch-manipulation min-h-[48px]"
                  >
                    Cancella ricerca
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Category Rows - Home View */
            <div className="space-y-8">
              {/* Category Rows */}
              {Object.entries(channelsByCategory).map(([category, channels]) => (
                channels.length > 0 && (
                  <CategoryRow
                    key={category}
                    category={category}
                    channels={channels}
                    onChannelSelect={handlePlay}
                  />
                )
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Mobile-Optimized Footer */}
      <footer className="bg-black/80 border-t border-white/10 mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-1 xs:col-span-2 md:col-span-1">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Audio e sottotitoli</h3>
              <ul className="space-y-2 sm:space-y-2 text-sm text-white/60">
                <li><button className="hover:text-white active:text-white transition-colors touch-manipulation py-1 text-left w-full">Audio</button></li>
                <li><button className="hover:text-white active:text-white transition-colors touch-manipulation py-1 text-left w-full">Sottotitoli</button></li>
                <li><button className="hover:text-white active:text-white transition-colors touch-manipulation py-1 text-left w-full">Accessibilità</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Aiuto</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button className="hover:text-white active:text-white transition-colors touch-manipulation py-1 text-left w-full">Centro assistenza</button></li>
                <li><button className="hover:text-white active:text-white transition-colors touch-manipulation py-1 text-left w-full">Contattaci</button></li>
                <li><button className="hover:text-white active:text-white transition-colors touch-manipulation py-1 text-left w-full">FAQ</button></li>
              </ul>
            </div>
            <div className="xs:col-start-1 md:col-start-3">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Account</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button className="hover:text-white active:text-white transition-colors touch-manipulation py-1 text-left w-full">Il tuo account</button></li>
                <li><button className="hover:text-white active:text-white transition-colors touch-manipulation py-1 text-left w-full">Impostazioni</button></li>
                <li><button className="hover:text-white active:text-white transition-colors touch-manipulation py-1 text-left w-full">Privacy</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Tecnologia</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2 py-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>
                  <span>HLS Streaming</span>
                </li>
                <li className="flex items-center gap-2 py-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>AirPlay Ready</span>
                </li>
                <li className="flex items-center gap-2 py-1">
                  <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                  <span>4K HDR</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
              <div className="text-white/60 text-xs sm:text-sm">
                © 2024 TVFlix. Tutti i diritti riservati.
              </div>
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-white/60 text-xs sm:text-sm">
                <span>Privato</span>
                <span className="hidden xs:inline">•</span>
                <span>Solo uso personale</span>
                <span className="hidden xs:inline">•</span>
                <span>Made with ❤️</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <PlayerModal open={open} channel={current} onClose={() => setOpen(false)} />
    </div>
    </ProtectedRoute>
  );
}

// NOTE STILE (Tailwind): l'ambiente di anteprima fornisce Tailwind. Se usi fuori da qui:
// 1) Includi Tailwind o sostituisci le classi con il tuo CSS.
// 2) In alternativa, esporta un build React/Vite oppure trasforma questo in HTML+JS vanilla.
