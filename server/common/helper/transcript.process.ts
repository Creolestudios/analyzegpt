import { OpenAIEmbeddings } from 'langchain/embeddings';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from 'langchain/vectorstores';
import path from 'path';
import { isVectorStoreExists } from './vector.store.check.js';

/// get the meeting end time
export async function getEndTime(transcript: string): Promise<RegExpExecArray> {
  let meetingEndTime;
  /// pattern to match the hours format in transcript
  const pattern = /.:.{1,2}:.{1,2}\..{1,3}/;
  const regex = new RegExp(pattern, 'g');

  /// iterate until we find the meeting end time
  let match;
  while ((match = regex.exec(transcript)) !== null) {
    meetingEndTime = match;
  }

  return meetingEndTime;
}
export async function appendChunks(__dirname, text, OPEN_AI_KEY) {
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
    await loadedVectorStore.save(path.resolve(__dirname, '../../vector-store'));
  }
}
export async function generateChunks(
  startTimePattern: any,
  endTimePattern: any,
  transcript: string,
  meetingEndTime: RegExpExecArray,
  OPEN_AI_KEY: string,
  hour: number,
  minutes: number,
  __dirname: string,
  callback,
) {
  console.log(OPEN_AI_KEY , minutes);
  
  let indexOfStartTime: number, indexOfEndTime: number;
  /// start and end timing of intervals regex to get the substring
  const startregex = new RegExp(startTimePattern, 'g');
  const endregex = new RegExp(endTimePattern, 'g');

  /// getting the index of start and end timings
  try{
  let startmatch, endmatch;
  startmatch = startregex.exec(transcript);
  endmatch = endregex.exec(transcript);
  indexOfStartTime = startmatch.index;
  indexOfEndTime = endmatch?.index || meetingEndTime.index;

  let text: string;

  if (indexOfEndTime == meetingEndTime.index)
    text = transcript.substring(indexOfStartTime);
  else text = transcript.substring(indexOfStartTime, indexOfEndTime);

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

  console.log(`VectorStore Created for ${hour} hrs ${minutes} minutes....`);

  /// Save the vector store to a directory
  await vectorstore
    .save(path.resolve(__dirname, '../../vector-store', `${hour}_${minutes}`))
    .then(() => {
      callback(__dirname, text, OPEN_AI_KEY);
    });
  }catch(e){
    console.log("vector store errior",e);
    
  }
}
