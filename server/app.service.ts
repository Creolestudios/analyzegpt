import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import {
  ConversationalRetrievalQAChain,
  VectorDBQAChain,
  loadSummarizationChain,
} from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Configuration, OpenAIApi } from 'openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { HNSWLib } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';

/// configuring .env sto make it accessible here
import * as dotenv from 'dotenv';
dotenv.config();

import {
  detect,
  listing_issues,
  protect,
  recover,
  respond,
} from './prompts/prompts.js';
import { sendOpenAIRequest } from './http.request.js';
import { preProcess, preProcessByID } from './completion.preprocessing.js';
import { SerpAPI, ChainTool } from 'langchain/tools';
import path from 'path';
import { fileURLToPath } from 'url';
import { isVectorStoreExists } from './common/helper/vector.store.check.js';

export let langData = '';
let chat_history = '';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let count = 0;
let chain;
let vectorstore;
@Injectable()
export class AppService {

  async staticResponse(id) {
    try {
      const answer = [
        '\nProblem statement: Identifying and securing external IPs and servers in the DMZ or cloud.\nSituation: Cooper IT security is looking for a way to identify and secure external IPs and servers in the DMZ or cloud. They are discussing the scope of the project and looking for a way to identify and secure these assets.',
        '\n\nChallenges: \n1. Ensuring external IPs and servers are properly authenticated to access the DMZ or cloud. \n2. Managing the growing complexity of remote device security in multiple environments. \n3. Implementing and managing network security policies that encompass both on- premise and cloud assets.',
        '\n\nRisks:\n1. Unauthorized access due to improper authentication. \n2. Decreased security as a result of increased complexity of the remote device security environment. \n3. Potential vulnerability to malicious actors due to insufficient network security policies in place.',
        "\n\nImpacts: A failure to properly identify, secure and authenticate external IPs and servers in the DMZ or cloud can lead to data security breach, damage an organization's reputation, disrupt operations, and decrease customer trust within the USA market. \n\nCase Study: The National Crime Agency (NCA) in the UK had a similar problem of identifying and securing external IPs and servers in the public cloud that could be accessed from anywhere. Once they identified their challenge, they implemented a layered approach along with Azure Security Center and Azure Sentinel which have allowed them to protect their digital services more effectively. https://techcommunity.microsoft.com/t5/security-blog/how-the-national-crime-agency-secures-the-public-cloud/ba-p/377920",
        '\n\nSolutions: \n1. Implement a layered security approach to manage the complexity of remote device security in multiple environments. \n2. Regularly update network security policies for on-premise and cloud assets. \n3. Use specific authentication protocols to verify external IPs and servers prior to providing access to the DMZ or cloud. \n4. Leverage Azure Security Center or Azure Sentinel, tools used by the National Crime Agency (NCA) in UK, to proactively monitor and protect digital services from malicious actors and threats.',
      ];

      if (id === '1') {
        return await preProcessByID(answer[0], 1);
      } else if (id === '2') {
        return await preProcessByID(answer[1], 2);
      } else if (id === '3') {
        return await preProcessByID(answer[2], 3);
      } else if (id === '4') {
        return await preProcessByID(answer[3], 4);
      } else if (id === '5') {
        return await preProcessByID(answer[4], 5);
      } else if (id === '6') {
        return;
      } else {
        return new HttpException('Url not found', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      console.log('ErrrrrrrrrrrrrrrrrR>', e.response.data);
    }
  }

}
