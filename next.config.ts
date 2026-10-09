import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Migración de autor: el proyecto base firmaba como "Aitor Ergui"; el titular real es Bryan Ergui.
      { source: "/autor/aitor-ergui", destination: "/autor/bryan-ergui", permanent: true },
      // Coma-ruga es un núcleo del municipio de El Vendrell: se trata como sección de /el-vendrell.
      { source: "/coma-ruga", destination: "/el-vendrell#coma-ruga", permanent: true },
    ];
  },
};

export default nextConfig;
