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
  "Buenos días",
  "Buenos dia",
  "Buen dia",
  "Buen día",
  "Buenas tardes",
  "Buenas noches",
  "ole",
  "ola",
  "saludos",
  "saludo",
  "buenas",
  "buena",
];

const thank = addKeyword("gracias", "gracia").addAnswer(
  "De nada, estoy aquí para ayudarte en lo que necesites. Si tienes alguna otra pregunta o problema, no dudes en hacérmelo saber. ¡Siempre estoy a tu disposición!"
);

//////////////////////////////////////////////////////////////////////////////////

const problemas = addKeyword("Problema con platafoma", "problema")
  .addAnswer(
    "¿Estás recibiendo algún mensaje de error específico? Si es así, ¿podrías proporcionar más detalles sobre ese mensaje?"
  )
  .addAnswer(
    "Sería de gran ayuda si pudieras adjuntar una captura de pantalla o un video para que podamos entender mejor el problema y proporcionarte una solución más precisa. ¡Gracias por tu colaboración!"
  );
// .addAnswer(
//   "¡Genial! Gracias por proporcionarnos la captura de pantalla. Esto nos ayudará a entender mejor el problema y encontrar una solución. Vamos a analizar la información que nos has proporcionado y te enviaremos una respuesta tan pronto como sea posible. ¡Gracias por tu paciencia!"
// );

const idkAns = [
  "No he entendido del todo",
  "No estoy seguro de haber comprendido.",
  "No logro entender lo que quieres decir.",
];
//////////////////////////////////////////////////////////////////////////////////

const FAQS = addKeyword("Más").addAnswer(
  "¡Claro! Si deseas obtener más información y conocer las preguntas más frecuentes sobre un tema en particular, te recomiendo que hagas clic en el siguiente enlace. Este enlace te llevará a una lista de preguntas y respuestas comunes que pueden ayudarte a resolver dudas y problemas relacionados con ese tema específico.\n\n https://miquinte.do/es-DO/Partner/Home"
);

//////////////////////////////////////////////////////////////////////////////////

const anyThing = addKeyword("")
  .addAnswer(idkAns[Math.floor(Math.random() * idkAns.length)])
  .addAnswer(
    "¿De todas formas puedo ayudarte con estos temas. Cómo te gustaria continuar?",

    {
      buttons: [
        { body: "Sobre Mi Quinté RD" },
        { body: "Problema con platafoma" },
        { body: "Chatear con asesor" },
      ],
    }
  );

//////////////////////////////////////////////////////////////////////////////////

const asesor = addKeyword("Chatear con asesor")
  .addAnswer(
    hora >= 9 && hora <= 23
      ? "En breve minutos un soporte tecnico se comunicara con usted."
      : "Lo siento, en este momento no tenemos a nadie disponible para atenderte. Nuestro horario de atención es de 9:00 am a 11:00 pm."
  )
  .addAnswer(
    "¿De todas formas puedo ayudarte con estos temas. Cómo te gustaria continuar?",
    
    {
      buttons: [
        { body: "Sobre Mi Quinté RD" },
        { body: "Problema con platafoma" },
        { body: "Chatear con asesor" },
      ],
    }
  );
//////////////////////////////////////////////////////////////////////////////////

const howToPlay = addKeyword("¿Como Jugar la quinté?")
  .addAnswer("Aqui tiene una imagen explicativa...")
  .addAnswer("*Pasos para jugar a la quinté*", {
    media: `https://quintehowtoplay.netlify.app/ReglasWeb.png`,
  });
//////////////////////////////////////////////////////////////////////////////////

const aboutAns = addKeyword("¿Qué es Mi Quinté RD?")
  .addAnswer(
    `Somos MiQuinté RD, el operador en República Dominicana de la empresa internacional PMU (Pari Mutuel Urbain), Ofrecemos apuestas en deportes, carreras de caballos, y otros medios de juego a través de diversas plataformas: Internet, teléfono celular, terminales de apuestas, entre otros.`
  )
  .addAnswer(
    "Si gusta Saber mas nosotros, click en el siguiente enlace:\n https://miquinte.do/es-do/Partner/QuienesSomos"
  );

//////////////////////////////////////////////////////////////////////////////////

const aboutQ = addKeyword("Sobre Mi Quinté RD").addAnswer(
  "😀",
  null,
  async (ctx, { provider }) => {
    const id = ctx.key.remoteJid;
    const sections = [
      {
        title: "Sobre que te gustaria conocer más?", //texto dentro de la lista
        rows: [
          //El es el addKeyword que activa el llamado
          {
            title: "¿Qué es Mi Quinté RD?",
          },
          {
            title: "¿Como Jugar la quinté?",
          },
          {
            title: "Más",
          },
        ],
      },
    ];
    const listMessage = {
      text: "¿Sobre que te gustaria conocer más?", //texto en el mensaje
      title: "",
      buttonText: "Opciones", //texto dentro de la lista
      sections,
    };
    const abc = await provider.getInstance();
    await abc.sendMessage(id, listMessage);
    return;
  }
);

//////////////////////////////////////////////////////////////////////////////////
const flowPrincipal = addKeyword(saludos)
  .addAnswer("🙌 Hola, gracias por comunicarte con el equipo de Mi Quinté RD")
  .addAnswer('¿De todas formas puedo ayudarte con estos temas. Cómo te gustaria continuar?', {
    buttons: [
      { body: "Sobre Mi Quinté RD" },
      { body: "Problema con platafoma" },
      { body: "Chatear con asesor" },
    ],
  });

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
