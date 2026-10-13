// ✏️ Thông tin cá nhân & dữ liệu dự án
export const profile = {
  name: 'Nguyen Dung',
  username: 'Dungnguyen831',
  role: 'Software Developer | Mobile: Flutter & Backend: Java Spring Boot',
  motto: 'Viết code không chỉ để máy tính hiểu, mà còn để con người dễ dàng bảo trì',
  architecture: 'Clean Architecture, BLoC, tối ưu hiệu năng và hệ thống',
  email: 'nguyenanhdung831@gmail.com',
  phone: '+84 904 754 029',
  github: 'https://github.com/Dungnguyen831',
  cv: `${import.meta.env.BASE_URL}CV_Nguyen_Dung.pdf`,
}

export const trafficHub = {
  demo: 'https://dungnguyen831.github.io/Traffic-Posts/',
  apk: '#',
  source: 'https://github.com/Dungnguyen831/Traffic-Posts',
  figma: 'https://www.figma.com/design/T0NQ7ZraSGhx416cyxSnEb/APP-GIAO-TH%C3%94NG-UTT?m=auto&t=X9IQmo4hMgIrwzxs-6',
}

export const githubStats = {
  contributions: '330+',
  period: 'năm qua',
  streak: 'Active Commit Streak',
  languages: [
    { name: 'Dart', color: '#00B4AB', share: '45%' },
    { name: 'Java', color: '#B07219', share: '28%' },
    { name: 'JavaScript', color: '#F7DF1E', share: '18%' },
    { name: 'PHP', color: '#777BB4', share: '9%' },
  ],
}

export const featuredRepositories = [
  {
    name: 'Traffic-Posts',
    badge: 'Featured App',
    displayName: 'Traffic-Posts (TrafficHub)',
    description: 'Ứng dụng cảnh báo & điều phối giao thông cộng đồng thời gian thực: tích hợp OpenStreetMap, FCM cảnh báo tức thời, Clean Architecture.',
    language: 'Dart',
    languageColor: '#00B4AB',
    stars: 3,
    forks: 1,
    url: 'https://github.com/Dungnguyen831/Traffic-Posts',
    demo: 'https://dungnguyen831.github.io/Traffic-Posts/',
    tags: ['Flutter', 'OpenStreetMap', 'GetX', 'FCM', 'Realtime'],
  },
  {
    name: 'MusicAPP_FE',
    badge: 'Mobile App',
    displayName: 'MusicAPP_FE',
    description: 'Ứng dụng nghe nhạc trực tuyến đa nền tảng, thiết kế giao diện hiện đại mượt mà, quản lý trạng thái BLoC và Clean Architecture.',
    language: 'Dart',
    languageColor: '#00B4AB',
    stars: 2,
    forks: 0,
    url: 'https://github.com/Dungnguyen831/MusicAPP_FE',
    tags: ['Flutter', 'Audio Stream', 'BLoC Pattern', 'Clean Architecture'],
  },
  {
    name: 'Portfolio',
    badge: 'Web App',
    displayName: 'Portfolio',
    description: 'Trang Portfolio cá nhân phong cách Minimal Tech Dark, Bento Grid, tích hợp iframe trực tuyến tương tác ứng dụng Flutter.',
    language: 'JavaScript',
    languageColor: '#F7DF1E',
    stars: 1,
    forks: 0,
    url: 'https://github.com/Dungnguyen831/Portfolio',
    demo: 'https://dungnguyen831.github.io/Portfolio/',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
  },
]

export const navLinks = [
  { label: 'Trang chủ / Demo', href: '#home' },
  { label: 'Về tôi & Dự án', href: '#about-projects' },
  { label: 'CV', href: '#resume' },
  { label: 'Liên hệ', href: '#contact' },
]

export const skills = [
  { group: 'Mobile Development', items: ['Flutter', 'Dart', 'BLoC', 'GetX', 'flutter_screenutil', 'flutter_map'] },
  { group: 'Backend & Systems', items: ['Java', 'Spring Boot', 'RESTful API', 'MySQL / PostgreSQL', 'JWT Auth'] },
  { group: 'Architecture & Design', items: ['Clean Architecture', 'SOLID Principles', 'Figma', 'Design System', 'Prototyping'] },
  { group: 'Cloud & Tooling', items: ['Firebase (FCM, Auth)', 'Git & GitHub', 'Docker (cơ bản)', 'Postman', 'DevTools'] },
]
