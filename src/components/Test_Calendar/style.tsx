import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  /**내부 내용 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const LoginBox = styled.div`
  padding: 2rem;
  width: 300px;
  height: 360px;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 1px;
`;
export const LoginLogo = styled.img`
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 80px;
  margin-bottom: 20px;
`;

export const LoginInput = styled.input`
  background: #fafafa;
  border: 1px solid #efefef;
  width: 100%;
  height: 25px;
  padding: 9px 0px 7px 9px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const LogForm = styled.form``;
export const SubTitleWrap = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
  border: 1px solid rgb(219, 219, 219);
  width: 300px;
  padding: 32px;
`;
export const SubTitle = styled.span`
 
  margin-right: 15px;
`;
export const ModalSubTitleWrap = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
`;
export const ErrorLoginMessage = styled.p`
  color: red;
  font-size: 15px;
  text-align: center;
  margin-top: 40px;
`;
export const ErrorSignMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 7px;
`;
