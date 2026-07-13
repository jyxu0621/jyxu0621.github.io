import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
  name: "Jason Xu",
  initials: "JX",
  location: "Beijing Jiaotong University",
  locationLink: "https://en.bjtu.edu.cn/",
  about: "Electronic Science and Technology Student",
  summary:
    "An undergraduate student at Beijing Jiaotong University with an interest in digital and mixed-signal integrated circuits.",
  avatarUrl: "https://github.com/jyxu0621.png",
  personalWebsiteUrl: "",
  contact: {
    email: "",
    tel: "",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/jyxu0621",
        icon: "github",
      },
      {
        name: "Blog",
        url: "https://jyxu0621.github.io/blog/",
        icon: "globe",
      },
    ],
  },
  education: [
    {
      school: "Beijing Jiaotong University",
      degree: "Electronic Science and Technology",
      start: "",
      end: "",
    },
  ],
  work: [],
  skills: [],
  projects: [],
} as const;
