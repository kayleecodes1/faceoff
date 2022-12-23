import type { AvatarImage } from '@store/common/common.types';

export enum ClientMessageType {
    Join = 'Join',
    Leave = 'Leave',
    UpdateName = 'UpdateName',
    UpdateAvatarImage = 'UpdateAvatarImage',
    SubmitAnswers = 'SubmitAnswers',
}

export type ClientMessage =
    | {
          type: ClientMessageType.Join;
          data: {
              name: string;
          };
      }
    | {
          type: ClientMessageType.Leave;
          data: Record<string, never>;
      }
    | {
          type: ClientMessageType.UpdateName;
          data: {
              name: string;
          };
      }
    | {
          type: ClientMessageType.UpdateAvatarImage;
          data: {
              avatarImage: AvatarImage;
          };
      }
    | {
          type: ClientMessageType.SubmitAnswers;
          data: {
              answers: [AvatarImage, AvatarImage];
          };
      };
