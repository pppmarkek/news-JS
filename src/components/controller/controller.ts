import AppLoader from './appLoader';
import { Endpoints, NewsResponse, LoaderOptions, SourcesResponse } from '../../types';

export default class AppController extends AppLoader {
    public getSources(callback: (data: SourcesResponse) => void): void {
        this.getResp({ endpoint: Endpoints.Sources }, callback);
    }

    public getNews(e: Event, callback: (data: NewsResponse) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer && target !== null) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') || '';
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    const query = target.getAttribute('data-query') || sourceId;
                    const from = target.getAttribute('data-from');
                    const to = target.getAttribute('data-to');
                    const sortBy = target.getAttribute('data-sortby');
                    const country = target.getAttribute('data-country');
                    const category = target.getAttribute('data-category');
                    const endpointAttr = target.getAttribute('data-endpoint') || Endpoints.Everything;

                    const options: LoaderOptions = { q: query };
                    if (from) options.from = from;
                    if (to) options.to = to;
                    if (sortBy) options.sortBy = sortBy;
                    if (country) options.country = country;
                    if (category) options.category = category;

                    this.getResp<NewsResponse>({ endpoint: endpointAttr as Endpoints, options }, callback);
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}
