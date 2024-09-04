function Error({ statusCode, err }) {
  console.error(err); // 브라우저 콘솔에 에러 로깅
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
      <br />
      {err && err.message}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, err };
};

export default Error;
