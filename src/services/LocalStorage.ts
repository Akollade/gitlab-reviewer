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
  public setSelectedProjects(selectedProjects: { id: number }) {
    return localStorage.setItem('selected_projects', JSON.stringify(selectedProjects));
  }
  public getRefreshRateAsNumber(): number {
    const refreshRate = this.getRefreshRate();
    return parseInt(refreshRate, 10);
  }

  public getRefreshRate(): string {
    return localStorage.getItem('refresh_rate') || '5';
  }
  public getSelectedProjects(): Array<number> {
    const projects = localStorage.getItem('selected_projects');
    if (projects) {
      const projectIds = JSON.parse(projects);
      const projectsArr: Array<{ id: number }> = Object.values(projectIds);
      return projectsArr.map((project) => project.id);
    }
    return [];
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
