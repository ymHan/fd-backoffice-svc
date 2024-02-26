import { Injectable } from '@nestjs/common';
import { ListMwcResponse, AddHtmlRequest, AddHtmlResponse } from '@proto/backoffice.pb';
import * as fsp from 'fs/promises';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

@Injectable()
export class MwcService {
  public async addHtml(payload: AddHtmlRequest): Promise<AddHtmlResponse> {
    const { filename } = payload;
    const mp4File = fs.existsSync(`${process.env.MWC_FILE_PATH_DE}/${this.getDates()}/${filename}`);
    const htmlFile = fs.existsSync(`${process.env.MWC_FILE_PATH_DE}/${this.getDates()}/${filename.split('.')[0]}.html`);

    if (!mp4File && !htmlFile) {
      return {
        result: 'fail',
        status: 400,
        message: 'file not found',
      };
    }

    await fsp.rm(`${process.env.MWC_FILE_DOWNLOAD_PATH}/${filename}`, { force: true });
    await fsp.rm(`${process.env.MWC_FILE_DOWNLOAD_PATH}/${filename.split('.')[0]}.html`, { force: true });
    await fsp.cp(`${process.env.MWC_FILE_PATH_DE}/${this.getDates()}/${filename}`, `${process.env.MWC_FILE_DOWNLOAD_PATH}/`, {
      recursive: true,
    });
    await fsp.cp(
      `${process.env.MWC_FILE_PATH_DE}/${this.getDates()}/${filename.split('.')[0]}.html`,
      `${process.env.MWC_FILE_DOWNLOAD_PATH}/`,
      { recursive: true },
    );

    return {
      result: 'ok',
      status: 200,
      message: 'success',
    };
  }

  public async listMwc(): Promise<ListMwcResponse> {
    const files = await fsp.readdir(`${process.env.MWC_FILE_PATH_DE}/${this.getDates()}`);
    const videos = files.filter((f) => f.includes('.mp4'));
    const map = videos.map((f) => {
      return {
        index: parseInt(f.split('.')[0].split('_')[0], 10),
        video: f,
        thumbnail: `${this.getFileName(f)}.jpg`,
        download: `${process.env.MWC_DOWNLOAD_PATH_DE}/${this.getDates()}/${f}`,
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

  private getDates() {
    const date = new Date().toISOString();

    const formattedDate = date.split('T')[0];

    return formattedDate.replace(/-/g, '');
  }

  private getFileName(file: string) {
    return file.split('.')[0];
  }

  private makeLink(file: string) {
    return parseInt(file.split('.')[0].split('_')[0], 10);
  }
}
