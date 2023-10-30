import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from 'langchain/vectorstores';
import fs from 'fs';
import path from 'path';

export function isVectorStoreExists(__dirname: string) {
  /// check if there is any data in the file
  try {
    let data: Buffer = fs.readFileSync(
      path.resolve(__dirname, '../../vector-store/args.json'),
    );
    
    if (data.length == 0) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    return false;
  }
}
