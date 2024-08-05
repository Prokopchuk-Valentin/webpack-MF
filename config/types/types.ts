/** @format */

type BuildMode = 'development' | 'production';
type BuildPlatform = 'mobile' | 'desktop';

export interface Enviroment {
  mode: BuildMode;
  port: number;
  analyzer: boolean;
  platform: BuildPlatform;
}

export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
}

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  analyzer?: boolean;
  platform?: BuildPlatform;
}
