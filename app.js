const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
  } = require("@bot-whatsapp/bot");
  
  const hora = new Date().getHours();
  console.log(hora);
  const QRPortalWeb = require("@bot-whatsapp/portal");
  const BaileysProvider = require("@bot-whatsapp/provider/baileys");
  const MockAdapter = require("@bot-whatsapp/database/mock");
  
  const saludos = [
    "Hola",
    "Hola!",
    "!",
    "Buenos días",
    "Buenos dia",
    "Buen día",
    "Buenas tardes",
    "Buenas noches",
    "Ole",
    "Ola",
    "Saludos",
    "Saludo",
    "Buenas",
    "Buena",
  ];
  
  const thank = addKeyword("gracias", "gracia").addAnswer(
    "De nada, estoy aquí para ayudarte en lo que necesites 🤗. Si tienes alguna otra pregunta o problema, no dudes en hacérmelo saber. ¡Siempre estoy a tu disposición! 💪"
  );
  
  //////////////////////////////////////////////////////////////////////////////////
  
  const problemas = addKeyword(["Problema con platafoma", "2", "problema"])
    .addAnswer(
      "¿Estás recibiendo algún mensaje de error específico? Si es así, ¿podrías proporcionar más detalles sobre ese mensaje? 🤔"
    )
    .addAnswer(
      "Sería de gran ayuda si pudieras adjuntar una captura de pantalla o un video para que podamos entender mejor el problema y proporcionarte una solución más precisa 📸. ¡Gracias por tu colaboración! 😊"
    )
    .addAnswer("¿Cómo quiere continuar? 😉")
    .addAnswer([
      "1. Sobre Mi Quinté RD 🐎",
      "2. Problema con platafoma 🤔",
      "3. Chatear con asesor 🙋‍♂️",
    ]);
  
  const idkAns = [
    "No he entendido del todo 🤔",
    "No estoy seguro de haber comprendido 🤔.",
    "No logro entender lo que quieres decir 🤔.",
  ];
  
  //////////////////////////////////////////////////////////////////////////////////
  
  const FAQS = addKeyword(["Más 📖", "8"])
    .addAnswer(
      "¡Claro! Si deseas obtener más información y conocer las preguntas más frecuentes sobre un tema en particular, te recomiendo que hagas clic en el siguiente enlace. Este enlace te llevará a una lista de preguntas y respuestas comunes que pueden ayudarte a resolver dudas y problemas relacionados con ese tema específico.\n\n https://miquinte.do/es-DO/Partner/Home 🌐"
    )
    .addAnswer("¿Cómo quiere continuar? 😉")
    .addAnswer([
      "1. Sobre Mi Quinté RD 🐎",
      "2. Problema con platafoma 🤔",
      "3. Chatear con asesor 🙋‍♂️",
    ]);
  
  //////////////////////////////////////////////////////////////////////////////////
  
//////////////////////////////////////////////////////////////////////////////////

const anyThing = addKeyword("")
  .addAnswer(idkAns[Math.floor(Math.random() * idkAns.length)])
  .addAnswer(
    "¿De todas formas puedo ayudarte con estos temas. Cómo te gustaria continuar?"
  )
  .addAnswer("Escriba el numero correspondiente")
  .addAnswer([
    "1. Sobre Mi Quinté RD 🐎",
    "2. Problema con platafoma 🤔",
    "3. Chatear con asesor 🙋‍♂️",
  ]);

//////////////////////////////////////////////////////////////////////////////////

const asesor = addKeyword(["Chatear con asesor", "3"])
  .addAnswer(
    hora >= 9 && hora <= 23
      ? "En breve minutos un soporte tecnico se comunicara con usted."
      : "Lo siento, en este momento no tenemos a nadie disponible para atenderte. Nuestro horario de atención es de 9:00 am a 11:00 pm."
  )
  .addAnswer(
    "¿De todas formas puedo ayudarte con estos temas. Cómo te gustaria continuar?"
  )
  .addAnswer("Escriba el numero correspondiente")
  .addAnswer([
    "1. Sobre Mi Quinté RD 🐎",
    "2. Problema con platafoma 🤔",
    "3. Chatear con asesor 🙋‍♂️",
  ]);
//////////////////////////////////////////////////////////////////////////////////

const howToPlay = addKeyword(["¿Como Jugar la quinté?", "7"])
  .addAnswer("Aqui tiene una imagen explicativa...")
  .addAnswer("*Pasos para jugar a la quinté*", {
    media: `https://quintehowtoplay.netlify.app/ReglasWeb.png`,
  })
  .addAnswer("Comó quiere continuar?")
  .addAnswer([
    "1. Sobre Mi Quinté RD 🐎",
    "2. Problema con platafoma 🤔",
    "3. Chatear con asesor 🙋‍♂️",
  ]);
//////////////////////////////////////////////////////////////////////////////////

const aboutAns = addKeyword(["¿Qué es Mi Quinté RD?", "6"])
  .addAnswer(
    `Somos MiQuinté RD, el operador en República Dominicana de la empresa internacional PMU (Pari Mutuel Urbain), Ofrecemos apuestas en deportes, carreras de caballos, y otros medios de juego a través de diversas plataformas: Internet, teléfono celular, terminales de apuestas, entre otros.`
  )
  .addAnswer(
    "Si gusta Saber mas nosotros, click en el siguiente enlace:\n https://miquinte.do/es-do/Partner/QuienesSomos"
)
.addAnswer('Comó quiere continuar?')
.addAnswer([
    "1. Sobre Mi Quinté RD 🐎",
    "2. Problema con platafoma 🤔",
    "3. Chatear con asesor 🙋‍♂️",
  ]);
//////////////////////////////////////////////////////////////////////////////////

const aboutQ = addKeyword(["Sobre Mi Quinté RD", "1"])
  .addAnswer("😀\nSobre que te gustaria conocer más?")
  .addAnswer([
    "6. ¿Qué es Mi Quinté RD?",
    "7. ¿Como Jugar la quinté?",
    "8. Más",
  ]);

//////////////////////////////////////////////////////////////////////////////////
const flowPrincipal = addKeyword(saludos)
  .addAnswer("🙌 Hola, gracias por comunicarte con el equipo de Mi Quinté RD")
  .addAnswer("En que puedo ayudarte hoy?")
  .addAnswer("Escriba el numero correspondiente")
  .addAnswer([
    "1. Sobre Mi Quinté RD 🐎",
    "2. Problema con platafoma 🤔",
    "3. Chatear con asesor 🙋‍♂️",
  ]);

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    flowPrincipal,
    asesor,
    aboutQ,
    aboutAns,
    howToPlay,
    FAQS,
    problemas,
    thank,
    anyThing,
  ]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
