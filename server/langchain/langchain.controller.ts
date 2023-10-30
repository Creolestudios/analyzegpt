import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import * as fs from 'fs/promises';
import { LangChainService } from './langchain.service.js';
import { getEndTime } from '../common/helper/transcript.process.js';

// let meetingEndTime;
@Controller()
export class LangChainController {
  constructor(private readonly langService: LangChainService) {}

  /// creating vector store
  @Get('store')
  async createVectorStore() {
    const text = await fs.readFile('src/convo6.txt', 'utf8');
    return await this.langService.createVectorStore(text);
  }

  /// get the ending time of transcript
  @Get('getintervals')
  async getEndTime() {
    const text = await fs.readFile('src/convo6.txt', 'utf8');

    return await this.langService.getIntervals(text);
  }

  /// creating vector store
  @Get('storeinchunks')
  async createVectorStoreAtIntervals() {
    const text = await fs.readFile('src/convo6.txt', 'utf8');
    return await this.langService.createVectorStoreAtIntervals(text);
  }

  /// stop creating vector store
  @Get('stopstoreinchunks')
  async stopCreateVectorStoreAtIntervals() {
    return await this.langService.stopCreateVectorStoreAtIntervals();
  }

  /// listing keywords
  @Post('listkeywords/:interval')
  async getKeywords(@Param() params: any) {
    //  return { keywords:  [
    //      "ISO 27,001",
    //      "security framework",
    //      "HR security",
    //      "best practices",
    //      "global standards",
    //      "cybersecurity."   
    //  ] };
    return await this.langService.getKeywords(params.interval);
  }

  /// listing situtations
  @Post('situations')
  async getSituations(@Body() body : any) {
    
    let keywords: string = body?.join(', ');
    // console.log(keywords);
    let text = `{
      "situations": [
          "Going through a set of questions based on the ISO 27,001 security framework",
          "Checking how the company is performing to the certification of ISO 27,001",
          "Highlighting areas where improvements or changes may be needed based on ISO 27,001",
          "Asking questions about HR security according to best practices tried and tested and proven",
          "Expecting visual support to responses regarding ISO 27,001",
          "Ensuring security requirements are stated in contracts prior to hiring",
          "Checking if employees and contractors acknowledge the security requirements",
          "Demonstrating professional screening prior to hiring based on ISO 27,001",
          "Verifying if the company is ISO certified"
      ]
  }`;

//   return { situations: [
//     {
//         "situation": "The conversation mentions the ISO 27,001 security framework.",
//         "explanation": "The ISO 27,001 security framework is discussed as a guideline for implementing security, specifically HR security, according to best practices."
//     },
//     {
//         "situation": "ACME INC is mentioned as being ISO certified.",
//         "explanation": "ACME INC is stated to be ISO certified, indicating that they have implemented security measures based on the ISO 27,001 security framework."
//     },
//     {
//         "situation": "The participant asks for insight into the policy related to security requirements in contracts.",
//         "explanation": "The participant requests information about how security requirements are stated in contracts and how employees and contractors acknowledge these requirements, whether through a click on the screen or a signature."
//     },
//     // {
//     //     "situation": "The participant asks for an example or demonstration of the professional screening conducted prior to hiring.",
//     //     "explanation": "The participant wants to see the professional screening process, such as competency checking, that takes place before hiring. They request the sharing of a screen or any relevant documentation."
//     // },
//     // {
//     //     "situation": "The participant mentions that criminal background checks are not legal, but professional checks are.",
//     //     "explanation": "The participant highlights that while criminal background checks may not be legal, professional checks are conducted to ensure that the person's work-related qualifications and behavior standards are assessed during the interview process."
//     // }
// ]
  // }
    // return { situations: JSON.parse(text)?.situations };
    return await this.langService.getSituations(keywords);
  }

  /// listing challenges
  @Post('challenges')
  async getChallenges(@Body() body) {
    let situation: string = body?.explanation;
    console.log(situation);
    // return {
    //   challenges: [
    //     "Ensuring that security requirements are clearly stated in contracts",
    //     "Determining the best method for employees and contractors to acknowledge these requirements",
    //     "Establishing a process for obtaining acknowledgments, whether through a click on the screen or a signature"
    //   ]
    // }

    return await this.langService.getChallenges(situation);
  }

  @Post('risks')
  async getRisks(@Body() body) {
    let challenge: string = body?.challenge;
    console.log(body);
  //   return {
  //     risks: [
  //         "Lack of clarity on how employees and contractors should acknowledge security requirements",
  //         "Potential for employees and contractors to not fully understand or comply with security requirements",
  //         "Difficulty in tracking and ensuring that all employees and contractors have acknowledged the security requirements"
  //     ]
  // }
    return await this.langService.getRisks(challenge);
  }

  @Post('impactsolution')
  async getImpactsSolution(@Body() body) {
    let risk: string = body?.risk;
    // console.log(body);
    return {
      impactsolution : {
      impacts: [
          "Increased risk of security breaches",
          "Potential for non-compliance with regulations and standards",
          "Loss of sensitive data or intellectual property"
      ],
      solutions: [
          "Provide comprehensive training and education on security requirements",
          "Ensure clear and concise communication of security policies and procedures",
          "Regularly assess and monitor employee and contractor compliance",
      ]
    }
  }
    return await this.langService.getImpactsSolution(risk);
  }
}
