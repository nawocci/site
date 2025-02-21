import { FileItem } from '@/types/FileItem';

export const dummyFiles: FileItem[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'Work',
        type: 'folder',
        children: [
          {
            id: '3',
            name: 'Report.pdf',
            type: 'file',
            size: 2500000 // 2.5MB
          }
        ]
      },
      {
        id: '4',
        name: 'Personal',
        type: 'folder',
        children: []
      }
    ]
  },
  {
    id: '5',
    name: 'Photos',
    type: 'folder',
    children: [
      {
        id: '6',
        name: 'Vacation.jpg',
        type: 'file',
        size: 5000000 // 5MB
      }
    ]
  },
  {
    id: '7',
    name: 'README.md',
    type: 'file',
    size: 1024 // 1KB
  }
]; 