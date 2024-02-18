import { Injectable } from '@nestjs/common';
import { ListMwcResponse, GetMwcRequest, GetMwcResponse } from '@proto/backoffice.pb';
import * as fs from 'fs/promises';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MwcService {
  public async listMwc(): Promise<ListMwcResponse> {
    const files = await fs.readdir(`${process.env.MWC_FILE_PATH}/20240215`);
    const videos = files.filter((f) => f.includes('.mp4'));
    const map = videos.map((f) => {
      return {
        index: parseInt(f.split('.')[0].split('_')[0], 10),
        video: f,
        thumbnail: `${this.getFileName(f)}.jpg`,
        download: `${process.env.MWC_DOWNLOAD_PATH}/20240215/${f}`,
        link: `/${this.makeLink(f)}`,
      };
    });
    map.sort((a, b) => b.index - a.index);

    return {
      status: 'success',
      message: 'List of files',
      data: map,
    };
  }

  public async getMwc(payload: GetMwcRequest): Promise<GetMwcResponse> {
    const { index, filename } = payload;

    return {
      status: 'success',
      message: 'File found',
      data: {
        index,
        video: `${filename}.mp4`,
        thumbnail: `${filename}.mp4`,
        download: `${process.env.MWC_DOWNLOAD_PATH}/${this.getDates()}/${filename}.mp4`,
        link: `/${index}`,
      },
    };
  }

  private getDates() {
    let months = '';
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month < 10) {
      months = `0${month}`;
    }
    const day = date.getDate();
    return `${year}${months}${day}`;
  }

  private getFileName(file: string) {
    return file.split('.')[0];
  }

  private makeLink(file: string) {
    return parseInt(file.split('.')[0].split('_')[0], 10);
  }
}
