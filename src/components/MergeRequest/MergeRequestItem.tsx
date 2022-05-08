import { MinusIcon } from 'components/Icons';
import PipelineStatusButton from 'components/MergeRequest/PipelineStatusButton';
import Pill from 'components/Pill';
import { UserContext } from 'components/UserProvider';
import Emojify from 'react-emojione';
import { MergeRequest } from 'types/FormattedTypes';
import { User } from 'types/GitLabTypes';
import LocalStorage from 'services/LocalStorage';

interface Props {
  mergeRequest: MergeRequest;
}

const MergeRequestItem = ({ mergeRequest }: Props): JSX.Element => {
  return (
    <UserContext.Consumer>
      {(user: User) => {
        let avatarUrl = mergeRequest.author.avatarUrl;
        if (avatarUrl?.includes('upload')) {
          avatarUrl = LocalStorage.getUrl() + avatarUrl;
        }

        return (
          <tr>
            <td>
              <a
                className="text-xl no-underline text-black"
                href={mergeRequest.webUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Emojify>{mergeRequest.title}</Emojify>
              </a>
            </td>
            <td className="w-32">
              <div className="flex justify-center">
                <img src={avatarUrl} alt={mergeRequest.author.name} className="h-10 w-10 rounded-full shadow-md" />
              </div>
            </td>
            <td className="w-24 text-center">
              <MinusIcon size={'lg'} />
            </td>
            <td className="w-24 text-center">
              <Pill text={mergeRequest.upvotes} type={mergeRequest.upvotes > 0 ? 'success' : 'disable'} />
            </td>
            <td className="w-24 text-center">
              <Pill text={mergeRequest.downvotes} type={mergeRequest.downvotes > 0 ? 'danger' : 'disable'} />
            </td>
            <td className="w-32 text-center">
              <PipelineStatusButton pipeline={mergeRequest.headPipeline} />
            </td>
          </tr>
        );
      }}
    </UserContext.Consumer>
  );
};

export default MergeRequestItem;
