<h1 align="center">Welcome to Transcript GPT 👋</h1>
<p align="center">
  <img src="https://img.shields.io/npm/v/readme-md-generator.svg?orange=blue" />
  <a href="https://www.npmjs.com/package/readme-md-generator">
    <img alt="downloads" src="https://img.shields.io/npm/dm/readme-md-generator.svg?color=blue" target="_blank" />
  </a>
  <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://codecov.io/gh/kefranabg/readme-md-generator">
    <img src="https://codecov.io/gh/kefranabg/readme-md-generator/branch/master/graph/badge.svg" />
  </a>
  <a href="https://github.com/frinyvonnick/gitmoji-changelog">
    <img src="https://img.shields.io/badge/changelog-gitmoji-brightgreen.svg" alt="gitmoji-changelog">
  </a>
 
</p>



# analyzegpt
Upload any of your transcripts and analyze between all the important keywords, situations, challenges, risks, impacts and solutions with the help GPT knowledge base.

# Live Demo 

https://www.creole.tech/transcriptgpt/

# Server


```

$ npm  install 

$ npm run start:dev

```


##  🚀 Create Vector Store (DB) from transcript

```
 async createVectorStore(text: string) {
    try {
      /// if vector store exists then add data to it else create new store
      if (!isVectorStoreExists(__dirname)) {
        let vectorstore;
        /* Split the text into chunks */
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: 1000,
        });
        const docs = await textSplitter.createDocuments([text]);
        /* Create the vectorstore */
        vectorstore = await HNSWLib.fromDocuments(
          docs,
          new OpenAIEmbeddings({
            openAIApiKey: OPEN_AI_KEY,
          }),
        );
        console.log('VectorStore Created....');

        /// Save the vector store to a directory
        await vectorstore.save(path.resolve(__dirname, '../../vector-store'));
      } else {
        // Load the vector store from the same directory
        const loadedVectorStore = await HNSWLib.load(
          path.resolve(__dirname, '../../vector-store'),
          new OpenAIEmbeddings({ openAIApiKey: OPEN_AI_KEY }),
        );
        /* Split the text into chunks */
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: 1000,
        });
        const docs = await textSplitter.createDocuments([text]);
        await loadedVectorStore.addDocuments(docs);
        console.log('Data added to the VectorStore....');
        /// Save the vector store to the same directory
        await loadedVectorStore.save(
          path.resolve(__dirname, '../../vector-store'),
        );
      }
    } catch (e) {
      console.log(
        'Error in createVectorStore Function of langchain.service.ts ',
        e,
      );
    }
  }
```

## 🚀 Generate Response from openAI using gpt-3.5-turbo model

```
export const getModel = async (count: number, KEY: string): Promise<OpenAI> => {
  const model = new OpenAI({
    openAIApiKey: KEY,
    // modelName: 'gpt-3.5-turbo',
    modelName: 'gpt-4',
    temperature: 0.4,
    // topP: 1.0,
    maxTokens: 1000,
    maxConcurrency: 10,
    maxRetries: 10,
    cache: false,
    streaming: true,
    callbacks: [
      {
        handleLLMStart: async () => {
          console.log('\nAPI CALL :', count);
        },
        handleLLMNewToken(token: string) {
          process.stdout.write(token);
        },
        handleLLMEnd: async () => {
          process.stdout.write('\n\n');
        },
      },
    ],
  });

  return model;
};
```

## Prompt Defination(Get situations based on keywords)

below is example of prompt engineering which list situations from keywords  

```
export const list_situtation = `
Act as Cyber Security executive give list of all situations that arise based on below given technical keywords in context of given conversation in bullet points. i want you to give only 5 situations for given keywords and explain each situation in more than 60 words.  \n\n

Output as a JSON object mentioned below
{
    "situations": [
        {
            situation:
            explanation:
        }
         
    ]
}
\n\n
"keywords": `;
```

below is example of prompt engineering which list challenges from situations
```
export const list_challenges = `
Act as Cyber Security Executive,based given below situations what are challenges and/or problems for each situation that need to be addressed in the given conversation. list in bullet point for each. \n\n

Output as a JSON object mentioned below
{
    "challenges": []
}
\n\n
`;
```



# Client


```

$ npm  install 

$ npm  start

```
