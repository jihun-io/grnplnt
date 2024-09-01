export default function Footer() {
  return (
    <footer className="flex-col">
      <div className="legal flex-row">
        <p>Copyright © 2024 Jun Park. All rights reserved.</p>
        <ul className="links flex-row">
          <li>
            <a href="/privacy-policy" className="privacy bold">
              개인정보 처리방침
            </a>
          </li>
          <li>
            <a href="/terms" className="terms">
              웹 사이트 이용 약관
            </a>
          </li>
        </ul>
      </div>
      <ul className="info flex-row">
        <li className="bold">혹성의 아이</li>
        <li>
          <span className="bold">대표: </span>박 준
        </li>
        <li>
          <span className="bold">개인정보관리책임자: </span>김지훈
        </li>
        <li>
          <span className="bold">이메일: </span>
          <a href="mailto:greenplanet1415@gmail.com">
            greenplanet1415@gmail.com
          </a>
        </li>
      </ul>
    </footer>
  );
}
