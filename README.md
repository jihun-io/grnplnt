# ⟨혹성의 아이⟩ 홈페이지

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=for-the-badge&logo=CloudflarePages&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=for-the-badge&logo=CloudflareWorkers&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)
![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white)

![grnplnt-2-1 (1)](https://github.com/user-attachments/assets/59bb2c8b-96bc-46d9-8528-b9f7b16031c4)

## 프로젝트 소개

단편영화 ⟨혹성의 아이⟩(2024)의 영화와 상품 홍보, 커뮤니케이션을 위한 홈페이지입니다.

기존 Flask 기반의 웹 페이지를 Next.js로 리팩토링하고 콘텐츠를 업데이트하여, 더 빠르고 사용자 친화적인 웹 페이지를 제작했습니다. 또한, Tailwind CSS를 도입하여 디자인 시스템을 구축했습니다.

기존 Flask 기반 서버에서 겪었던 서버 유지보수에 대한 피로감을 덜고자 배포 환경을 Cloudflare Pages로 이주했습니다. 이를 통해 배포 자동화와 배포 롤백, 무중단 배포 등의 기능을 손쉽게 사용할 수 있게 되었으며, Cloudflare의 글로벌 네트워크를 활용하여 빠른 페이지 로딩 속도를 제공받을 수 있었습니다. 단, 방명록 서버는 기존의 Flask 서버에서 프론트엔드를 제거하고 API 서버로 전환하여 운영 중에 있습니다.

## 참여 범위

- 100%
  - 웹 사이트 제작(이미지 및 텍스트 제외) 및 배포

## 기술 스택

- 프론트엔드: Next.js, React, Tailwind CSS
- 서버리스 플랫폼: Cloudflare Pages
- 방명록 백엔드: Flask, Docker
