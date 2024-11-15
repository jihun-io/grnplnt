import styles from "@/styles/privacy.module.css";
import { generateMetadata } from "/utils/metadata";

const title = "웹 사이트 이용 약관 - 혹성의 아이";
const description =
  "본 약관은 &#39;혹성의 아이&#39; 웹 사이트의 이용 조건 및 절차, 이용자와 웹 사이트 운영자의 권리, 의무, 책임사항 등을 규정함을 목적으로 합니다.";

export const metadata = generateMetadata(title, description);

export default function terms() {
  return (
    <main className={`px-6 md:px-8 lg:px-10 xl:px-12 ${styles.privacy}`}>
      <h2>혹성의 아이 웹 사이트 이용 약관</h2>
      <h3>제1조 (목적)</h3>
      <p>
        본 약관은 &lsquo;혹성의 아이&rsquo; 웹 사이트(이하 &quot;웹
        사이트&quot;)의 이용 조건 및 절차, 이용자와 웹 사이트 운영자의 권리,
        의무, 책임사항 등을 규정함을 목적으로 합니다.
      </p>
      <h3>제2조 (정의)</h3>
      <ol>
        <li>
          &quot;이용자&quot;란 웹 사이트에 접속하여 본 약관에 따라 웹 사이트가
          제공하는 서비스를 이용하는 모든 사람을 말합니다.
        </li>
        <li>
          &quot;방명록&quot;이란 이용자가 단편영화 &lsquo;혹성의 아이&rsquo;에
          관한 게시글을 작성하여 게시하는 서비스를 말합니다.
        </li>
      </ol>
      <h3>제3조 (약관의 효력 및 변경)</h3>
      <ol>
        <li>본 약관은 웹 사이트에 게시함으로써 효력이 발생합니다.</li>
        <li>
          웹 사이트 운영자는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은
          웹 사이트에 공지함으로써 효력이 발생합니다.
        </li>
      </ol>
      <h3>제4조 (저작권)</h3>
      <ol>
        <li>
          웹 사이트에서 제공하는 모든 콘텐츠(방명록 내용을 제외함)에 대한 저작권
          및 기타 지적재산권은 혹성의 아이에 귀속됩니다.
        </li>
        <li>
          이용자는 웹 사이트를 이용함으로써 얻은 정보를 웹 사이트 운영자의 사전
          승낙 없이 복제, 송신, 출판, 배포, 방송, 기타 방법에 의하여
          영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
        </li>
      </ol>
      <h3>제5조 (방명록 이용)</h3>
      <ol>
        <li>
          방명록에 게시된 게시물의 저작권은 해당 게시물의 작성자에게 귀속됩니다.
        </li>
        <li>
          방명록 이용 시 이용자는 이름(별명을 포함함)과 비밀번호를 입력해야
          합니다.
        </li>
        <li>
          이용자가 입력한 비밀번호는 암호화되어 저장되며, 웹 사이트 운영자는
          이를 외부에 유출하지 않습니다.
        </li>
        <li>
          이용자는 자신이 게시한 게시물에 대해 수정 및 삭제할 권한을 가지며,
          이는 게시 시 입력한 비밀번호를 통해 행사할 수 있습니다.
        </li>
        <li>
          웹 사이트 운영자는 다음과 같은 게시물을 사전통지 없이 삭제할 수
          있습니다:
          <ol>
            <li>타인의 권리를 침해하거나 명예를 훼손하는 내용 </li>
            <li>음란물 등 공서양속에 반하는 내용 </li>
            <li>범죄행위와 관련된 내용 </li>
            <li>저작권법을 위반한 내용 </li>
            <li>청소년에게 유해한 내용 </li>
            <li>기타 관련 법령에 위반되는 내용</li>
          </ol>
        </li>
        <li>
          제5항에 해당하는 게시물을 게시한 이용자는 관련 법령에 따라 처벌받을 수
          있습니다.
        </li>
      </ol>
      <h3>제6조 (개인정보보호)</h3>
      <ol>
        <li>
          웹 사이트 운영자는 이용자의 개인정보를 보호하기 위해 최선을 다합니다.
        </li>
        <li>
          방명록 이용 시 수집된 이름과 비밀번호는 방명록 서비스 제공 목적으로만
          사용되며, 기타 용도로 사용되지 않습니다.
        </li>
        <li>
          이용자의 비밀번호는 암호화되어 저장되며, 웹 사이트 운영자를 포함한
          누구도 이를 열람할 수 없습니다.
        </li>
      </ol>
      <h3>제7조 (청소년 보호)</h3>
      <ol>
        <li>
          웹 사이트 운영자는 청소년이 안전하게 인터넷을 이용할 수 있는 환경을
          조성하기 위해 노력합니다.
        </li>
        <li>
          웹 사이트에서는 청소년에게 유해한 콘텐츠를 게시하지 않으며, 모든
          이용자가 청소년 유해 콘텐츠를 게시하는 것을 금지합니다.
        </li>
        <li>
          청소년 유해 콘텐츠가 발견될 경우, 웹 사이트 운영자는 해당 콘텐츠를
          즉시 삭제하고 필요한 조치를 취할 수 있습니다.
        </li>
        <li>
          이용자는 청소년에게 유해한 내용이 포함된 게시물을 발견할 경우 즉시 웹
          사이트 운영자에게 신고해야 합니다.
        </li>
        <li>
          웹 사이트 운영자는 청소년 보호와 관련된 법령을 준수하며, 필요한 경우
          관련 기관과 협력하여 청소년 보호에 만전을 기합니다.
        </li>
      </ol>
      <h3>제8조 (책임제한)</h3>
      <ol>
        <li>
          웹 사이트 운영자는 천재지변 또는 이에 준하는 불가항력으로 인하여
          서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
        </li>
        <li>
          웹 사이트 운영자는 이용자의 귀책사유로 인한 서비스 이용의 장애에
          대하여 책임을 지지 않습니다.
        </li>
      </ol>
      <h3>제9조 (준거법 및 관할법원)</h3>
      <p>
        본 약관과 관련된 법적 분쟁이 발생할 경우, 대한민국 법을 준거법으로 하며,
        관할법원은 웹 사이트 운영자의 주소지를 관할하는 법원으로 합니다.
      </p>
      <h3>부칙</h3>
      <p>본 약관은 2024년 8월 31일부터 적용됩니다.</p>
    </main>
  );
}
