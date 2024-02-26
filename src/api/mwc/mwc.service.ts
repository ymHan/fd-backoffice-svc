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
    const mp4File = fs.existsSync(`${process.env.MWC_FILE_DOWNLOAD_PATH}/${filename}`);
    const htmlFile = fs.existsSync(`${process.env.MWC_FILE_DOWNLOAD_PATH}/${filename.split('.')[0]}.html`);

    if (!mp4File) {
      // /src/app/download에 파일이 없으면 /tmp/ossfs-de/de-01/mwc/오늘날짜에 있는 파일을 /src/app/download로 mp4 및 html 파일 복사
      await fsp.cp(
        `${process.env.MWC_FILE_PATH_DE}/${this.getDates()}/${filename}`,
        `${process.env.MWC_FILE_DOWNLOAD_PATH}/${filename}`,
      );
      await fsp.chmod(`${process.env.MWC_FILE_DOWNLOAD_PATH}/${filename}`, 0o755);
    }

    if (!htmlFile) {
      await fsp.cp(
        `${process.env.MWC_FILE_PATH_DE}/${this.getDates()}/${filename.split('.')[0]}.html`,
        `${process.env.MWC_FILE_DOWNLOAD_PATH}/${filename.split('.')[0]}.html`,
      );

      await fsp.chmod(`${process.env.MWC_FILE_DOWNLOAD_PATH}/${filename.split('.')[0]}.html`, 0o755);
    }

    return {
      result: 'ok',
      status: 200,
      message: 'success',
    };
  }

  public async listMwc(): Promise<ListMwcResponse> {
    const dirExists = fs.existsSync(`${process.env.MWC_FILE_PATH_DE}/${this.getDates()}`);
    if (!dirExists) {
      return {
        status: 'error',
        message: 'Directory not found',
        data: null,
      };
    }
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

  public async listMwcPath(payload: any): Promise<ListMwcResponse> {
    const { path } = payload;

    const dirExists = fs.existsSync(`${process.env.MWC_FILE_PATH_DE}/${path}`);
    if (!dirExists) {
      return {
        status: 'error',
        message: 'Directory not found',
        data: null,
      };
    }

    const files = await fsp.readdir(`${process.env.MWC_FILE_PATH_DE}/${path}`);
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
