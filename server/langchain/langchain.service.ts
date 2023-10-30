import { Injectable } from '@nestjs/common';
import { isVectorStoreExists } from '../common/helper/vector.store.check.js';
import { HNSWLib } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import path from 'path';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAI } from 'langchain/llms/openai';
import {
  ConversationalRetrievalQAChain,
  VectorDBQAChain,
  loadSummarizationChain,
} from 'langchain/chains';
import {
  list_challenges,
  listing_issues,
  list_keywords,
  solutions_based_challenges,
  list_risks,
  solutions_based_challenges_and_risks,
  list_situtation,
  risks_based_on_challenge,
  impact_sol_based_on_risks,
} from '../prompts/prompts.js';
import {
  getModel,
  getVectorStore,
  getVectorStoreAsInterval,
} from '../common/helper/langchain.helper.js';
import { fileURLToPath } from 'url';
import { PromptTemplate } from 'langchain/prompts';
import { ConfigService } from '@nestjs/config';
import {
  appendChunks,
  generateChunks,
  getEndTime,
} from '../common/helper/transcript.process.js';

/// Global variables
let count: number = 0;
let OPEN_AI_KEY: string;
let chunkProcess;
let meetingEndTime;
let runningTime;
let runningProcess;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Injectable()
export class LangChainService {

  constructor(private readonly config: ConfigService) {
    OPEN_AI_KEY = this.config.get<string>('OPEN_AI_KEY');
  }
  /// Vector store
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

  /// get end time
  async getIntervals(text: string) {
    meetingEndTime = await getEndTime(text);
    let intervals = [];
    /// set the inital start of the meeting
    let h = 0,
      m = 0;
    /// initially 5 minutes intervals
    let increment = parseInt(this.config.get<string>('INTERVAL'));

    /// meeting end times
    let mh = meetingEndTime[0].split(':')[0],
      mm = meetingEndTime[0].split(':')[1];

    /// after each interval the minutes and correspondin hours will be incremented
    /// until its reached to meeting end
    while (h <= mh && m <= mm) {
      m += increment;
      if (m == 60) {
        m = m % 60;
        h += 1;
      }
      intervals.push(h + ':' + m);
    }
    return intervals;
  }

  /// Stop the vector store creation explicitly
  async stopCreateVectorStoreAtIntervals() {
    clearInterval(chunkProcess);
    clearInterval(runningProcess);
    return 'Timer stopped successfully...';
  }

  /// Vector store
  async createVectorStoreAtIntervals(text: string) {
    try {
      /// get the meeting end time
      meetingEndTime = await getEndTime(text);

      /// set the inital start of the meeting
      let h = 0,
        m = 0,
        s = 0,
        ms = 0;
      /// initially 5 minutes intervals
      let increment = parseInt(this.config.get<string>('INTERVAL'));
      /// meeting end times
      let mh = meetingEndTime[0].split(':')[0],
        mm = meetingEndTime[0].split(':')[1];

      let start = `${h}:${m}:${s}.${ms}`;

      let startTime: any = new Date();

      /// starting the running time of chunk creation
      runningProcess = setInterval(() => {
        let currentTime: any = new Date();
        let elapsedTime: any = currentTime - startTime;

        // Convert the elapsed time to minutes and seconds
        let hours = Math.floor(elapsedTime / 3600000);
        let minutes = Math.floor((elapsedTime % 3600000) / 60000);
        let seconds = Math.floor((elapsedTime % 60000) / 1000);
        runningTime = `${hours}h:${minutes}m:${seconds}s`;
      }, 1000);
      /// after each interval the minutes and correspondin hours will be incremented
      /// until its reached to meeting end
      chunkProcess = setInterval(() => {
        if (h <= mh && m <= mm) {
          let prev = start;
          m += increment;
          if (m == 60) {
            m = m % 60;
            h += 1;
          }
          start = `${h}:${m}:.{1,2}\..{1,3}`;
          generateChunks(
            prev,
            start,
            text,
            meetingEndTime,
            OPEN_AI_KEY,
            h,
            m,
            __dirname,
            appendChunks,
          );
        } else {
          console.log('Meeting finished for creating chunks');
          clearInterval(chunkProcess);
          clearInterval(runningProcess);
        }
      },0 );
      return 'Timer started successfully...';
    } catch (e) {
      console.log(
        'Error in createVectorStore Function of langchain.service.ts ',
        e,
      );
    }
  }

  /// keywords retrival based on intervals
  async getKeywords(interval: string) {
    console.log("hii");
    
    try {
      /* Create the chain for retrival*/
      let chain = ConversationalRetrievalQAChain.fromLLM(
        await getModel(++count, OPEN_AI_KEY),
        (await getVectorStoreAsInterval(OPEN_AI_KEY, interval)).asRetriever(),
      );

      const res = await chain.call({
        question: list_keywords,
        chat_history: [],
      });
      const keywords = res.text.split(', ');
      return { keywords: keywords };
    } catch (e) {
      console.log('Error in getKeywords Function of langchain.service.ts ', e.data,e);
      if (e.code === 'ENOENT') {
        return runningTime == undefined
          ? `Chunk creation process isn't started yet...`
          : `Please wait before accessing ${
              interval.split(':')[0] + 'h' + interval.split(':')[1] + 'm'
            } as the timer has only reached till ${runningTime}`;
      }
    }
  }

  /// situation retriving from keywords
  async getSituations(keywords: string) {
    /* Create the chain for retrival*/
    let chain = ConversationalRetrievalQAChain.fromLLM(
      await getModel(++count, OPEN_AI_KEY),
      (await getVectorStore(OPEN_AI_KEY)).asRetriever(),
    );

    /// getting the situation
    const situtation = await chain.call({
      question: list_situtation + `"${keywords}"`,
      chat_history: [],
    });

    return { situations: JSON.parse(situtation.text)?.situations };
  }

  /// challenges retriving from keywords
  async getChallenges(situation: string) {
    /* Create the chain for retrival*/
    let chain = ConversationalRetrievalQAChain.fromLLM(
      await getModel(++count, OPEN_AI_KEY),
      (await getVectorStore(OPEN_AI_KEY)).asRetriever(),
    );
      // console.log(situation);
      
    const challenges = await chain.call({
      question: list_challenges + `"${situation}"`,
      chat_history: [],
    });
    // return { challenges: challenges.text };
    return { challenges: JSON.parse(challenges.text)?.challenges };
  }

  async getSituationsAndChallenges(keywords: string) {
    try {
      /* Create the chain for retrival*/

      let chain = ConversationalRetrievalQAChain.fromLLM(
        await getModel(++count, OPEN_AI_KEY),
        (await getVectorStore(OPEN_AI_KEY)).asRetriever(),
      );

      const situtation = await chain.call({
        question: list_situtation + `"${keywords}"`,
        chat_history: [],
      });

      const challenges = await chain.call({
        question: list_challenges + `"${situtation.text}"`,
        chat_history: [],
      });
      return { situation: situtation.text, challenges: challenges.text };
    } catch (e) {
      console.log(
        'Error in getChallenges Function of langchain.service.ts ',
        e,
      );
    }
  }


  async getRisks(challenge: string) {
    let chain = ConversationalRetrievalQAChain.fromLLM(
      await getModel(++count, OPEN_AI_KEY),
      (await getVectorStore(OPEN_AI_KEY)).asRetriever(),
    );

    const risks = await chain.call({
      question: risks_based_on_challenge + `"${challenge}"`,
      chat_history: [],
    });
    // return { risks: risks.text };
    return { risks: JSON.parse(risks.text)?.risks };
  }

  async getImpactsSolution(risk:string){

  //   return {
  //     "impacts": [
  //         "Inadequate HR security measures"
  //     ],
  //     "solutions": [
  //         "Ensure that the company follows best practices and global standards for HR security",
  //         "Implement a documented screening policy for hiring and employment",
  //         "Ensure that employees and contractors are aware of and acknowledge the company's security requirements",
  //         "Regularly review and update HR security measures to address any gaps or areas for improvement"
  //     ]
  // }

    let chain = ConversationalRetrievalQAChain.fromLLM(
      await getModel(++count, OPEN_AI_KEY),
      (await getVectorStore(OPEN_AI_KEY)).asRetriever(),
    );

    const impactsolution = await chain.call({
      question: impact_sol_based_on_risks + `"${risk}"`,
      chat_history: [],
    });
   
    
    // return { impactsolution: impactsolution.text };
    // const response = JSON.parse(impactsolution.text);
    return { impactsolution: JSON.parse(impactsolution.text)}  ;
   
  }
}
