/*
const encoding:number[] = [63,63]
const titles:string[] = ["Title 1", "Title 2"]
const descriptions:string[] = ["Description 1", "Description 2"]
const thumbnailUrls:string[] = ["thumbnailUrl 1", "thumbnailUrl 2"]
const isExplicits:boolean[] = [true, false]
const languages:number[] = [22,22]
const categories:number[] = [14,14]
*/
export interface FullVideoInput {
  encoding: number,                 //na
  filePath: string,                 //na
  channel: number,                  //0
  category: number,                 //1
  title: string,                    //2
  description: string,              //3
  duration?: number,                //4
  skippableIntroDuration: number,   //5
  thumbnailUrl: string,             //6
  language: number,                 //7
  media?: number,                   //8
  hasMarketing: boolean,            //9
  publishedBeforeJoystream: number|null, //10
  isPublic: boolean,                //11
  isExplicit: boolean,              //12
  license: number                   //13
  isCensored?: boolean,             //14
}
export const input:FullVideoInput[] = [
  {
    encoding: 63,
    filePath: "/root/Staked1.mp4",
    channel: 82,
    category: 14,
    title: "Staked 1",
    description: "Episode 1 of the Staked Podcast",
    skippableIntroDuration: 0,
    thumbnailUrl: "https://ssl-static.libsyn.com/p/assets/a/4/8/f/a48f1a0697e958ce/Cover_2.png",
    language: 22,
    hasMarketing: false,
    publishedBeforeJoystream: null,
    isPublic: true,
    isExplicit: true,
    license: 16
  },
  {
    encoding: 63,
    filePath: "/root/Staked2.mp4",
    channel: 82,
    category: 14,
    title: "Staked 2",
    description: "Episode 2 of the Staked Podcast",
    skippableIntroDuration: 0,
    thumbnailUrl: "https://ssl-static.libsyn.com/p/assets/a/4/8/f/a48f1a0697e958ce/Cover_2.png",
    language: 22,
    hasMarketing: false,
    publishedBeforeJoystream: null,
    isPublic: true,
    isExplicit: true,
    license: 16
  },
  {
    encoding: 63,
    filePath: "/root/Staked3.mp4",
    channel: 82,
    category: 14,
    title: "Staked 3",
    description: "Episode 3 of the Staked Podcast",
    skippableIntroDuration: 0,
    thumbnailUrl: "https://ssl-static.libsyn.com/p/assets/a/4/8/f/a48f1a0697e958ce/Cover_2.png",
    language: 22,
    hasMarketing: false,
    publishedBeforeJoystream: null,
    isPublic: true,
    isExplicit: true,
    license: 16
  }
  ,
  {
    encoding: 63,
    filePath: "/root/Staked4.mp4",
    channel: 82,
    category: 14,
    title: "Staked 4",
    description: "Episode 4 of the Staked Podcast",
    skippableIntroDuration: 0,
    thumbnailUrl: "https://ssl-static.libsyn.com/p/assets/a/4/8/f/a48f1a0697e958ce/Cover_2.png",
    language: 22,
    hasMarketing: false,
    publishedBeforeJoystream: null,
    isPublic: true,
    isExplicit: true,
    license: 16
  }
]