import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh; /** ocupar 100% da parte visivel da tela */

  display: flex;
  align-items: stretch; /* conteudos do container tb vao ter height 100vh */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%; /** ocupar o maximo que puder do espaco horizontal*/
  max-width: 700px; /* deixa espaco para imagem do background a direita */
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }

}`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4efe8;
      display: block; /** se nao colocar isso o margin n funciona */
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    /** nao colocar a stilizacao no a dentro do form, somente neste nivel */
    color: #ff9000;
    display: block; /** se nao colocar isso o margin n funciona */
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center; /** alinhar icone com texto */

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1; /* flexivel = ocupar todo espaco menos o que ja foi ocupado */
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover; /** aumentar de proporcao ocupar todo espaco  */
`;
