import { Injectable } from '@nestjs/common';
import { ListMwcResponse, GetMwcRequest, GetMwcResponse, FileDownloadRequest, FileDownloadResponse } from '@proto/backoffice.pb';
import * as fs from 'fs/promises';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MwcService {
  public async fileDownload(payload: FileDownloadRequest): Promise<FileDownloadResponse> {
    const { filename } = payload;
    const downloadUrl = `${process.env.MWC_DOWNLOAD_PATH}/${this.getDates()}/${filename}`;

    return { downloadUrl };
  }

  public async listMwc2(payload: any): Promise<ListMwcResponse> {
    const { path } = payload;
    const files = !path
      ? await fs.readdir(`${process.env.MWC_FILE_PATH_DE}/${this.getDates()}`)
      : await fs.readdir(`${process.env.MWC_FILE_PATH_DE}/${path}`);
    const videos = files.filter((f) => f.includes('.mp4'));
    const map = videos.map((f) => {
      return {
        index: parseInt(f.split('.')[0].split('_')[0], 10),
        video: f,
        thumbnail: `${this.getFileName(f)}.png`,
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

  public async listMwc(): Promise<ListMwcResponse> {
    const files = await fs.readdir(`${process.env.MWC_FILE_PATH_DE}/${this.getDates()}`);
    const videos = files.filter((f) => f.includes('.mp4'));
    const map = videos.map((f) => {
      return {
        index: parseInt(f.split('.')[0].split('_')[0], 10),
        video: f,
        thumbnail: `${this.getFileName(f)}.png`,
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

  public async getMwc(payload: GetMwcRequest): Promise<GetMwcResponse> {
    const { index, filename } = payload;

    return {
      status: 'success',
      message: 'File found',
      data: {
        index,
        video: `${filename}.mp4`,
        thumbnail: `${filename}.mp4`,
        download: `${process.env.MWC_DOWNLOAD_PATH_DE}/${this.getDates()}/${filename}.mp4`,
        link: `/${index}`,
      },
    };
  }

  private getDates() {
    const date = new Date().toISOString();
    console.log(date);
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
