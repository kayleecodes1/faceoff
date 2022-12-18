import type { AvatarImage } from '@components/ui/PlayerAvatar';

export enum HostMessageType {
    JoinSuccess = 'JoinSuccess',
    JoinError = 'JoinError',
    UpdateNameError = 'UpdateNameError',
    UpdateAvatarError = 'UpdateAvatarError',
    UpdateDisabledAvatars = 'UpdateDisabledAvatars',

    // UpdateGamePhase
    // UpdateSubmissionResult
}

export type HostMessage =
    | {
          type: HostMessageType.JoinSuccess;
          data: {
              disabledAvatars: AvatarImage[];
          };
      }
    | {
          type: HostMessageType.JoinError;
          data: {
              message: string;
          };
      }
    | {
          type: HostMessageType.UpdateNameError;
          data: {
              previousName: string;
          };
      }
    | {
          type: HostMessageType.UpdateAvatarError;
          data: {
              previousAvatarImage: AvatarImage;
          };
      }
    | {
          type: HostMessageType.UpdateDisabledAvatars;
          data: {
              disabledAvatars: AvatarImage[];
          };
      };
