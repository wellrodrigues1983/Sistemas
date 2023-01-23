package api.auth.token.security;

import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import api.auth.token.ApplicationContextLoad;
import api.auth.token.model.Usuario;
import api.auth.token.repository.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * @author Wellington Rodrigues
 *
 */

@Service
@Component
public class JWTTokenAutenticacaoService {

	/* Tempo de validade do token 2 dias */
	private static final long EXPIRATION_TIME = 172800000;

	/* Uma senha unica para compor a autenticacao e ajudar na seguranca */
	private static final String SECRET = "SenhaExtremamenteSecreta";

	/* Prefixo padrão de token */
	private static final String TOKEN_PREFIX = "Bearer";

	private static final String HEADER_STRING = "Authorization";

	/* Gerando token de autenticacao e adcionando ao cabecalho e resposta http */
	public void addAuthentication(HttpServletResponse response, String username) throws IOException {

		/* Mostragem do token */
		String JWT = Jwts.builder()/* Chama o gerador de Token */
				.setSubject(username)/* Adciona o usuario */
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))/* Tempo de expiracao */
				.signWith(SignatureAlgorithm.HS512, SECRET).compact();/* Compactacao e algoritimo de geracao de senha */

		/* Junta o token com o prefix */
		String token = TOKEN_PREFIX + " " + JWT;

		/* Adciona no cabecalho http */
		response.addHeader(HEADER_STRING, token);
		
		ApplicationContextLoad.getApplicationContext().getBean(UsuarioRepository.class)
		.atualizaTokenUsuario(JWT, username);

		/*
		 * Liberação de resposta para portas diferentes que usam a Api ou clientes web
		 */
		liberacaoCors(response);

		/* Escreve token como resposta no corpo http */
		response.getWriter().write("{\"Authorization\": \"" + token + "\"}");
	}

	/* Retorna usuario Validado com token ou caso não seja válido reorna null */
	public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) {

		/* Pega o token enviado no cabecalho http */
		String token = request.getHeader(HEADER_STRING);

		try {
			if (token != null) {

				String tokenLimpo = token.replace(TOKEN_PREFIX, "").trim();

				/* Faz a validacao do token do usuario na requisicao */
				String user = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(tokenLimpo).getBody().getSubject();

				if (user != null) {

					Usuario usuario = ApplicationContextLoad.getApplicationContext().getBean(UsuarioRepository.class)
							.findUserByLogin(user);

					/* Retorna o usuario */
					if (usuario != null) {

						/*Verifica se o token enviado é igual ao token armazenado no banco*/
						if (tokenLimpo.equalsIgnoreCase(usuario.getToken())) {

							return new UsernamePasswordAuthenticationToken(
									usuario.getLogin(),
									usuario.getSenha(),
									usuario.getAuthorities());
						}
					}
				}
			}
		} catch (io.jsonwebtoken.ExpiredJwtException e) {
			try {
				response.getOutputStream().println("Seu TOKEN está expirado, faça o login novamente!");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		liberacaoCors(response);

		return null;/* Não autorizado */
	}

	/**
	 * @param response
	 */
	private void liberacaoCors(HttpServletResponse response) {

		if (response.getHeader("Access-Control-Allow-Origin") == null) {
			response.addHeader("Access-Control-Allow-Origin", "*");
		}

		if (response.getHeader("Access-Control-Allow-Headers") == null) {
			response.addHeader("Access-Control-Allow-Headers", "*");
		}

		if (response.getHeader("Access-Control-Request-Headers") == null) {
			response.addHeader("Access-Control-Request-Headers", "*");
		}

		if (response.getHeader("Access-Control-Allow-Methods") == null) {
			response.addHeader("Access-Control-Allow-Methods", "*");
		}
		
		
	}

}
