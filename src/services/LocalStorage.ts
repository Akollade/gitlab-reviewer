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

  public getRefreshRateAsString() {
    return localStorage.getItem('refresh_rate') || '5';
  }

  public getRefreshRate(): number {
    const refreshRate = localStorage.getItem('refresh_rate');
    return refreshRate ? parseInt(refreshRate, 10) : 5;
  }

  public setRefreshRate(refreshRate: string) {
    return localStorage.setItem('refresh_rate', refreshRate);
  }
}

export default new LocalStorage();
