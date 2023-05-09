
import { FieldErrors, useForm } from "react-hook-form";
import * as S from "./style";

// import { NavLink } from "react-router-dom";
import { LoginRequest } from "../../types/request";
import { LoginResponse } from "../../types/response";
import { useMutation } from "react-query";
import { setCookie } from "../../utils/cookies";
import { login } from "../../apis/axios";
import { useNavigate } from "react-router-dom";


// interface LoginFormProps {
//   mutate: (data: LoginRequest) => void;
//   isLoading: boolean;
//   error: unknown;
//   modal: boolean;
// }

function _LoginForm() {
    const navigate = useNavigate()
        const { mutate, isLoading, error } = useMutation(login, {
          onSuccess: (data: LoginResponse) => {
            if (!data) return;
            console.log(data)
            navigate('/')
            setCookie("accessToken", data.payload!.accessToken, {
              path: "/",
              maxAge: data.payload!.content?.exp - data.payload!.content?.iat,
            });
          },
        });
      
      
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onValid = (data: LoginRequest) => {
    mutate(data);
    
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <>
     
      <S.LogForm onSubmit={handleSubmit(onValid, onInvalid)}>
        <S.LoginInput
          {...register("email", {
            required: "Email is required",
          })}
          type="text"
          placeholder="test@email.com"
        />
        <S.LoginInput
          {...register("password", {
            required: "Password is required",
          })}
          type="password"
          placeholder="Password"
        />

        <button>
          {isLoading ? "Loading..." : "로그인"}
        </button>

        {errors.email?.message || errors.password?.message || error ? (
          <S.ErrorLoginMessage>
            이메일 또는 비밀번호가 일치하지 않습니다.
          </S.ErrorLoginMessage>
        ) : null}
      </S.LogForm>
    </>
  );
}

export default _LoginForm;
