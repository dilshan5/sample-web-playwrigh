import { Page } from "@playwright/test";
import * as fs from 'fs';
import * as path from 'path';

export class NetworkInterceptor {
  constructor(private page: Page) { }
  /**
   * 
   * @param urlToIntercept Response URL which need to Intecept
   * @param filePath relative path for the Json body
   */
  async InterceptResponseBody(urlToIntercept: any, filePath: string) {
    var newResponseBody = readJsonFile(filePath);

    await this.page.route(urlToIntercept, async (route) => {
      console.log('Intercepted response:', route.request().url());
      // Replace the response with the modified data
      route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResponseBody),
      });
    });
  }
  /**
   * 
   * @param urlToIntercept Response URL which need to Intecept
   * @param errorcode Response Error code 
   * @param filePath relative path for the Json body
   */
  async InterceptResponseWithError(urlToIntercept: any, errorcode: number, filePath: string) {
    var newResponseBody = readJsonFile(filePath);

    await this.page.route(urlToIntercept, async (route) => {
      console.log('Intercepted response:', route.request().url());
      // Replace the response with the modified data
      route.fulfill({
        status: errorcode,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResponseBody),
      });
    });
  }

  async InterceptRequest(urlToIntercept: any, filePath: string) {
    var newRequestBody = readJsonFile(filePath);

    await this.page.route(urlToIntercept, async (route) => {
      console.log('Intercepted request:', route.request().url());
      // Replace the request with the modified data
      route.continue({
        postData: newRequestBody
      });
    });
  }
}

function readJsonFile(filePath: string) {
  const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
  return JSON.parse(rawData);
}