/** @format */

type BuildMode = 'development' | 'production';

export interface Enviroment {
  mode: BuildMode;
  port: number;
  analyzer: boolean;
}

export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
}

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  analyzer?: boolean;
}
