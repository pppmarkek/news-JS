import AppLoader from './appLoader';
import { Endpoints, NewsResponse, SourcesResponse, LoaderOptions } from '../../types';

export default class AppController extends AppLoader {
    public getSources(callback: (data: SourcesResponse) => void): void {
        this.getResp<SourcesResponse>({ endpoint: Endpoints.Sources }, callback);
    }

    public getNews(e: Event, callback: (data: NewsResponse) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer && target !== null) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') || '';
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    const options: LoaderOptions = {
                        q: 'tesla',
                        from: '2025-02-04',
                        sortBy: 'publishedAt',
                    };
                    this.getResp<NewsResponse>({ endpoint: Endpoints.Everything, options }, callback);
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}
