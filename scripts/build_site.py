#!/usr/bin/env python3
import os
import glob
import subprocess
import shutil

ROOT_DIR = '/home/ameen/Desktop/rvlb'
WEBSITE_DIR = os.path.join(ROOT_DIR, 'website')
DOCS_SRC_DIR = os.path.join(WEBSITE_DIR, 'docs')
MILESTONES_DIR = os.path.join(DOCS_SRC_DIR, 'hisn', 'milestones')
DIST_DIR = os.path.join(DOCS_SRC_DIR, '.vitepress', 'dist')
FINAL_DOCS_DIR = os.path.join(ROOT_DIR, 'docs')

def main():
    # 1. Run pnpm build
    print("Running VitePress build...")
    try:
        subprocess.run(['pnpm', 'build'], cwd=DOCS_SRC_DIR, check=True)
    except subprocess.CalledProcessError as e:
        print("❌ Build failed!")
        return
        
    # 2. Copy to docs/ in root
    print("Moving build to root docs/ folder...")
    if os.path.exists(FINAL_DOCS_DIR):
        shutil.rmtree(FINAL_DOCS_DIR)
        
    shutil.copytree(DIST_DIR, FINAL_DOCS_DIR)
    
    print("✅ Build complete! Site is ready in", FINAL_DOCS_DIR)

if __name__ == '__main__':
    main()
