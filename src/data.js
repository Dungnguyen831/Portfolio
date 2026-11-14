import githubData from './generated/github.json'

const repos = githubData.repos || {}
const contrib = githubData.contributions || {}
const ghProfile = githubData.profile || {}

export const lastSyncedAt = githubData.updatedAt || '2026-11-15T00:00:00.000Z'

export const profile = {
  name: 'Nguyễn Anh Dũng',
  shortName: 'Nguyen Dung',
  username: 'Dungnguyen831',
  location: 'Hà Nội, Việt Nam',
  role: 'Mobile App Developer · Chuyên sâu Flutter & Dart',
  motto: 'Viết code không chỉ để máy tính hiểu, mà còn để con người dễ dàng bảo trì',
  architecture:
    'Clean Architecture, State Management (GetX / Riverpod), RESTful API & Realtime WebSocket',
  email: 'nguyenanhdung831@gmail.com',
  phone: '+84 904 754 029',
  github: 'https://github.com/Dungnguyen831',
  cv: `${import.meta.env.BASE_URL}CV_Nguyen_Dung.pdf`,
  cvSizeKb: githubData.summary?.cvSizeKb || 109,
  education: {
    school: 'Trường Đại học Công nghệ Giao thông Vận tải (UTT)',
    englishSchool: 'University of Transport Technology',
    degree: 'Cử nhân Công nghệ Thông tin (Chuyên ngành Phát triển Ứng dụng Di động)',
    gpa: '3.12 / 4.0',
    period: '2023 – 2027 (Sinh viên năm cuối)',
    location: 'Hà Nội, Việt Nam',
  },
  award: {
    title: 'Giải Khuyến khích — Cuộc thi Innovation Challenge 4.0 (2026)',
    issuer: 'Trường Đại học Công nghệ Giao thông Vận tải (UTT)',
    project: 'TrafficHub — Nền tảng cảnh báo giao thông cộng đồng & cứu hộ SOS thời gian thực',
  },
}

export const trafficHub = {
  demo: 'https://dungnguyen831.github.io/Traffic-Posts/',
  source: 'https://github.com/Dungnguyen831/Traffic-Posts',
  figma:
    'https://www.figma.com/design/T0NQ7ZraSGhx416cyxSnEb/APP-GIAO-TH%C3%94NG-UTT?m=auto&t=X9IQmo4hMgIrwzxs-6',
  commits: repos['Traffic-Posts']?.commits || 232,
  dartFiles: 121,
  moduleCount: 13,
  teamSize: 5,
  role: 'Frontend Developer (Team 5 · Flutter, GetX, WebSocket)',
  period: '01/2026 – 04/2026',
  award: 'Giải Khuyến khích Innovation Challenge 4.0 (UTT · 2026)',
  modules: [
    'map',
    'dashboard',
    'emergency',
    'camera',
    'discovery',
    'chatbot',
    'profile',
    'ranking',
    'violation_subscription',
    'home',
    'login',
    'signup',
    'not_found',
  ],
  specs: [
    { k: 'commits', v: `${repos['Traffic-Posts']?.commits || 232} commits (Team 5)`, dot: '#22C55E' },
    { k: 'codebase', v: '121 Dart files · 13 modules', dot: '#38BDF8' },
    { k: 'state_di', v: 'GetX 4.7 + Bindings', dot: '#A78BFA' },
    { k: 'map_engine', v: 'flutter_map 8.3 (OSM)', dot: '#F97316' },
    { k: 'realtime', v: 'STOMP WebSocket + FCM', dot: '#F97316' },
    { k: 'ai_voice', v: 'Gemini API + SpeechToText', dot: '#38BDF8' },
  ],
  highlights: [
    'Xác thực phiên & tự động đăng nhập an toàn với flutter_secure_storage và Dio.',
    'Bản đồ OpenStreetMap (flutter_map) hiển thị tọa độ cảnh báo động từ bài đăng cộng đồng.',
    'Luồng phát tín hiệu SOS khẩn cấp độ trễ thấp qua kết nối WebSocket (stomp_dart_client) truyền tọa độ GPS thời gian thực.',
    'Tối ưu hiệu năng bảng tin (feed) bằng phân trang infinite-scroll, cached_network_image và giảm thiểu widget rebuild.',
    'Trợ lý AI tích hợp Gemini (googleai_dart) kết hợp nhập liệu giọng nói (speech_to_text) hỗ trợ báo cáo rảnh tay khi lái xe.',
  ],
}

export const librarySystem = {
  title: 'Hệ thống Quản lý Thư viện (Library Management System)',
  eyebrow: 'Backend & Full-stack Case Study',
  summary:
    'Hệ thống quản lý mượn/trả sách, đặt trước, tính phí phạt và thống kê kho sách theo kiến trúc tách biệt (Decoupled RESTful API), bảo mật phân quyền JWT và kiểm thử E2E tự động.',
  beUrl: 'https://github.com/Dungnguyen831/QuanLyThuVien_BE',
  feUrl: 'https://github.com/Dungnguyen831/QuanLyThuVien_FE',
  demoUrl: 'https://deploy-web-black.vercel.app',
  beCommits: repos.QuanLyThuVien_BE?.commits || 137,
  feCommits: repos.QuanLyThuVien_FE?.commits || 193,
  totalCommits:
    (repos.QuanLyThuVien_BE?.commits || 137) + (repos.QuanLyThuVien_FE?.commits || 193),
  javaFiles: 101,
  feFiles: 154,
  controllersCount: 15,
  tablesCount: 14,
  e2eSuitesCount: 6,
  stars: repos.QuanLyThuVien_BE?.stars || 1,
  stack: [
    'Java 25',
    'Spring Boot 4.0.2',
    'Spring Security',
    'JWT (jjwt)',
    'Spring Data JPA',
    'MySQL (14 bảng)',
    'Swagger / OpenAPI',
    'Cypress E2E (6 suites)',
  ],
  tables: [
    'authors',
    'books',
    'book_copies',
    'categories',
    'fines',
    'loans',
    'loan_details',
    'publishers',
    'reservations',
    'reviews',
    'roles',
    'shelves',
    'users',
    'wishlists',
  ],
  controllers: [
    'AuthController',
    'BookController',
    'BookCopyController',
    'LoanController',
    'ReservationController',
    'FineController',
    'DashboardController',
    'UserController',
    'AuthorController',
    'CategoryController',
    'PublisherController',
    'ReviewController',
    'ShelfController',
    'WishlistController',
    'UploadController',
  ],
  roles: ['Admin (Quản trị viên)', 'Librarian (Thủ thư)', 'Reader (Độc giả)'],
  cypressSuites: [
    { file: 'Test_BVA.cy.js', desc: 'Kiểm thử phân tích giá trị biên (Boundary Value Analysis)' },
    { file: 'Test_EP.cy.js', desc: 'Kiểm thử phân vùng tương đương (Equivalence Partitioning)' },
    { file: 'login_test.cy.js', desc: 'Kiểm thử luồng xác thực & phân quyền JWT' },
    { file: 'register_test.cy.js', desc: 'Kiểm thử đăng ký tài khoản & kiểm tra hợp lệ dữ liệu' },
    { file: 'Test_TC01_04.cy.js', desc: 'Bộ kịch bản kiểm thử nghiệp vụ mượn/trả (TC01–TC04)' },
    { file: 'Test_TC05_06.cy.js', desc: 'Bộ kịch bản kiểm thử đặt trước & phí phạt (TC05–TC06)' },
  ],
}

export const githubStats = {
  contributions: contrib.totalLastYear || 402,
  activeDays: contrib.activeDays || 84,
  longestStreak: contrib.longestStreak || 8,
  peakDay: contrib.peakDay || { date: '2026-04-18', count: 16 },
  publicRepos: ghProfile.publicRepos || 21,
  activeRepos: ghProfile.activeRepos || 17,
  totalTrackedCommits: githubData.summary?.totalTrackedCommits || 597,
  memberSince: '01/2024',
  weeks: contrib.weeks || [],
  languages: githubData.languages || [
    { name: 'Dart', color: '#00B4AB', share: '40.2%', percent: 40.2, repos: 3, bytes: 1079940 },
    { name: 'JavaScript', color: '#F7DF1E', share: '32.1%', percent: 32.1, repos: 4, bytes: 863920 },
    { name: 'Java', color: '#B07219', share: '13.6%', percent: 13.6, repos: 4, bytes: 364691 },
    { name: 'PHP', color: '#777BB4', share: '13.2%', percent: 13.2, repos: 1, bytes: 356054 },
    { name: 'TypeScript', color: '#3178C6', share: '0.9%', percent: 0.9, repos: 1, bytes: 24605 },
  ],
}

export const featuredRepositories = [
  {
    id: 'traffic-posts',
    name: 'Traffic-Posts',
    badge: 'Featured Mobile · Giải KK UTT',
    displayName: 'TrafficHub (Traffic-Posts)',
    period: '01/2026 – 04/2026 · Team 5',
    description:
      'Ứng dụng cảnh báo giao thông cộng đồng & cứu hộ SOS thời gian thực: 121 file Dart, 13 module, bản đồ OpenStreetMap, STOMP WebSocket, FCM và trợ lý AI Gemini.',
    language: 'Dart',
    languageColor: '#00B4AB',
    commits: repos['Traffic-Posts']?.commits || 232,
    filesLabel: '121 Dart files · 13 modules',
    stars: repos['Traffic-Posts']?.stars || 0,
    url: 'https://github.com/Dungnguyen831/Traffic-Posts',
    demo: 'https://dungnguyen831.github.io/Traffic-Posts/',
    tags: [
      'Flutter 3.10+',
      'GetX',
      'flutter_map (OSM)',
      'STOMP WebSocket',
      'Firebase FCM',
      'Gemini AI',
      'Speech-to-Text',
    ],
    details: {
      role: 'Frontend Developer (Mobile Flutter) — Nhóm 5 thành viên',
      achievement:
        'Đạt Giải Khuyến khích cuộc thi Innovation Challenge 4.0 (2026) tại Trường Đại học Công nghệ Giao thông Vận tải (UTT).',
      architecture:
        'Phân tách 13 module độc lập (map, emergency, camera, chatbot, dashboard, discovery, ranking, violation_subscription, profile, home, login, signup, not_found) với GetX Controller + Binding.',
      bullets: trafficHub.highlights,
    },
  },
  {
    id: 'music-app',
    name: 'MusicAPP_FE + BE',
    badge: 'Full-stack Mobile Audio',
    displayName: 'MusicAPP (Flutter Riverpod + Spring Boot)',
    period: '08/2026 – 09/2026',
    description:
      'Ứng dụng nghe nhạc trực tuyến đa nền tảng: Mobile viết bằng Flutter kết hợp Riverpod, just_audio, audio_service & Hive local cache; Backend dùng Java 21 & Spring Boot 3.3.4.',
    language: 'Dart + Java',
    languageColor: '#00B4AB',
    commits: (repos.MusicAPP_FE?.commits || 14) + (repos.MusicAPP_BE?.commits || 9),
    commitsBreakdown: `${repos.MusicAPP_FE?.commits || 14} FE + ${repos.MusicAPP_BE?.commits || 9} BE commits`,
    filesLabel: '36 Dart files · 97 Java files',
    stars: 0,
    url: 'https://github.com/Dungnguyen831/MusicAPP_FE',
    secondaryUrl: 'https://github.com/Dungnguyen831/MusicAPP_BE',
    secondaryLabel: 'BE Repo',
    tags: [
      'Flutter',
      'Riverpod 2.5',
      'just_audio',
      'audio_service',
      'Hive NoSQL',
      'Java 21',
      'Spring Boot 3.3',
    ],
    details: {
      role: 'Full-stack Mobile & Backend Developer',
      achievement:
        'Thiết kế đồng bộ từ tài liệu đặc tả API_CONTRACT.md & schema.sql ở Backend đến luồng phát nhạc nền và cache offline trên Mobile.',
      architecture:
        'Mobile sử dụng flutter_riverpod quản lý state bất đồng bộ, just_audio + audio_service xử lý media notification và Hive lưu trữ dữ liệu cục bộ; Backend dùng Spring Boot 3.3.4 + MySQL + Swagger.',
      bullets: [
        'Quản lý trạng thái reactive với flutter_riverpod (2.5.1), tách biệt hoàn toàn logic trình phát nhạc khỏi tầng UI.',
        'Hỗ trợ phát nhạc nền, điều khiển từ màn hình khóa thông qua just_audio & audio_service.',
        'Lưu trữ bộ nhớ đệm và danh sách phát cục bộ tốc độ cao bằng Hive & hive_flutter.',
        'Backend Spring Boot 3.3.4 (97 file Java) thiết kế rõ ràng theo API_CONTRACT.md và schema.sql.',
      ],
    },
  },
  {
    id: 'quan-ly-thu-vien',
    name: 'QuanLyThuVien_BE + FE',
    badge: 'Dự án cá nhân · Web Full-stack',
    displayName: 'Hệ thống Quản lý Thư viện (BE + FE)',
    period: '02/2026 – 07/2026',
    description:
      'Dự án cá nhân xây dựng hệ thống quản lý mượn/trả, đặt trước, tính phí phạt và thống kê kho sách theo kiến trúc tách biệt RESTful API với Spring Boot 4, JWT và 14 bảng MySQL.',
    language: 'Java + JS',
    languageColor: '#B07219',
    commits:
      (repos.QuanLyThuVien_BE?.commits || 137) + (repos.QuanLyThuVien_FE?.commits || 193),
    commitsBreakdown: `${repos.QuanLyThuVien_BE?.commits || 137} BE + ${repos.QuanLyThuVien_FE?.commits || 193} FE commits`,
    filesLabel: '101 Java files · 14 MySQL tables',
    stars: repos.QuanLyThuVien_BE?.stars || 1,
    url: 'https://github.com/Dungnguyen831/QuanLyThuVien_BE',
    secondaryUrl: 'https://github.com/Dungnguyen831/QuanLyThuVien_FE',
    secondaryLabel: 'FE Repo',
    demo: 'https://deploy-web-black.vercel.app',
    tags: [
      'Java 25',
      'Spring Boot 4.0.2',
      'Spring Security + JWT',
      'JPA / Hibernate',
      'MySQL (14 tables)',
      'Swagger OpenAPI',
    ],
    details: {
      role: 'Full-stack Developer (Dự án cá nhân)',
      achievement:
        'Xây dựng 15 REST Controller chuẩn OpenAPI, phân quyền 3 vai trò (Admin, Thủ thư, Độc giả) và triển khai hoàn chỉnh giao diện web trực tuyến.',
      architecture:
        'Kiến trúc phân tầng Controller → Service → Repository → Entity (JPA/Hibernate) kết nối 14 bảng MySQL: authors, books, book_copies, categories, fines, loans, loan_details, publishers, reservations, reviews, roles, shelves, users, wishlists.',
      bullets: [
        'Xác thực & phân quyền không trạng thái (Stateless JWT) với jjwt và Spring Security.',
        'Quản lý chi tiết từng bản sao sách (book_copies), vị trí kệ (shelves), phiếu mượn (loans + loan_details), đặt trước (reservations) và tính tiền phạt quá hạn (fines).',
        'Tài liệu hóa toàn bộ REST API tự động bằng springdoc-openapi (Swagger UI).',
      ],
    },
  },
  {
    id: 'valorant-banpick',
    name: 'Valorant_BanPick',
    badge: 'Live Web Tool',
    displayName: 'Valorant Map & Agent Ban/Pick',
    period: '06/2026',
    description:
      'Công cụ hỗ trợ cấm/chọn (Ban/Pick) bản đồ và đặc vụ cho giải đấu cộng đồng, giao diện tương tác thời gian thực, triển khai trực tiếp trên Vercel.',
    language: 'JavaScript',
    languageColor: '#F7DF1E',
    commits: repos.Valorant_BanPick?.commits || 5,
    filesLabel: 'React + Vite + Tailwind CSS',
    stars: 0,
    url: 'https://github.com/Dungnguyen831/Valorant_BanPick',
    demo: 'https://valorant-ban-pick.vercel.app',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Vercel'],
    details: {
      role: 'Frontend Developer',
      achievement: 'Triển khai hoàn chỉnh công cụ phục vụ giải đấu tùy chỉnh trên Vercel.',
      architecture:
        'Single Page Application nhẹ, quản lý trạng thái lượt cấm/chọn trực quan và phản hồi tức thì.',
      bullets: [
        'Thiết kế luồng Ban/Pick theo đúng thể thức thi đấu tiêu chuẩn.',
        'Tối ưu hiển thị tài nguyên hình ảnh và hiệu ứng chuyển lượt mượt mà.',
      ],
    },
  },
]

export const navLinks = [
  { label: 'Dự án', href: '#work' },
  { label: 'Hồ sơ & GitHub', href: '#profile' },
  { label: 'Kỹ năng', href: '#skills' },
  { label: 'Liên hệ', href: '#contact' },
]

/* Library system: 14 tables grouped by domain (names unchanged from the real schema) */
export const libraryTableGroups = [
  {
    name: 'Tài nguyên sách',
    desc: 'Đầu sách tách biệt với bản sao vật lý và vị trí kệ.',
    tables: ['books', 'book_copies', 'authors', 'categories', 'publishers', 'shelves'],
  },
  {
    name: 'Lưu hành',
    desc: 'Phiếu mượn/trả, đặt trước và tiền phạt quá hạn.',
    tables: ['loans', 'loan_details', 'reservations', 'fines'],
  },
  {
    name: 'Tương tác độc giả',
    desc: 'Đánh giá sách và danh sách yêu thích.',
    tables: ['reviews', 'wishlists'],
  },
  {
    name: 'Tài khoản & phân quyền',
    desc: 'Người dùng và 3 vai trò: Admin, Thủ thư, Độc giả.',
    tables: ['users', 'roles'],
  },
]

/* Library system: 15 REST controllers grouped by responsibility */
export const libraryControllerGroups = [
  { name: 'Xác thực & người dùng', items: ['AuthController', 'UserController'] },
  {
    name: 'Danh mục sách',
    items: [
      'BookController',
      'BookCopyController',
      'AuthorController',
      'CategoryController',
      'PublisherController',
      'ShelfController',
    ],
  },
  { name: 'Lưu hành', items: ['LoanController', 'ReservationController', 'FineController'] },
  {
    name: 'Cộng đồng & vận hành',
    items: ['ReviewController', 'WishlistController', 'DashboardController', 'UploadController'],
  },
]

export const skills = [
  {
    group: 'Mobile (Flutter & Dart)',
    items: [
      'Flutter 3.x',
      'Dart',
      'GetX (State, Routing, DI)',
      'Riverpod (flutter_riverpod)',
      'BLoC',
      'Clean Architecture & Modular',
      'flutter_screenutil (Responsive UI)',
    ],
  },
  {
    group: 'Packages & Tích hợp thiết bị',
    items: [
      'flutter_map (OpenStreetMap)',
      'geolocator & geocoding (GPS)',
      'just_audio & audio_service',
      'Hive & flutter_secure_storage',
      'cached_network_image',
      'speech_to_text',
    ],
  },
  {
    group: 'Networking, Realtime & AI',
    items: [
      'Dio (Interceptor, RESTful API)',
      'WebSocket (stomp_dart_client)',
      'Firebase Cloud Messaging (FCM)',
      'Gemini API (googleai_dart)',
      'JSON Serialization & JWT Auth',
      'Java / Spring Boot & MySQL (Nền tảng API)',
    ],
  },
  {
    group: 'Công cụ & Quy trình',
    items: [
      'Git & GitHub Actions',
      'Figma (Chuyển đổi UI/UX sang Flutter)',
      'Postman & Swagger OpenAPI',
      'Flutter DevTools',
      'VS Code & Android Studio',
      'ClickUp (Agile / Sprint)',
    ],
  },
]
