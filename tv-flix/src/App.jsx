import React, { useEffect, useRef, useState } from "react";
import { getChannelThumbnail, getChannelLogo } from "./constants/images.js";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

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
    id: "dazn-1",
    name: "DAZN 1",
    description: "Il meglio dello sport italiano e internazionale in diretta 24/7",
    logo: getChannelLogo("dazn_1"),
    thumbnail: getChannelThumbnail("dazn_1", CATEGORIES.SPORTS),
    category: CATEGORIES.SPORTS,
    quality: "4K HDR",
    rating: 4.8,
    year: "2024",
    iframeSrc: "https://dlhd.dad/stream/stream-55.php",
    hlsSrc: "https://card-images-save-two.s3.us-east-1.amazonaws.com/hls/4k/playlist.m3u8?token=qr9gk2s8wkd&v=1758969240399",
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
    iframeSrc: "https://dlhd.dad/stream/stream-877.php",
    hlsSrc: "https://card-images-save-two.s3.us-east-1.amazonaws.com/hls/4k/playlist.m3u8?token=qr9gk2s8wkd&v=1758969240399",
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
function CategoryRow({ category, channels, onChannelSelect }) {
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
}

// === MINIMAL CHANNEL CARD ===
function ChannelCard({ channel, onOpen }) {
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
}

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
  
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const networkCheckRef = useRef(null);
  const hlsInstanceRef = useRef(null); // Riferimento all'istanza HLS per controllo livelli
  const isSafari = useIsSafari();
  const [airplayAvailable, setAirplayAvailable] = useState(false);

  // Rilevamento del sistema operativo per ottimizzazioni specifiche
  const [isIOS, setIsIOS] = useState(false);

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
  
  // Rilevamento qualità della rete per adattare lo streaming
  useEffect(() => {
    if (!open) return;
    
    // Usa l'API Network Information quando disponibile
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    const checkNetworkQuality = () => {
      // Metodo 1: Usa Network Information API se disponibile
      if (connection) {
        const { effectiveType, downlink, rtt } = connection;
        
        // Determina qualità basata su tipo connessione
        if (effectiveType === '4g' && downlink > 5) {
          setNetworkQuality('fast');
        } else if ((effectiveType === '4g' && downlink <= 5) || 
                   (effectiveType === '3g' && downlink > 1.5)) {
          setNetworkQuality('medium');
        } else {
          setNetworkQuality('slow');
        }
        
        console.info(`Qualità rete: ${effectiveType}, ${downlink}Mbps, RTT ${rtt}ms`);
      } 
      // Metodo 2: Testa velocità download di un piccolo file test
      else {
        const startTime = Date.now();
        const testUrl = 'https://cdn.jsdelivr.net/gh/interactiveJS/cdn-test@master/10kb.jpg';
        
        fetch(testUrl + '?nocache=' + Math.random(), { method: 'HEAD' })
          .then(() => {
            const duration = Date.now() - startTime;
            // 10KB test: <100ms=veloce, 100-500ms=media, >500ms=lenta
            if (duration < 100) {
              setNetworkQuality('fast');
            } else if (duration < 500) {
              setNetworkQuality('medium');
            } else {
              setNetworkQuality('slow');
            }
            console.info(`Test velocità rete: ${duration}ms`);
          })
          .catch(() => {
            console.warn('Test velocità rete fallito, presumo connessione lenta');
            setNetworkQuality('slow');
          });
      }
    };
    
    // Controlla la qualità della rete all'apertura del player
    checkNetworkQuality();
    
    // Monitora cambiamenti nella connessione quando possibile
    if (connection) {
      connection.addEventListener('change', checkNetworkQuality);
    }
    
    // Controlla periodicamente la connessione
    networkCheckRef.current = setInterval(checkNetworkQuality, 30000); // Ogni 30 secondi
    
    return () => {
      if (connection) {
        connection.removeEventListener('change', checkNetworkQuality);
      }
      if (networkCheckRef.current) {
        clearInterval(networkCheckRef.current);
      }
    };
  }, [open]);
  
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

        const hlsConfig = {
          enableWorker: true,
          startLevel: -1, // Auto quality
          capLevelToPlayerSize: true,
          
          // Ottimizzazioni specifiche per mobile
          abrEwmaDefaultEstimate: isMobile ? 300000 : 500000, // Stima iniziale più conservativa su mobile
          abrBandWidthFactor: isMobile ? 0.7 : 0.8, // Più conservativo su mobile
          abrBandWidthUpFactor: isMobile ? 0.6 : 0.7, // Aumenta qualità più lentamente su mobile
          abrMaxWithRealBitrate: true, // Usa bitrate reale per decisioni ABR
          
          // Buffer management ottimizzato per connessioni mobili
          maxBufferLength: isSlowConnection ? 60 : (isMobile ? 30 : 20), // Buffer più lungo su connessioni lente
          maxMaxBufferLength: isSlowConnection ? 120 : (isMobile ? 60 : 30),
          maxBufferSize: isLowEndDevice ? 30 * 1000 * 1000 : 60 * 1000 * 1000, // 30MB per device low-end
          maxBufferHole: isMobile ? 0.7 : 0.5, // Tolleranza gap nel buffer
          
          // Loading e retry ottimizzati per mobile
          fragLoadingMaxRetry: isMobile ? 6 : 4, // Più tentativi su mobile
          fragLoadingMaxRetryTimeout: isMobile ? 8000 : 4000, // Timeout più lungo su mobile
          manifestLoadingMaxRetry: 6,
          manifestLoadingMaxRetryTimeout: 8000,
          levelLoadingMaxRetry: 6,
          levelLoadingMaxRetryTimeout: 8000,
          
          // Streaming progressivo per startup più veloce
          progressive: true,
          lowLatencyMode: false, // Disabilita su mobile per risparmiare batteria
          
          // Buffer management avanzato
          backBufferLength: isMobile ? 60 : 30, // Buffer indietro più lungo su mobile
          livelsLoadingTimeOut: 15000, // Timeout caricamento livelli
          
          // Ottimizzazioni network specifiche
          testBandwidth: !isSlowConnection, // Disabilita test banda su connessioni lente
          
          // Configurazioni per device low-end
          ...(isLowEndDevice && {
            startLevel: 0, // Inizia sempre con qualità più bassa
            abrEwmaDefaultEstimate: 200000, // Stima molto conservativa
            maxBufferLength: 20,
            maxMaxBufferLength: 40,
            enableWorker: false // Disabilita worker su device molto vecchi
          }),
          
          // Configurazioni per connessioni molto lente
          ...(isSlowConnection && {
            startLevel: 0,
            abrBandWidthFactor: 0.5, // Molto conservativo
            fragLoadingMaxRetry: 8,
            fragLoadingMaxRetryTimeout: 12000
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
        
        // Monitoraggio performance streaming
        hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
          // Monitora performance caricamento frammenti per ottimizzazioni
          const loadTime = data.stats.loading.end - data.stats.loading.start;
          if (loadTime > 5000 && isMobile) { // Caricamento lento su mobile
            console.warn(`HLS: Caricamento lento rilevato (${loadTime}ms), suggerisco qualità inferiore`);
            // Forza livello più basso se disponibile
            const currentLevel = hls.currentLevel;
            if (currentLevel > 0) {
              hls.nextLevel = currentLevel - 1;
            }
          }
        });
        
        // Gestione errori potenziata per mobile
        let networkErrorCount = 0;
        let mediaErrorCount = 0;
        
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS Error:', data.type, data.details, data);
          
          if (data.fatal) {
            switch(data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                networkErrorCount++;
                console.error(`HLS: Errore rete fatale #${networkErrorCount}`);
                
                if (networkErrorCount < 3) {
                  // Tenta recovery con retry esponenziale
                  const retryDelay = Math.pow(2, networkErrorCount) * 1000; // 2s, 4s, 8s
                  console.info(`HLS: Riprovo in ${retryDelay}ms...`);
                  
                  if (isMobile) {
                    // Mostra feedback visivo su mobile
                    const errorHint = document.createElement('div');
                    errorHint.className = 'absolute top-4 left-4 right-4 bg-red-600/90 text-white p-2 rounded-lg text-sm z-50';
                    errorHint.innerHTML = `🔄 Connessione instabile, riprovo... (${networkErrorCount}/3)`;
                    video.parentElement?.appendChild(errorHint);
                    setTimeout(() => errorHint.remove(), retryDelay);
                  }
                  
                  setTimeout(() => {
                    hls.startLoad();
                    setIsLoading(true);
                  }, retryDelay);
                } else {
                  console.error('HLS: Troppi errori di rete, fallback necessario');
                  if (isMobile) {
                    // Suggerisci cambio qualità o ricaricamento
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'absolute inset-4 bg-red-600/95 text-white p-4 rounded-lg text-sm z-50 flex flex-col items-center justify-center';
                    errorMessage.innerHTML = `
                      <div class="text-center">
                        <div class="text-2xl mb-2">⚠️</div>
                        <div class="font-bold mb-2">Problema di connessione</div>
                        <div class="mb-4">Impossibile caricare lo stream</div>
                        <button onclick="location.reload()" class="bg-white text-red-600 px-4 py-2 rounded-lg font-bold">
                          Ricarica pagina
                        </button>
                      </div>
                    `;
                    video.parentElement?.appendChild(errorMessage);
                  }
                }
                break;
                
              case Hls.ErrorTypes.MEDIA_ERROR:
                mediaErrorCount++;
                console.error(`HLS: Errore media fatale #${mediaErrorCount}`);
                
                if (mediaErrorCount < 2) {
                  console.info('HLS: Tentativo recovery errore media...');
                  hls.recoverMediaError();
                  
                  if (isMobile) {
                    const mediaHint = document.createElement('div');
                    mediaHint.className = 'absolute top-4 left-4 right-4 bg-orange-600/90 text-white p-2 rounded-lg text-sm z-50';
                    mediaHint.textContent = '🔧 Ripristino stream in corso...';
                    video.parentElement?.appendChild(mediaHint);
                    setTimeout(() => mediaHint.remove(), 3000);
                  }
                } else {
                  console.error('HLS: Recovery media fallito');
                  // Fallback: ricarica completamente
                  if (channel.hlsSrc) {
                    console.info('HLS: Ricarico stream da capo...');
                    hls.destroy();
                    hls.loadSource(channel.hlsSrc);
                    hls.attachMedia(video);
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
        
        // Monitora i buffer per una migliore esperienza utente
        hls.on(Hls.Events.BUFFER_CREATED, () => {
          setIsLoading(false);
        });
        
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
  }, [open, isPlaying, isMuted, volume]);

  if (!open || !channel) return null;

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
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
                <div className="hidden md:flex gap-1 glass-effect rounded-xl p-1">
                  <button
                    onClick={() => setMode("hls")}
                    className={`
                      px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg text-xs xs:text-sm font-medium transition-all duration-200
                      ${mode === "hls" 
                        ? "bg-primary-600 text-white shadow-glow" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    📺 HLS
                  </button>
                  <button
                    onClick={() => setMode("iframe")}
                    className={`
                      px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg text-xs xs:text-sm font-medium transition-all duration-200
                      ${mode === "iframe" 
                        ? "bg-primary-600 text-white shadow-glow" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    🖥️ IFRAME
                  </button>
                </div>
              )}
              <button
                onClick={onClose}
                className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-lg xs:rounded-xl bg-white text-black text-xs xs:text-sm font-bold hover:bg-white/90 active:bg-white/80 transition-all duration-200 transform hover:scale-105 touch-manipulation min-h-[44px]"
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
            <iframe
              src={channel.iframeSrc}
              title={channel.name}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
            />
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
                  this.touchStartX = touchX;
                  this.touchStartY = touchY;
                  this.touchStartTime = Date.now();
                  
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
                  const touchDuration = Date.now() - (this.touchStartTime || 0);
                  
                  // Calcola swipe
                  const deltaX = touchEndX - (this.touchStartX || 0);
                  const deltaY = touchEndY - (this.touchStartY || 0);
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
                transition-all duration-300 transform
                ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
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
                
                {/* HLS Streaming Indicator con stato rete */}
                {mode === "hls" && (
                  <div className="px-6 pb-2 flex items-center justify-center flex-wrap gap-2">
                    <div className="flex items-center gap-2 bg-blue-600 px-4 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-bold">STREAMING HLS</span>
                    </div>
                    
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
                    
                    {/* Indicatore qualità streaming */}
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
                  </div>
                )}

                {/* Control Buttons */}
                <div className="flex items-center justify-between px-3 xs:px-4 sm:px-6 pb-3 sm:pb-4">
                  <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                    {/* Play/Pause - disabilitato per stream HLS */}
                    <button
                      onClick={() => {
                        const video = videoRef.current;
                        if (video) {
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
                        w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full 
                        ${mode === "hls" && isPlaying 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : 'bg-primary-600 hover:bg-primary-500 active:bg-primary-700 hover:scale-110 active:scale-95'
                        }
                        text-white transition-all duration-200 shadow-glow touch-manipulation
                        min-h-[44px] min-w-[44px]
                      `}
                      disabled={mode === "hls" && isPlaying}
                      title={mode === "hls" ? (isPlaying ? 'Stream HLS in corso' : 'Avvia stream HLS') : (isPlaying ? 'Pausa' : 'Play')}
                    >
                      {mode === "hls" ? (
                        isPlaying ? '🔴' : '▶️'
                      ) : (
                        isPlaying ? '⏸️' : '▶️'
                      )}
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <button
                        onClick={() => {
                          const video = videoRef.current;
                          if (video) {
                            setIsMuted(!isMuted);
                            video.muted = !isMuted;
                          }
                        }}
                        className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-all duration-200 touch-manipulation min-h-[44px] min-w-[44px]"
                      >
                        {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
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
                    {isIOS && channel.hlsSrc && (
                      <button
                        onClick={async () => {
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
                          w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full 
                          bg-blue-600/20 hover:bg-blue-600/40 active:bg-blue-600/60 text-blue-400 transition-all duration-200
                          hover:scale-110 active:scale-95 touch-manipulation
                          min-h-[44px] min-w-[44px] border border-blue-500/20
                        "
                        title="Player nativo iOS"
                      >
                        <span className="text-sm xs:text-base sm:text-lg">🍎</span>
                      </button>
                    )}

                    {/* AirPlay - sempre visibile per canali HLS */}
                    <button
                      onClick={() => {
                        const video = videoRef.current;
                        if (video && typeof video.webkitShowPlaybackTargetPicker === "function") {
                          video.webkitShowPlaybackTargetPicker();
                        } else {
                          alert('AirPlay disponibile solo su Safari/iOS. Apri questo stream su un dispositivo Apple per usare AirPlay.');
                        }
                      }}
                      className="
                        w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full 
                        bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-all duration-200
                        hover:scale-110 active:scale-95 touch-manipulation
                        min-h-[44px] min-w-[44px]
                      "
                      title={isSafari ? "AirPlay" : "AirPlay (solo Safari/iOS)"}
                    >
                      <span className="text-sm xs:text-base sm:text-lg">📡</span>
                    </button>

                    {/* Picture-in-Picture */}
                    <button
                      onClick={togglePip}
                      className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation min-h-[44px] min-w-[44px]"
                      title="Picture-in-Picture"
                    >
                      <span className="text-sm xs:text-base sm:text-lg">⬜</span>
                    </button>

                    {/* Fullscreen con icona migliorata */}
                    <button
                      onClick={toggleFullscreen}
                      className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation min-h-[44px] min-w-[44px]"
                      title="Schermo intero (F)"
                    >
                      <span className="text-sm xs:text-base sm:text-lg">
                        {isFullscreen ? '↙️' : '↗️'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Keyboard Shortcuts Help */}
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
                      <div>Spazio: Play/Pausa • F: Fullscreen • M: Muto</div>
                      <div>←→: Salta 10s • ↑↓: Volume</div>
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
