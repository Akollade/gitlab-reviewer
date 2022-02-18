import React, { useContext, useEffect, useState } from 'react';
import { GitLabApiContext } from '../components/GitLabApiProvider';
import { Table } from '../components/table';
import LocalStorage from '../services/LocalStorage';

const Filters = ({ history }) => {
  document.title = 'GitLab Reviewer | Settings';
  const gitLabApi = useContext(GitLabApiContext);
  const [projects, setProjects] = React.useState([]);
  const [isFetching, setFetching] = React.useState(true);
  const ids = LocalStorage.getSelectedProjects();

  useEffect(() => {
    document.title = 'GitLab Reviewer';

    const fetchProjects = async () => {
      if (!gitLabApi) {
        return;
      }
      setFetching(true);
      const projects = await gitLabApi.getAllProjectsFromPage(1);
      setProjects(projects);
    };

    fetchProjects().then((projects) => {
      setFetching(false);
    });
  }, [gitLabApi]);
  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Project Name',
            accessor: 'name_with_namespace',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Projects`,
          },
          {
            Header: 'Date',
            accessor: 'last_activity_at',
            Cell: ({ row }) => {
              const date = new Date(row.original.created_at);
              return <span>{date.toLocaleDateString()}</span>;
            },
          },
        ],
      },
    ];
  }, []);

  const [originalData] = React.useState(projects);
  const skipResetRef = React.useRef(false);

  const updateMyData = (rowIndex, columnId, value) => {
    skipResetRef.current = true;
    setProjects((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  React.useEffect(() => {
    skipResetRef.current = false;
  }, [projects]);

  if (isFetching) {
    return (
      <div>
        Fetching Projects
        <div className="flex items-center justify-center ">
          <div className="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <>
        <Table columns={columns} data={projects} updateMyData={updateMyData} skipReset={skipResetRef.current} />
      </>
    </div>
  );
};

export default Filters;
