import { type Config } from "tailwindcss";

export default {
  mode: "jit", // calc 사용
  darkMode: "class", // HTML에 "dark" 클래스를 추가하면 다크 모드 적용됨
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // dark 사이드바 배경
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // dark 플레이스홀더
          foreground: "hsl(var(--muted-foreground))", // dark 플레이스홀더 텍스트
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // 드롭다운 배경
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
    },
  },
} satisfies Config;
