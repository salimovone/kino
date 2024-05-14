import { Markup, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { get, getDatabase, push, ref, set } from "firebase/database"
// import app from "./firebaseConfig"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const bot = new Telegraf("7066831640:AAEzqv_wkBARzajt_N-Mv9a4DS_x6uTxY2g");

const sardor = 1179267491;
const admins = [sardor, 6648865918];

let createStatus = ""


// for firebase config

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHOcAdjFuguFZC28X37oLRZ5bcd20ToZA",
  authDomain: "kin0searchbot.firebaseapp.com",
  databaseURL: "https://kin0searchbot-default-rtdb.firebaseio.com",
  projectId: "kin0searchbot",
  storageBucket: "kin0searchbot.appspot.com",
  messagingSenderId: "471259576157",
  appId: "1:471259576157:web:4fb68ab69979ccddef9ab4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)






// for functions
let movies = [];

const fetchData = async () => {
    const db = getDatabase(app)
    const dbRef = ref(db, "data/movies")
    const snapshot = await get(dbRef)
    if (snapshot.exists()) {
        const myData = snapshot.val();
        const temporaryArray = Object.keys(myData).map((item) => {
          return {
            ...myData[item],
            id: item,
          };
        });
  
        movies = temporaryArray
      } else {
        console.error("no data")
      }
}

const createData = async (text) => {
  const db = getDatabase(app);
  const newDocRef = push(ref(db, "data/movies"));
  let txt = text.toString().split("\n")
  if(txt.length === 3){
    const newDoc = {
      name: txt[0],
      url: txt[1],
      code: parseInt(txt[2])
    }
    set(newDocRef, newDoc).catch((error) => {
      createStatus = error.message      
    });
    createStatus = "kino bazaga qo'shildi"
  } else {
    createStatus = "ma'lumot to'liq kiritilmagan"
  }
};


const searchMovie = (num) => {
    fetchData()
    let res = {status: 0, name: "",  url: ""}
    setTimeout(()=>{
      movies.forEach((itm, idx)=>{
        if(itm.code == num){
          res.status = 1
          res.name = itm.name
          res.url = itm.url
        }
      })
    }, 3000)
    return res
}




// for bot

bot.command("start", async (ctx) => {
  //   await ctx.sendAnimation(
  //     "https://user-images.githubusercontent.com/14011726/94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif"
  //   );
  await ctx.sendMessage(
    `Salom ${ctx.message.from.first_name} 🖐 \nFilm nomini yoki kodini kriting✍️`
  );
})

// bot.command("settings", async (ctx) => {
//   // await ctx.setChatMenuButton("hello menu button")
//   Markup.button.text("salom markup button", false);
// });




// bot.command("video", (ctx)=>{
//   console.log("maybe it doesn't work");
//   ctx.replyWithVideo({ url: "http://fayllar1.ru/28/kinolar/Godzilla%20minus%201%202024%201080p%20O'zbek%20tilida%20(asilmedia.net).mp4" }, { caption: "movie title" });
// })

bot.on(message("text"), async (ctx) => {
  if (admins.includes(ctx.chat.id)) {
    await ctx.reply(`You are admin`);
    createData(ctx.message.text)
    await ctx.reply(createStatus)
    createStatus = ""
  } else {
    await ctx.reply(`🫡`);
    await ctx.reply(`Film qidirilmoqda....`);
    let res = searchMovie(parseInt(ctx.message.text))
    setTimeout(()=>{
      if(res.status){
        ctx.reply("kino topildi va telegramga yuklanmoqda iltimos kuting!")
        ctx.replyWithVideo({ url: res.url }, { caption: res.name });
      }else{
        ctx.reply("bu kod ostida kino mavjud emas, iltimos kodni tekshirib koring")
      }
    }, 3500)
  }
});

// bot.on(message("video"), async (ctx) => {
//   if (admins.includes(ctx.chat.id)) {
//     await ctx.reply(`You are admin and you send video message`);
//   } else {
//     await ctx.reply(
//       `This feature available soon but now you can send movie code or name only`
//     );
//   }
// });


bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
