import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { GitLabApi } from 'services/GitLabApi';
import LocalStorage from 'services/LocalStorage';

const Settings = ({ history }: RouteComponentProps): JSX.Element => {
  document.title = 'GitLab Reviewer | Settings';

  const [fieldsState, setFieldsState] = useState({
    url: LocalStorage.getUrl() || '',
    privateToken: LocalStorage.getPrivateToken() || '',
    refreshRate: LocalStorage.getRefreshRate(),
  });
  const { url, privateToken, refreshRate } = fieldsState;
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const isAuthenticated = await new GitLabApi(url, privateToken).isAuthenticated();

    if (isAuthenticated) {
      LocalStorage.setUrl(url);
      LocalStorage.setPrivateToken(privateToken);
      LocalStorage.setRefreshRate(refreshRate);

      history.push('/');
    } else {
      setError(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    setFieldsState({
      ...fieldsState,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="max-w-xl mx-auto mt-5">
      <h1 className="text-3xl font-semibold">Settings</h1>

      <form className="mt-16 flex-col justify-center" onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <label className="w-2/5 pr-6 font-semibold text-lg" htmlFor="url">
            GitLab url
          </label>
          <input
            className="w-3/5"
            type="url"
            name="url"
            placeholder="https://gitlab.example.com"
            defaultValue={url}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-2/5 pr-6 font-semibold text-lg" htmlFor="token">
            Private token
          </label>
          <input
            className="w-3/5"
            type="text"
            name="privateToken"
            defaultValue={privateToken}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="w-2/5 pr-6 font-semibold text-lg" htmlFor="refresh_rate">
            Refresh rate (minutes)
          </label>
          <input
            className="w-3/5"
            type="number"
            name="refreshRate"
            defaultValue={refreshRate}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center mt-6">
          <div className="w-2/5" />
          <div className="w-3/5 flex-col">
            <input
              className="py-2 px-6 bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
              type="submit"
              value="Save"
            />
            {error && (
              <div className="mt-4 border-red-500 border border-solid rounded py-2 px-4 bg-white">
                <p>
                  Authentication failed{' '}
                  <span role="img" aria-label="Disappointed Face">
                    😞
                  </span>
                  .
                </p>
                <p>Check your url and token.</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
