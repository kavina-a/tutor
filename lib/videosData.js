/**
 * Cloudinary video configuration
 * Replace YOUR_CLOUD_NAME with your actual Cloudinary cloud name
 * Video URLs format: https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/v1234567890/video-name.mp4
 */

const CLOUD_NAME = "dia9svkwh";

/** Short lesson filters — one key per clip (see titles / tags on each video) */
export const videoFilters = [
  { key: "all", label: "All" },
  { key: "surds", label: "Surds" },
  { key: "composite", label: "Composite functions" },
  { key: "brackets", label: "Expanding brackets" },
];

export const videos = [
  {
    id: "video-1",
    filterKey: "surds",
    cat: "algebra",
    grad1: "#ff6b6b",
    grad2: "#ee5a24",
    sym: "1/x",
    title: "Rationalising Denominators Made Easy",
    tags: "#algebra #surds #rationalising #mathfacts",
    likes: "2.4k",
    comments: "186",
    videoUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/w_400,h_600,c_fill,q_auto:best/rationalising_kdfqtz.mp4`,
    thumbnail: "",
  },
  {
    id: "video-2",
    filterKey: "composite",
    cat: "calculus",
    grad1: "#4ecdc4",
    grad2: "#2c3e50",
    sym: "ƒ(g(x))",
    title: "Composite Functions Explained",
    tags: "#calculus #functions #composition #quickmath",
    likes: "1.8k",
    comments: "94",
    videoUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/w_400,h_600,c_fill,q_auto:best/composite_functions_edited_ln9lip.mp4`,
    thumbnail: "",
  },
  {
    id: "video-3",
    filterKey: "brackets",
    cat: "algebra",
    grad1: "#a8e6cf",
    grad2: "#1a535c",
    sym: "(a+b)²",
    title: "Expanding Brackets Like a Pro",
    tags: "#algebra #brackets #expansion #fundamentals",
    likes: "5.1k",
    comments: "312",
    videoUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/w_400,h_600,c_fill,q_auto:best/expandingbrackets_z9dxcy.mp4`,
    thumbnail: "",
  },
];
