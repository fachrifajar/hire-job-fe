import axios from "axios";

export default function handler(req, res) {
  res.status(200).json([
    {
      name: "Fachri Fajar",
      job: "Fullstack Developer",
      image: "../../public/images/blank-profile.png",
      location: "Jakarta",
      skills: ["Java", "Go", "Ruby", "Javascript", "HTML", "CSS"],
    },
    {
      name: "Slamet",
      job: "Frontend Developer",
      image: "../../public/images/blank-profile.png",
      location: "Jakarta",
      skills: ["Javascript", "HTML", "CSS", "SQL", "NOSQL"],
    },
    {
      name: "Hendra",
      job: "Backend Developer",
      image: "../../public/images/blank-profile.png",
      location: "Jakarta",
      skills: ["Java", "Python", "PHP", "Rust"],
    },
    {
      name: "Yono",
      job: "Mobile Developer",
      image: "../../public/images/blank-profile.png",
      location: "Jakarta",
      skills: ["Javascript", "Dart", "HTML", "CSS"],
    },
  ]);
}
