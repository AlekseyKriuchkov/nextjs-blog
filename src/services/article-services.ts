import {BaseFetcher} from "@/services/base-fetcher";
import {Article} from "@/types/article/types";


class ArticleService extends BaseFetcher {
  public async getArticles(): Promise<Article[]> {
    try {
      const data: Article[] = await this.request({endpoint: '/articles'});
      return data
    } catch (error) {
      console.error('Error reading data from file:', error);
      return [];
    }
  }

  public async getArticleById(id: string): Promise<Article | null> {
    const articles: Article[] = await this.request({endpoint: '/articles'});
    return articles.find((article) => article.id === id) || null;
  }

  public async createArticle (article: Omit<Article, 'id'>): Promise<Article | null> {
    try {
      const newArticle = { id: String(Date.now()), ...article };
      return await this.request({method: 'POST', options: {body: newArticle}, endpoint: '/articles'});
    } catch (error) {
      console.error('Ошибка записи данных в файл:', error);
    }
    return null
  }

  public async updateArticle(updatedData: Article): Promise<Article | null> {
    try {
      const data: Article = await this.request({method: 'PUT', options: {body: updatedData}, endpoint: '/articles'});
      console.log(data)
      return data
    } catch (error) {
      console.error('Error reading data from file:', error);
      return null;
    }
  }

  public async deleteArticle (id: string): Promise<boolean> {
    try {
      const data = await this.request({method: 'DELETE', options:{queryParams: {id}}, endpoint: '/articles'});
      if (data) return true
    } catch (error) {
      console.error('Error reading data from file:', error);
    }
    return false;
  }
}

export const articleApi = new ArticleService()