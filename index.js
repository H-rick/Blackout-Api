bla = process.cwd();
api = process.cwd()
__path = process.cwd()

//★・・・・・・★・・・ MÓDULOS ・・・★・・・・・・★
const express = require("express");
const fetch = require('node-fetch');
const path = require("path");
const fs = require("fs");
const ejs = require('ejs');
const axios = require('axios');
const chalk = require('chalk')
const request = require('request');
const multer = require('multer');
const FormData = require('form-data');
const cookieParser = require('cookie-parser');
const gis = require('g-i-s');

//★・・・・・・★・・・ PORT ・・・★・・・・・・★
const app = express();
const PORT = 2038;
const USERS_FILE = "./dono/users.json";

//★・・・・・・★・・・ CONSOLE ・・・★・・・・・・★
//VERDE
const consoleVerde = (texto) => {console.log(chalk.green(texto))}
const consoleVerde2 = (texto, texto2) => {console.log(chalk.black(chalk.bgGreen(texto)), chalk.black(chalk.white(texto2)))}
//VERMELHO
const consoleVermelho = (texto) => {console.log(chalk.red(texto))}
const consoleVermelho2 = (texto, texto2) => {console.log(chalk.black(chalk.bgRed(texto)), chalk.black(chalk.white(texto2)))}
//AMARELO
const consoleAmarelo = (texto) => {console.log(chalk.yellow(texto))}
const consoleAmarelo2 = (texto, texto2) => {console.log(chalk.black(chalk.bgYellow(texto)), chalk.black(chalk.white(texto2)))}
//AZUL
const consoleAzul = (texto) => {console.log(chalk.blue(texto))}
const consoleAzul2 = (texto, texto2) => {console.log(chalk.black(chalk.bgBlue(texto)), chalk.black(chalk.white(texto2)))}
//CONSOLE DE ERRO
const consoleErro = (texto) => {console.log(chalk.black(chalk.bgRed(`[ ERRO ]`)), chalk.black(chalk.white(`Erro: ${texto}`)))}
//CONSOLE DE AVISO
const consoleAviso = (texto) => {console.log(chalk.black(chalk.bgYellow(`[ AVISO ]`)), chalk.black(chalk.white(texto)))}
//CONSOLE DE SUCESSO
const consoleSucesso = (texto) => {console.log(chalk.black(chalk.bgGreen(`[ SUCESSO ]`)), chalk.black(chalk.white(texto)))}
//CONSOLE DE ONLINE 
const consoleOnline = (texto) => {console.log(chalk.black(chalk.bgGreen(`[ ONLINE ]`)), chalk.black(chalk.white(texto)))}

//CONFIGS DE ADM
const { nomeApi, criador, userAdm, userAdm2, userAdm3, userAdm4, wallpaperApi, musicaApi, fotoApi } = require('./dono/config.json')
const adms = [userAdm, userAdm2, userAdm3, userAdm4];

//SCRAPERS 
const { ytDonlodMp3, ytDonlodMp4, ytPlayMp3, ytPlayMp4, ytSearch } = require("./BANCO DE DADOS/youtube");
const {ytMp3, ytMp4} = require("./BANCO DE DADOS/youtubePh.js")
const { ytsearch, ytMp3Query, ytMp4Query, instagramDl, tiktokDl, xvideosDl, apkpureDl, wikipedia, amazon, tiktokQuery, apkpureQuery, xvideosQuery, aptoide, Pinterest, PinterestMultiMidia, CanvabemVindo, canvaLevel, canvaMusicCard, canvaMusicCard2, canvaMontagem, travaZapImg, travaZapImg2,metadinha2, logo, gemini, imagemAi, stickAi } = require("./BANCO DE DADOS/scraperPh.js")
const { audiomeme, Hentaizinho, Hentaizinho2, plaquinha } = require("./BANCO DE DADOS/pedrozz.js");
const { youtubeadl2, youtubeVideoDl, youtubeSearch, youtubeYtdlv2, youtubeChannel, youtubeTranscript } = require('./BANCO DE DADOS/play')
const { sambaPornoSearch, playStoreSearch,memesDroid,amazonSearch,mercadoLivreSearch2,gruposZap,lulaFlix,pinterestVideoV2,pinterestVideo,animeFireDownload,animesFireSearch,animesFireEps,hentaihome,hentaitube,lojadomecanico,ultimasNoticias,randomGrupos,topFlix,uptodownsrc,uptodowndl,xvideosDownloader,xvideosSearch,fraseAmor,iFunny,frasesPensador,pensadorSearch,wallpaper,porno,hentai,styletext,twitter} = require ("./BANCO DE DADOS/scraper.js")
const { animememe } = require ("./BANCO DE DADOS/animememe.json")
const { wallpaper2 } = require ("./BANCO DE DADOS/wallpapers4k.json")
const { edts } = require ("./BANCO DE DADOS/edits.json")
const { editsjujutsu } = require ("./BANCO DE DADOS/editsjujutsu.json")
const { editsnaruto } = require ("./BANCO DE DADOS/editsnaruto.json")
const { freefire } = require ("./BANCO DE DADOS/freefire.json")
const { kwai } = require ("./BANCO DE DADOS/kwai.js")
const { Tiktok } = require ("./BANCO DE DADOS/tijtok.js"); 

//GETBUFFER PARA IMG
const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})

//PARA PUXAR O JSON DE UM SITE
async function fetchJson (url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
return err
}
}

//★・・・・・・★・・・ MIDDLEWARES ・・・★・・・・・・★
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Função para carregar usuários 
const loadUsers = () => { if (!fs.existsSync(USERS_FILE)) return {}; return JSON.parse(fs.readFileSync(USERS_FILE)); };

// Função para salvar usuários 
const saveUsers = (users) => { fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2)); };

function gerarRandomKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 18; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}

// Reset diário às 00:00
async function resetRequest() {
const agora = new Date();
const horas = agora.getHours();
const minutos = agora.getMinutes();
const segundos = agora.getSeconds();

if (horas === 0 && minutos === 0 && segundos === 0) { 
try {
const users = readUsersFromFile();
users.forEach(user => {
if (user.username.includes(adms)) {
user.request = 100000
} else {
user.request = 30
}
})
consoleAviso('Requests resetados com sucesso!');
} catch (err) {
consoleErro('Erro ao resetar requests:', err);
}
}
}
setInterval(resetRequest, 1000);

// Função para validar API Key e diminuir request 
const usarApiKey = (apikey, jujus) => {
let users = loadUsers(); 
const user = Object.values(users).find(u => u.apikey === apikey); 
if (!user) return "API Key inválida"; 
if (user.request <= 0) return "Sem requests disponíveis";
user.request -= 1;
user.level = (parseFloat(user.level) + 0.1).toFixed(1);
saveUsers(users);
return null;
};

//PARA O UPLOAD 
// Configuração de armazenamento do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Servir a página HTML
app.get('/upload', (req, res) => res.sendFile(path.join(__dirname, './public/assets/upload.html')));

// Rota de upload único
app.post('/upload/single', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ fileUrl });
});

// Rota de upload múltiplo
app.post('/upload/multi', upload.array('files', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const fileUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    res.json({ fileUrls });
});

// Servir arquivos estáticos da pasta uploads
app.use(express.static(path.join('./public', '/')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/deletimg', async (req, res, next) => {
const { idImg, apikey } = req.query;
if (!idImg) {
return res.json({ resposta: "Faltou o parâmetro 'idImg' na query" });
}
if (!apikey) {
return res.json({ resposta: "Faltou o parâmetro 'apikey' na query" });
}
apikeyAdm = ["pedrozz"]
if (!apikeyAdm.includes(apikey)) {return res.json({ resposta: "API key inválida ou não autorizada." });}

const itemPath = `./uploads/${idImg}`
DLT_FL(itemPath);
        
return res.json({ resposta: "Esse arquivo/pasta já foi apagado do servidor" });

});
//★・・・・・・★・・・ ROTAS ・・・★・・・・・・★
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/registro', (req, res) => {
  res.render('regis');
});

//registro
app.post("/register", async (req, res) => {
  try {
const { username, password } = req.body;
let users = loadUsers();
if (users[username]) return res.status(400).json({ error: "Usuário já se encontra registrado...." });
let adds;
const apikey = gerarRandomKey();
if (adms.includes(username)) {adds = true} else {adds = false}
users[username] = {
username, 
senha: password, 
apikey,
level: 0,
foto: fotoApi,
request: 100, 
adm: adds 
};
saveUsers(users);
res.cookie("username", username);
res.redirect("/login");
} catch (error) {
consoleErro("Erro ao registrar novo usuário:", error);
res.status(500).send("Erro interno ao processar a solicitação.");
  }
});

// Login
app.post('/login', (req, res) => {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ error: "Nome e senha são obrigatórios" });
let users = loadUsers();
if (!users[username] || users[username].senha !== password) {
return res.status(401).json({ error: "Usuário ou senha incorretos" });}
res.cookie("username", username);
res.redirect("/docs");
});

//docs
app.get("/docs", (req, res) => {
  const { username } = req.cookies; 
  const users = loadUsers();
  const user = users[username];
  if (user) {
    const { senha, adm, apikey, request, level, foto } = user;
const topUsers = Object.entries(users)
      .map(([username, data]) => ({ username, ...data }))
      .sort((a, b) => (b.level || 0) - (a.level || 0))
      .slice(0, 5);
      
    res.render("docs", {
      username,
      senha,
      apikey,
      request,
      foto,
      level,
      topUsers,
      adm, 
      nomeApi,
      criador, 
      wallpaper: wallpaperApi,
      musica: musicaApi,
      fotoApi
    });
  } else {
    res.redirect("/login");
  }
});

//adm
app.get("/adm", async (req, res) => {
try {
const { username } = req.cookies;
const users = loadUsers();
const user = users[username];
if (!user.adm) return res.status(401).json({ error: "Você não é um usuário adm 😑" });
if (user) {
const { senha, adm, apikey, request, level, foto } = user;
res.render("adm", {
      username,
      senha,
      apikey,
      request,
      adm, 
      foto,
      level,
      nomeApi,
      criador, 
      wallpaper: wallpaperApi,
      musica: musicaApi,
      fotoApi
        });
} else {
res.redirect("/login");
}
} catch (e) {
console.log(e)
}
})

app.post('/configuracaoAdm', async (req, res) => {
try {
const { senha, apikey, request, adm, nome, foto, level } = req.body;
if (!nome) {return res.status(400).json({ error: 'O nome do usuário é obrigatório' });}
const users = loadUsers();
const user = users[nome];
if (!user) {
return res.status(404).json({ error: 'Usuário não encontrado!' });
}

if (apikey?.trim()) user.apikey = apikey;
if (foto?.trim()) user.foto = foto;
if (level?.trim()) user.level = level;
if (senha?.trim()) user.senha = senha;
if (request?.trim()) user.request = request;
if (adm?.trim()) user.adm = adm;
saveUsers(users);

res.status(200).json({ message: 'Configurações atualizadas com sucesso!' });
} catch (err) {
consoleErro("Erro ao atualizar configurações:", err);
res.status(500).json({ error: 'Erro ao atualizar configurações', details: err.message });
    }
});

//PERFIL
app.get("/perfil", async (req, res) => {
try {
const { username } = req.cookies;
const users = loadUsers();
const user = users[username];
if (user) {
const { senha, adm, apikey, request, level, foto } = user;
res.render("perfil", {
      username,
      senha,
      apikey,
      request,
      adm, 
      foto,
      level,
      nomeApi,
      criador, 
      wallpaper: wallpaperApi,
      musica: musicaApi,
      fotoApi
        });
} else {
res.redirect("/login");
}
} catch (e) {
console.log(e)
}
})

app.post('/configuracaoPerfil', async (req, res) => {
try {
const { senha, foto, nome } = req.body;
if (!nome) {return res.status(400).json({ result: 'O nome do usuário é obrigatório' });}
const users = loadUsers();
const user = users[nome];
if (!user) {
return res.status(404).json({ result: 'Usuário não encontrado!' });
}

if (foto?.trim()) user.foto = foto;
if (senha?.trim()) user.senha = senha;
saveUsers(users);

res.status(200).json({ result: 'Configurações atualizadas com sucesso!' });
} catch (err) {
consoleErro("Erro ao atualizar configurações:", err);
res.status(500).json({ result: 'Erro ao atualizar configurações', details: err.message });
    }
});

app.get('/toshiruzsite', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assets', 'botsJho.html'));
});


app.get('/planos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assets', 'planos.html'));
});

app.get('/painel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assets', 'painel.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'assets', 'chat.html'));
});

//ROTAS DE APIS
//★・・・・・・★・・・ EDTS ・・・★・・・・・・★

app.get('/api/video/edts', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'edts');
if (erro) return res.status(403).json({ erro });
try {
const link = edts[Math.floor(Math.random() * edts.length)];
const response = await axios.get(link, {
responseType: 'stream',
headers: { 'User-Agent': 'Mozilla/5.0' } 
});
res.setHeader('Content-Type', 'video/mp4');
response.data.pipe(res);
} catch (e) { consoleErro(e);
res.status(500).json({ status: false, resultado: "ocorreu um erro ao buscar vídeo editado." });
}
});

app.get('/api/video/editsjujutsu', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'editsjujutsu');
if (erro) return res.status(403).json({ erro });
try {
const link = editsjujutsu[Math.floor(Math.random() * editsjujutsu.length)];
const response = await axios.get(link, {
responseType: 'stream',
headers: { 'User-Agent': 'Mozilla/5.0' }
});
res.setHeader('Content-Type', 'video/mp4');
response.data.pipe(res);
} catch (e) {
consoleErro(e);
res.status(500).json({ status: false, resultado: "ocorreu um erro ao buscar edits de Jujutsu." });
}
});

app.get('/api/video/editsnaruto', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'editsnaruto');
if (erro) return res.status(403).json({ erro });
try {
const link = editsnaruto[Math.floor(Math.random() * editsnaruto.length)];
const response = await axios.get(link, { responseType: 'stream' });
res.setHeader('Content-Type', response.headers['content-type']);
response.data.pipe(res);
} catch (e) { consoleErro(e);
res.status(500).json({ status: false, resultado: "ocorreu um erro ao buscar editsnaruto." });
}
});

app.get('/api/video/freefire', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'freefire');
if (erro) return res.status(403).json({ erro });
try {
const link = freefire[Math.floor(Math.random() * freefire.length)];
const response = await axios.get(link, { responseType: 'stream' });
res.setHeader('Content-Type', response.headers['content-type']);
response.data.pipe(res);
} catch (e) { consoleErro(e);
res.status(500).json({ status: false, resultado: "ocorreu um erro ao buscar freefire." });
}
});







//★・・・・・・★・・・ DOWNLOAD ・・・★・・・・・・★
app.get('/api/download/play', async(req, res, next) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'play2');
if (erro) { return res.status(403).json({ erro }); }
 nome = req.query.nome
if(!nome)return res.json({status:false, resultado:'Cade o parametro nome??'})
api = await ytSearch(nome)
ytMp3(api[0].url).then((akk) => {
res.setHeader('Content-Type', 'audio/mpeg');
request.get(akk).pipe(res);
}).catch(e => {
res.json({
status: false,
codigo: 400,
criador: criador,
resultado: "Deu erro ao solicitar seu audio...."
})
console.log(e)
})})

app.get('/api/download/playv3', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'play3');
if (erro) { return res.status(403).json({ erro }); }
const url = req.query.url;
if (!url) return res.json({ status: false, resultado: 'cadê o parâmetro url??' });
try {
ytMp3(url).then((akk) => {
res.setHeader('Content-Type', 'audio/mpeg');
request.get(akk).pipe(res);
})
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao processar o áudio." });
}
});

app.get('/api/download/playv4', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'play4');
if (erro) { return res.status(403).json({ erro }); }
const url = req.query.query;
if (!url) return res.json({ status: false, resultado: 'cadê o parâmetro url??' });
try {
api = await ytSearch(nome)
const result = await youtubeadl2(api[0].url);
ytMp3(api[0].url).then((akk) => {
res.setHeader('Content-Type', 'audio/mpeg');
request.get(akk).pipe(res);
})
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao processar o áudio." });
}
});

app.get('/api/download/playvd', async(req, res, next) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'playvd');
if (erro) { return res.status(403).json({ erro }); }
nome = req.query.nome
if(!nome)return res.json({status:false, resultado:'Cade o parametro nome??'  }) 
api = await ytSearch(nome)
ytMp4(api[0].url).then((akk) => {
res.setHeader('Content-Type', 'video/mp4');
request.get(akk).pipe(res);
}).catch(e => {
res.json({
status: false,
codigo: 400,
criador: criador,
resultado: "Deu erro ao solicitar seu audio...."
})
console.log(e)
})

})

app.get('/api/download/playvdv2', async(req, res, next) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'playvd2');
if (erro) { return res.status(403).json({ erro }); }
 nome = req.query.nome
if(!nome)return res.json({status:false, resultado:'Cade o parametro nome??'  }) 
api = await ytSearch(nome)
ytMp4(api[0].url).then((akk) => {
res.setHeader('Content-Type', 'video/mp4');
request.get(akk).pipe(res);
}).catch(e => {
res.json({
status: false,
codigo: 400,
criador: criador,
resultado: "Deu erro ao solicitar seu audio...."
})
console.log(e)
})})

app.get('/api/download/audiomeme', async(req, res, next) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'audiomeme');
if (erro) { return res.status(403).json({ erro }); }
nome = req.query.nome
if(!nome)return res.json({status:false, resultado:'Cade o parametro nome??'  }) 
audiomeme(nome).then((memin) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: memin
})}).catch(e => {
res.json({
status: false,
codigo: 400,
criador: criador,
resultado: "Deu erro ao solicitar seu meme...."
})
console.log(e)
})})

app.get('/api/download/kwai', async (req, res) => {
const { apikey, nome } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'kwai');
if (erro) return res.status(403).json({ erro });
if (!nome) return res.json({ status: false, resultado: 'Cade o parametro nome??' });
audiomeme(nome).then((memin) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: memin
});
}).catch(e => {
res.json({
status: false,
codigo: 400,
criador,
resultado: "Deu erro ao solicitar seu meme...."
});
console.log(e);
});
});

app.get("/api/download/tiktok", async (req, res) => {
const url = req.query.url
if (!url) return res.status(500).send("Parâmetro url obrigatório")
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, 'NOME');
if (erro) { return res.status(403).json({ erro }); }
try {
tiktokDl(url).then((data) => {
res.json({
data
})
})
} catch (e) {
res.json({
status: "offline",
criadora,
erro: "Deu erro na sua solicitação"
})
}
})

app.get("/api/download/tiktok/video", async (req, res) => {
const url = req.query.url;
const apikey = req.query.apikey;
if (!url || !apikey)
return res.status(400).json({ erro: "Parâmetro url/apikey obrigatório" });
const erro = await usarApiKey(apikey, 'tiktok_video');
if (erro) return res.status(403).json({ erro });
try {
const data = await Tiktok(url);
const videoUrl = data.nowm || data.video || data.play;
if (!videoUrl)
return res.status(404).json({ erro: "Vídeo não encontrado" });
const stream = await axios.get(videoUrl, { responseType: 'stream' });
res.setHeader('Content-Type', 'video/mp4');
stream.data.pipe(res);
} catch (e) {
res.status(500).json({ erro: "Erro ao carregar vídeo", detalhes: e.message });
}
});

app.get("/api/download/tiktok/audio", async (req, res) => {
const url = req.query.url;
const apikey = req.query.apikey;
if (!url) return res.status(400).json({ erro: "Parâmetro url obrigatório" });
if (!apikey) return res.status(400).json({ erro: "Parâmetro apikey é obrigatório" });
const erro = await usarApiKey(apikey, 'tiktok_audio');
if (erro) return res.status(403).json({ erro });
try {
const data = await Tiktok(url);
if (!data.audio) {
return res.status(404).json({
status: "erro",
mensagem: "Áudio não encontrado para o link informado"
});
}
res.json({
status: 'sucesso',
tipo: 'audio',
audio: data.audio, 
qualidade: data.quality || null, 
titulo: data.title || null       
});
} catch (e) {
res.status(500).json({
status: "erro",
mensagem: "Não foi possível baixar o áudio do TikTok",
detalhes: e.message
});
}
});

////★・・・・・・★・・・ PESQUISAS ・・・★・・・・・・★
app.get('/api/pesquisa/youtubeCanal', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'youtubeCanal');
if (erro) { return res.status(403).json({ erro }); }
const nome = req.query.nome;
if (!nome) return res.json({ status: false, resultado: 'cadê o parâmetro nome??' });
try {
const result = await youtubeChannel(nome);
res.json({ status: true, resultado: result });
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao buscar informações do canal." });
}
});

app.get('/api/pesquisa/youtube', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'youtube');
if (erro) { return res.status(403).json({ erro }); }
const nome = req.query.nome;
if (!nome) return res.json({ status: false, resultado: 'cadê o parâmetro nome??' });
try {
ytsearch(nome).then((data) => {
res.json({
data
})
})
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao buscar informações do vídeo." });
}
});

app.get('/api/pesquisa/transcricao', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'youtubeTranscricao');
if (erro) { return res.status(403).json({ erro }); }
const url = req.query.url;
if (!url) return res.json({ status: false, resultado: 'cadê o parâmetro url??' });
try {
const result = await youtubeTranscript(url);
res.json({ status: true, resultado: result });
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao buscar informações do vídeo." });
}
});

app.get('/api/pesquisa/pensadorPesquisa', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'pensadorPesquisa');
if (erro) { return res.status(403).json({ erro }); }
const query = req.query;
if (!query) return res.json({ status: false, resultado: 'cadê o parâmetro query??' });
try {
const result = await pensadorSearch(query);
res.json({ 
status: true, 
criador: criador,
resultado: result });
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao buscar informações do vídeo." });
}
});

app.get('/api/pesquisa/pensadorFrases', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'pensadorFrase');
if (erro) { return res.status(403).json({ erro }); }
const query = req.query;
if (!query) return res.json({ status: false, resultado: 'cadê o parâmetro query??' });
try {
const result = await frasesPensador(query);
res.json({ 
status: true, 
criador: criador,
resultado: result });
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao buscar informações do vídeo." });
}
});

app.get('/api/pesquisa/frasesDeAmor', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'frasesDeAmor');
if (erro) { return res.status(403).json({ erro }); }
const query = req.query;
if (!query) return res.json({ status: false, resultado: 'cadê o parâmetro query??' });
try {
const result = await fraseAmor(query);
res.json({ 
status: true, 
criador: criador,
resultado: result });
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao buscar informações do vídeo." });
}
});

app.get("/api/pesquisa/pinterest", async (req, res) => {
const query = req.query.query
if (!query) return res.status(500).send("Parâmetro query obrigatório")
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, 'NOME');
if (erro) { return res.status(403).json({ erro }); }
try {
Pinterest(query).then((data) => {
res.json({
data
})
})
} catch (e) {
res.json({
status: "offline",
criadora,
erro: "Deu erro na sua solicitação"
})
}
})

app.get("/api/pesquisa/PinterestMultiMidia", async (req, res) => {
const url = req.query.url
if (!url) return res.status(500).send("Parâmetro url obrigatório")
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, 'NOME');
if (erro) { return res.status(403).json({ erro }); }
try {
PinterestMultiMidia(url).then((data) => {
res.json({
data
})
})
} catch (e) {
res.json({
status: "offline",
criadora,
erro: "Deu erro na sua solicitação"
})
}
})

app.get('/api/pesquisa/wallpaper', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'wallpaper');
if (erro) { return res.status(403).json({ erro }); }
const query = req.query;
if (!query) return res.json({ status: false, resultado: 'cadê o parâmetro query??' });
try {
const result = await wallpaper(query);
res.json({ 
status: true, 
criador: criador,
resultado: result });
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao buscar informações do vídeo." });
}
});

app.get('/api/pesquisa/wallpaper2', async (req, res) => {
 const { apikey } = req.query;
 if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'wallpaper2');
if (erro) return res.status(403).json({ erro });
try {
const link = wallpaper2[Math.floor(Math.random() * wallpaper2.length)];
const response = await axios.get(link, { responseType: 'stream' });
res.setHeader('Content-Type', response.headers['content-type']);
response.data.pipe(res);
} catch (e) {
consoleErro(e);
res.status(500).json({ status: false, resultado: "ocorreu um erro ao buscar wallpaper." });
}
});

app.get('/api/pesquisa/hentai', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'hentai');
if (erro) { return res.status(403).json({ erro }); }
const query = req.query;
if (!query) return res.json({ status: false, resultado: 'cadê o parâmetro query??' });
try {
const result = await hentai(query);
res.json({ 
status: true, 
criador: criador,
resultado: result });
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao buscar informações do vídeo." });
}
});

app.get('/api/pesquisa/amazon', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'amazon');
if (erro) { return res.status(403).json({ erro }); }
const query = req.query;
if (!query) return res.json({ status: false, resultado: 'cadê o parâmetro query??' });
try {
const result = await amazonSearch(query);
res.json({ 
status: true, 
criador: criador,
resultado: result });
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao buscar informações do vídeo." });
}
});

app.get('/api/pesquisa/playstore', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'playstore');
if (erro) { return res.status(403).json({ erro }); }
const query = req.query;
if (!query) return res.json({ status: false, resultado: 'cadê o parâmetro query??' });
try {
const result = await playStoreSearch(query);
res.json({ 
status: true, 
criador: criador,
resultado: result });
} catch (e) {
consoleErro(e);
res.json({ status: false, resultado: "ocorreu um erro ao buscar informações do vídeo." });
}
});
//========[ INTELIGÊNCIAS ]========\\
app.get("/api/ai/texto/gemini", async (req, res) => {
const {apikey, query} = req.query;
if (!query) return res.status(500).send("Parâmetro query é obrigatório")
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, 'NOME');
if (erro) { return res.status(403).json({ erro }); }
try {
gemini(query).then((data) => {
res.json({
data
})
})
} catch (e) {
res.json({
status: "offline",
criadora,
erro: "Deu erro na sua solicitação"
})
}
})

app.get("/api/ai/sricker/stickAi", async (req, res) => {
const {apikey, query} = req.query;
if (!query) return res.status(500).send("Parâmetro query é obrigatório")
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, 'NOME');
if (erro) { return res.status(403).json({ erro }); }
try {
stickAi(query).then((data) => {
res.json({
data
})
})
} catch (e) {
res.json({
status: "offline",
criadora,
erro: "Deu erro na sua solicitação"
})
}
})

app.get("/api/ai/imagem/imagemAi", async (req, res) => {
const {apikey, query} = req.query;
if (!query) return res.status(500).send("Parâmetro query é obrigatório")
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, 'NOME');
if (erro) { return res.status(403).json({ erro }); }
try {
result = await imagemAi(query)
console.log(result)
const response = await axios.get(result.resultado.imagem, { responseType: "arraybuffer" });
res.setHeader("Content-Type", response.headers["content-type"]);
res.send(response.data);
} catch (e) {
res.json({
status: "offline",
criadora,
erro: "Deu erro na sua solicitação"
})
console.log(e)
}
})

//======[ IMAGEM ]======\\

app.get('/api/imagem/animememe', async (req, res) => {
const { apikey } = req.query;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'animememe');
if (erro) return res.status(403).json({ erro });
try {
const link = animememe[Math.floor(Math.random() * animememe.length)];
const response = await axios.get(link, { responseType: 'stream' });
res.setHeader('Content-Type', response.headers['content-type']);
response.data.pipe(res);
} catch (e) { consoleErro(e);
res.status(500).json({ status: false, resultado: "ocorreu um erro ao buscar animememe." });
}
});

app.get("/api/imagem/metadinha", async (req, res) => {
const apikey = req.query.apikey;
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'metadinha');
if (erro) return res.status(403).json({ erro });
try {
const bla = process.cwd();
const json = JSON.parse(fs.readFileSync(`${bla}/BANCO DE DADOS/metadinha.json`, 'utf8'));
const random = json[Math.floor(Math.random() * json.length)];
res.json(random);
} catch (e) {
res.status(500).json({ erro: 'Erro ao ler o arquivo JSON' });
}
});

app.get("/api/imagem/metadinha2", async (req, res) => {
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, 'NOME');
if (erro) { return res.status(403).json({ erro }); }
try {
metadinha2().then((data) => {
res.json({
data
})
})
} catch (e) {
res.json({
status: "offline",
criadora,
erro: "Deu erro na sua solicitação"
})
}
})

app.get("/api/imagem/travaZapImg", async (req, res) => {
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, 'NOME');
if (erro) { return res.status(403).json({ erro }); }
try {
travaZapImg().then((data) => {
res.json({
data
})
})
} catch (e) {
res.json({
status: "offline",
criadora,
erro: "Deu erro na sua solicitação"
})
}
})

app.get("/api/imagem/travaZapImg2", async (req, res) => {
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, 'NOME');
if (erro) { return res.status(403).json({ erro }); }
try {
travaZapImg2().then((data) => {
res.json({
data
})
})
} catch (e) {
res.json({
status: "offline",
criadora,
erro: "Deu erro na sua solicitação"
})
}
})

//★・・・・・・★・・・ CANVA ・・・★・・・・・・★
app.get("/api/canva/bemVindo", async (req, res) => {
const {titulo, avatar, fundo, desc, nome} = req.query
if (!titulo || !avatar || !fundo || !desc || !nome) return res.status(500).send("Parâmetro titulo, avatar, fundo, desc, nome são obrigatórios")
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, "uso");
if (erro) { return res.status(403).json({ erro }); }
try {
data = await CanvabemVindo(titulo, avatar, fundo, desc, nome);
const response = await axios.get(data, { responseType: "arraybuffer" });

        res.setHeader("Content-Type", response.headers["content-type"]);

        res.send(response.data);
} catch (e) {
res.json({
status: "offline",
criador,
erro: "Deu erro na sua solicitação"
})
console.log(e)
}
})

app.get("/api/canva/level", async (req, res) => {
const {avatar, fundo, nome, level1, level2} = req.query
if (!nome || !avatar || !fundo || !level1) return res.status(500).send("Parâmetro nome, avatar, fundo, level1, level2 são obrigatórios")
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, "uso");
if (erro) { return res.status(403).json({ erro }); }
try {
data = await canvaLevel(avatar, fundo, nome, level1, level2);
const response = await axios.get(data, { responseType: "arraybuffer" });

        res.setHeader("Content-Type", response.headers["content-type"]);

        res.send(response.data);
} catch (e) {
res.json({
status: "offline",
criador,
erro: "Deu erro na sua solicitação"
})
console.log(e)
}
})

app.get("/api/canva/musicCard", async (req, res) => {
const {avatar, artistName, time, name} = req.query
if (!avatar || !artistName || !time || !name) return res.status(500).send("Parâmetro avatar, artistName, time, name são obrigatórios")
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, "uso");
if (erro) { return res.status(403).json({ erro }); }
try {
data = await canvaMusicCard(avatar, artistName, time, name);
const response = await axios.get(data, { responseType: "arraybuffer" });

        res.setHeader("Content-Type", response.headers["content-type"]);

        res.send(response.data);
} catch (e) {
res.json({
status: "offline",
criador,
erro: "Deu erro na sua solicitação"
})
console.log(e)
}
})

app.get("/api/canva/musicCard2", async (req, res) => {
const {avatar, name, artistName} = req.query
if (!avatar || !name || !artistName) return res.status(500).send("Parâmetro avatar, name, artistName são obrigatórios")
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, "uso");
if (erro) { return res.status(403).json({ erro }); }
try {
data = await canvaMusicCard2(avatar, name, artistName)
const response = await axios.get(data, { responseType: "arraybuffer" });

        res.setHeader("Content-Type", response.headers["content-type"]);

        res.send(response.data);
} catch (e) {
res.json({
status: "offline",
criador,
erro: "Deu erro na sua solicitação"
})
console.log(e)
}
})

app.get("/api/canva/montagem/:nome", async (req, res) => {
const nome = req.params.nome
const link = req.query.url
if (!link) return res.status(500).send("Parâmetro url e obrigatório")
const apikey = req.query.apikey;
if (!apikey) return res.status(500).send("Parâmetro apikey é obrigatório")
const erro = await usarApiKey(apikey, "uso");
if (erro) { return res.status(403).json({ erro }); }
try {
data = await canvaMontagem(nome, link)
const response = await axios.get(data, { responseType: "arraybuffer" });
res.setHeader("Content-Type", response.headers["content-type"]);
res.send(response.data);
} catch (e) {
res.json({
status: "offline",
criador,
erro: "Deu erro na sua solicitação"
})
console.log(e)
}
})

//★・・・・・・★・・・ +18 ・・・★・・・・・・★

app.get('/api/18/:nomeHentai', async(req, res) => {
const { nomeHentai } = req.params;
if (!nomeHentai) return res.status(400).json({ error: "Faltou o parâmetro nome da imagem" });
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, nomeHentai);
if (erro) { return res.status(403).json({ erro }); }
var BLAb = await Hentaizinho(nomeHentai)
res.type('jpg')
res.send(await getBuffer(BLAb))

})

app.get('/api/1o8/:nomeHentai', async(req, res) => {
const { nomeHentai } = req.params;
if (!nomeHentai) return res.status(400).json({ error: "Faltou o parâmetro nome da imagem" });
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, nomeHentai);
if (erro) { return res.status(403).json({ erro }); }
var BLAb = await Hentaizinho2(nomeHentai)
res.type('jpg')
res.send(await getBuffer(BLAb))

})

app.get('/api/:plaquinha2', async(req, res) => {
const { plaquinha2 } = req.params;
var { texto} = req.query;
if (!plaquinha2) return res.status(400).json({ error: "Faltou o parâmetro nome da plaquinha" });
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, plaquinha2);
if (erro) { return res.status(403).json({ erro }); }
if (!texto) return res.status(400).json({ error: "Faltou o parâmetro texto" });
var BLAb = await plaquinha(plaquinha2, texto)
res.type('jpg')
res.send(await getBuffer(BLAb))
})

////★・・・・・・★・・・ FIGURINHAS ・・・★・・・・・・★

app.all('/sticker/figu_emoji', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'figurunhas');
if (erro) { return res.status(403).json({ erro }); }
   try {
   res.type('png')
    var rnd = Math.floor(Math.random() * 102)
   res.send(await getBuffer(`https://raw.githubusercontent.com/Scheyot2/sakura-botv6/master/FIGURINHAS/Figurinha-emoji/${rnd}.webp`))
   } catch (e) {
   res.send(msgApi.error)
   }
   } catch (error) {
consoleErro('Erro no endpoint:', error);
res.status(500).json({ status: false, mensagem: "Erro interno ao processar a solicitação." });
}
   })

app.all('/sticker/figu_desenho2', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'figurunhas');
if (erro) { return res.status(403).json({ erro }); }
   try {
   res.type('png')
    var rnd = Math.floor(Math.random() * 102)
   res.send(await getBuffer(`https://raw.githubusercontent.com/Scheyot2/anya-bot/master/Figurinhas/figu_flork/${rnd}.webp`))
   } catch (e) {
   res.send(msgApi.error)
   }
   } catch (error) {
consoleErro('Erro no endpoint:', error);
res.status(500).json({ status: false, mensagem: "Erro interno ao processar a solicitação." });
}
   })

app.all('/sticker/figu_aleatori', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'figurunhas');
if (erro) { return res.status(403).json({ erro }); }
   try {
   res.type('png')
    var rnd = Math.floor(Math.random() * 8051)
   res.send(await getBuffer(`https://raw.githubusercontent.com/badDevelopper/Testfigu/master/fig (${rnd}).webp`))
   } catch (e) {
   res.send(msgApi.error)
   }
} catch (error) {
consoleErro('Erro no endpoint:', error);
res.status(500).json({ status: false, mensagem: "Erro interno ao processar a solicitação." });
}
   })
app.all('/sticker/figu_memes', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'figurunhas');
if (erro) { return res.status(403).json({ erro }); }
   try {
   res.type('png')
    var rnd = Math.floor(Math.random() * 109)
   res.send(await getBuffer(`https://raw.githubusercontent.com/Scheyot2/sakura-botv6/master/FIGURINHAS/Figurinha-memes/${rnd}.webp`))
   } catch (e) {
   res.send(msgApi.error)
   }
} catch (error) {
consoleErro('Erro no endpoint:', error);
res.status(500).json({ status: false, mensagem: "Erro interno ao processar a solicitação." });
}
   })
   
app.all('/sticker/figu_anime', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'figurunhas');
if (erro) { return res.status(403).json({ erro }); }
   try {
   res.type('png')
    var rnd = Math.floor(Math.random() * 109)
   res.send(await getBuffer(`https://raw.githubusercontent.com/Scheyot2/sakura-botv6/master/FIGURINHAS/figurinha-anime/${rnd}.webp`))
   } catch (e) {
   res.send(msgApi.error)
   }
   } catch (error) {
consoleErro('Erro no endpoint:', error);
res.status(500).json({ status: false, mensagem: "Erro interno ao processar a solicitação." });
}
   })
   
app.all('/sticker/figu_coreana', async (req, res) => {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'figurunhas');
if (erro) { return res.status(403).json({ erro }); }
   try {
   res.type('png')
    var rnd = Math.floor(Math.random() * 43)
   res.send(await getBuffer(`https://raw.githubusercontent.com/Scheyot2/sakura-botv6/master/FIGURINHAS/figurinha-coreana/${rnd}.webp`))
   } catch (e) {
   res.send(msgApi.error)
   }
   })
app.all('/sticker/figu_bebe', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'figurunhas');
if (erro) { return res.status(403).json({ erro }); }
   try {
   res.type('png')
    var rnd = Math.floor(Math.random() * 17)
   res.send(await getBuffer(`https://raw.githubusercontent.com/badDevelopper/Apis/master/pack/figbebe/${rnd}.webp`))
   } catch (e) {
   res.send(msgApi.error)
   }
   } catch (error) {
consoleErro('Erro no endpoint:', error);
res.status(500).json({ status: false, mensagem: "Erro interno ao processar a solicitação." });
}
   })
   
app.all('/sticker/figu_desenho', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'figurunhas');
if (erro) { return res.status(403).json({ erro }); }
   try {
   res.type('png')
    var rnd = Math.floor(Math.random() * 50)
   res.send(await getBuffer(`https://raw.githubusercontent.com/Scheyot2/sakura-botv6/master/FIGURINHAS/figurinha-desenho/${rnd}.webp`))
   } catch (e) {
   res.send(msgApi.error)
   }
   } catch (error) {
consoleErro('Erro no endpoint:', error);
res.status(500).json({ status: false, mensagem: "Erro interno ao processar a solicitação." });
}
   })
   
app.all('/sticker/figu_animais', async (req, res) => {
try {
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'figurunhas');
if (erro) { return res.status(403).json({ erro }); }
   try {
   res.type('png')
    var rnd = Math.floor(Math.random() * 50)
   res.send(await getBuffer(`https://raw.githubusercontent.com/badDevelopper/Apis/master/pack/figanimais/${rnd}.webp`))
   } catch (e) {
   res.send(msgApi.error)
   }
   } catch (error) {
consoleErro('Erro no endpoint:', error);
res.status(500).json({ status: false, mensagem: "Erro interno ao processar a solicitação." });
}
   })

//FEITAS POR PEDROZZ MODS

app.all('/sticker/:nomesFigu', async (req, res) => {
try {
const { nomesFigu } = req.params;
const { apikey } = req.query;  
if (!apikey) return res.status(400).json({ erro: 'API Key é necessária' });
const erro = await usarApiKey(apikey, 'figurunhas');
if (erro) { return res.status(403).json({ erro }); }
   try {
const config = {
figu_random: { pastaName: 'random', NomeFig: 'ramdon', max: 585 },
'figu+18': { pastaName: '+18', NomeFig: 'figurinhas', max: 89 },
figu_memes2: { pastaName: 'memes', NomeFig: 'figurinhas', max: 49 },
figu_anime2: { pastaName: 'animes', NomeFig: 'figurinhas', max: 220 },
figu_coreanas2: { pastaName: 'coreanas', NomeFig: 'figurinhas', max: 73 },
figu_gatos: { pastaName: 'gatos', NomeFig: 'figurinhas', max: 108 },
figu_bts: { pastaName: 'bts', NomeFig: 'figurinhas', max: 30 },
};

const { pastaName, NomeFig, max } = config[nomesFigu];

   res.type('png')
    var numero = Math.floor(Math.random() * max)
   res.send(await getBuffer(`https://pedrozz13755.github.io/Arquivos_web/figurinhas/${pastaName}/${NomeFig}${numero}.webp`))
   } catch (e) {
   res.send(msgApi.error)
   }
   } catch (error) {
consoleErro('Erro no endpoint:', error);
res.status(500).json({ status: false, mensagem: "Erro interno ao processar a solicitação." });
}
})   

//Imagens
app.get("/api/imagem/logo/:logoName", async (req, res) => {
    const { apikey, query } = req.query;
    const logoName = req.params.logoName;

    if (!apikey) return res.status(400).json({ erro: "Parâmetro 'apikey' é obrigatório" });
    if (!query) return res.status(400).json({ erro: "Parâmetro 'query' é obrigatório" });

    const erro = await usarApiKey(apikey, "uso");
if (erro) { return res.status(403).json({ erro }); }

    try {
        const dd = await logo(logoName, query)
        const response = await axios.get(dd, { responseType: "arraybuffer" });

        res.setHeader("Content-Type", response.headers["content-type"]);

        res.send(response.data);
    } catch (e) {
        res.status(500).json({
            status: "offline",
            erro: "Erro ao buscar a imagem"
        });
    }
});
///\\\

app.listen(PORT, () => {
consoleSucesso(`${nomeApi} rodando em http://localhost:${PORT}`);
});

fs.watchFile('./index.js', (curr, prev) => {
if (curr.mtime.getTime() !== prev.mtime.getTime()) {
consoleAviso('Código editado, reiniciando...');
process.exit();
}
});

