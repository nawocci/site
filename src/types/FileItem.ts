import { DriveItem } from '@microsoft/microsoft-graph-types';

export type FileItem = DriveItem & {
  '@microsoft.graph.downloadUrl'?: string;
};