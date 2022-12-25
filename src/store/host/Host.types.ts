import type { AvatarImage, GamePhase, SubmissionResult } from '@store/common/common.types';

export enum HostMessageType {
    JoinSuccess = 'JoinSuccess',
    JoinError = 'JoinError',
    UpdateNameError = 'UpdateNameError',
    UpdateAvatarError = 'UpdateAvatarError',
    UpdateDisabledAvatars = 'UpdateDisabledAvatars',
    UpdateGamePhase = 'UpdateGamePhase',
    UpdateSubmissionResult = 'UpdateSubmissionResult',
    UpdateEndPlacement = 'UpdateEndPlacement',
}

export type HostMessage =
    | {
          type: HostMessageType.JoinSuccess;
          data: Record<string, never>;
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
      }
    | {
          type: HostMessageType.UpdateGamePhase;
          data: {
              gamePhase: Omit<GamePhase, GamePhase.Results>;
          };
      }
    | {
          type: HostMessageType.UpdateGamePhase;
          data: {
              gamePhase: GamePhase.Results;
              answers: [AvatarImage, AvatarImage];
          };
      }
    | {
          type: HostMessageType.UpdateSubmissionResult;
          data: {
              results: [SubmissionResult, SubmissionResult];
          };
      }
    | {
          type: HostMessageType.UpdateEndPlacement;
          data: {
              placement: number;
          };
      };
