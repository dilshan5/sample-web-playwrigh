import { Page } from "@playwright/test";
import * as fs from 'fs';
import * as path from 'path';

export class NetworkInterceptor {
  constructor(private page: Page) { }
  /**
   * 
   * @param urlToIntercept Response URL which need to Mock
   * @param options [filePath] relative path for the Json response body
   * @param options [statusCode] Mock response status code 
   */
  async interceptResponse(urlToIntercept: string, options?: { filePath?: string, statusCode?: number }) {
    var newResponseBody = readJsonFile(options.filePath);

    await this.page.route(urlToIntercept, async (route) => {
      console.log('Intercepted response:', route.request().url());
      // Make the original request
      const response = await route.fetch();
      // if mock response code is unavialble, then use the original response code
      const mockResponsecode = (typeof options.statusCode !== 'undefined') ? options.statusCode : Number(response.status)
      // Replace the response with the modified data
      route.fulfill({
        status: mockResponsecode,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResponseBody),
      });
    });
  }
  /**
   * 
   * @param urlToIntercept 
   * @param options [filePath] relative path for the Json request body
   * @param options [statusCode] Mock request status code 
   */
  async interceptRequest(urlToIntercept: string, options?: { filePath?: string, statusCode?: number }) {
    var newRequestBody = readJsonFile(options.filePath);

    await this.page.route(urlToIntercept, async (route) => {
      console.log('Intercepted request:', route.request().url());
      // Replace the request with the modified data
      route.continue({
        postData: newRequestBody
      });
    });
  }
}

/**
 * 
 * @param filePath  relative location of the json file
 * @returns JSON Object
 */
function readJsonFile(filePath: string) {
  const rawData = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
  return JSON.parse(rawData);
}
