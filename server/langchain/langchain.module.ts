import { Module } from "@nestjs/common";
import { LangChainService } from "./langchain.service.js";
import { LangChainController } from "./langchain.controller.js";

@Module({
    providers:[LangChainService],
    controllers:[LangChainController]
})
export class LangChainModule{

}