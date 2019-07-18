class LocalStorage {
  public getPrivateToken(): string | null {
    return localStorage.getItem('private_token');
  }

  public setPrivateToken(privateToken: string) {
    return localStorage.setItem('private_token', privateToken);
  }

  public getUrl(): string | null {
    return localStorage.getItem('url');
  }

  public setUrl(url: string) {
    return localStorage.setItem('url', url);
  }

  public getRefreshRateAsNumber(): number {
    const refreshRate = this.getRefreshRate();
    return parseInt(refreshRate, 10);
  }

  public getRefreshRate(): string {
    return localStorage.getItem('refresh_rate') || '5';
  }

  public setRefreshRate(refreshRate: string) {
    return localStorage.setItem('refresh_rate', refreshRate);
  }

  public isAccordionOpened(id: number): boolean {
    const accordionOpen = localStorage.getItem('accordion_opened_' + id) || '1';
    return accordionOpen === '1';
  }

  public setAccordionOpened(id: number, opened: boolean) {
    return localStorage.setItem('accordion_opened_' + id, opened ? '1' : '0');
  }
}

export default new LocalStorage();
