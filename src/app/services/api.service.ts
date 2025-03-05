import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

class HttpOptions {
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpClient = inject(HttpClient);

  /**
   * Sends a GET request to the specified URL and returns an Observable of the response.
   *
   * @template T - The expected response type.
   * @param {string} url - The URL to send the GET request to.
   * @param {HttpOptions} options - The HTTP options to include in the request.
   * @returns {Observable<T>} - An Observable of the response.
   */
  get<T>(url: string, options: HttpOptions): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  /**
   * Sends a POST request to the specified URL with the given body and options.
   *
   * @template T - The expected response type.
   * @param {string} url - The URL to which the POST request is sent.
   * @param {any} body - The body of the POST request.
   * @param {HttpOptions} options - The options for the HTTP request.
   * @returns {Observable<T>} - An observable of the response type.
   */
  post<T>(url: string, body: any, options: HttpOptions): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  /**
   * Sends an HTTP PUT request to the specified URL with the provided body and options.
   *
   * @template T - The expected response type.
   * @param {string} url - The URL to which the PUT request is sent.
   * @param {any} body - The body of the PUT request.
   * @param {HttpOptions} options - The HTTP options to be sent with the request.
   * @returns {Observable<T>} - An observable of the expected response type.
   */
  put<T>(url: string, body: any, options: HttpOptions): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  /**
   * Sends an HTTP DELETE request to the specified URL.
   *
   * @template T - The expected response type.
   * @param {string} url - The URL to send the DELETE request to.
   * @param {HttpOptions} options - The HTTP options to include in the request.
   * @returns {Observable<T>} - An observable of the response type.
   */
  delete<T>(url: string, options: HttpOptions): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}
